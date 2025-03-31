/*
  # Teacher Management Schema

  1. New Tables
    - `teachers`
      - Extends user information for teachers
      - Stores teacher expertise and salary information
    - `teacher_expertise`
      - Junction table for teacher subject expertise
    - `teacher_schedules`
      - Stores teacher class schedules and assignments

  2. Security
    - Enable RLS
    - Add policies for admins and teachers
*/

CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  salary_amount numeric NOT NULL DEFAULT 0,
  salary_currency text NOT NULL DEFAULT 'PKR',
  payment_schedule text NOT NULL DEFAULT 'Monthly' CHECK (payment_schedule IN ('Weekly', 'Bi-weekly', 'Monthly')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS teacher_expertise (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  subject text NOT NULL CHECK (subject IN ('Quran', 'Mathematics', 'Physics', 'Chemistry')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(teacher_id, subject)
);

CREATE TABLE IF NOT EXISTS teacher_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  subject text NOT NULL,
  day text NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  time text NOT NULL,
  student_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_schedules ENABLE ROW LEVEL SECURITY;

-- Policies for teachers table
CREATE POLICY "Teachers can view their own data"
  ON teachers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all teachers"
  ON teachers
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Policies for teacher_expertise
CREATE POLICY "Public can view teacher expertise"
  ON teacher_expertise
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage teacher expertise"
  ON teacher_expertise
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Policies for teacher_schedules
CREATE POLICY "Teachers can view their schedules"
  ON teacher_schedules
  FOR SELECT
  TO authenticated
  USING (teacher_id = auth.uid());

CREATE POLICY "Admins can manage all schedules"
  ON teacher_schedules
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Triggers
CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_teacher_schedules_updated_at
  BEFORE UPDATE ON teacher_schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();