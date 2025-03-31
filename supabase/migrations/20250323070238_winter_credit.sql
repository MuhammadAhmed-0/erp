/*
  # Payroll Management Schema

  1. New Tables
    - `invoices`
      - Stores student invoices
      - Tracks payment status and details
    - `invoice_items`
      - Stores individual invoice line items
    - `salary_payments`
      - Tracks teacher salary payments

  2. Security
    - Enable RLS
    - Add policies for different user roles
*/

CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  currency text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) ON DELETE CASCADE,
  description text NOT NULL,
  amount numeric NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS salary_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  month text NOT NULL,
  year integer NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  payment_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_payments ENABLE ROW LEVEL SECURITY;

-- Policies for invoices
CREATE POLICY "Students can view their invoices"
  ON invoices
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Admins can manage all invoices"
  ON invoices
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Policies for invoice items
CREATE POLICY "Users can view their invoice items"
  ON invoice_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM invoices
      WHERE id = invoice_items.invoice_id
      AND student_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all invoice items"
  ON invoice_items
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Policies for salary payments
CREATE POLICY "Teachers can view their salary payments"
  ON salary_payments
  FOR SELECT
  TO authenticated
  USING (teacher_id = auth.uid());

CREATE POLICY "Admins can manage all salary payments"
  ON salary_payments
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Triggers
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_salary_payments_updated_at
  BEFORE UPDATE ON salary_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();