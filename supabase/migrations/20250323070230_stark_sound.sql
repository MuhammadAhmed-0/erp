/*
  # Schedule Management Schema

  1. New Tables
    - `schedules`
      - Stores class schedules
      - Links students with teachers and subjects
    - `schedule_notifications`
      - Stores schedule-related notifications

  2. Security
    - Enable RLS
    - Add policies for different user roles
*/

CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  day text NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  time text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id uuid REFERENCES schedules(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('reminder', 'change', 'cancellation')),
  status text NOT NULL DEFAULT 'unread' CHECK (status IN ('read', 'unread')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_notifications ENABLE ROW LEVEL SECURITY;

-- Policies for schedules
CREATE POLICY "Students can view their schedules"
  ON schedules
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Teachers can view their class schedules"
  ON schedules
  FOR SELECT
  TO authenticated
  USING (teacher_id = auth.uid());

CREATE POLICY "Admins can manage all schedules"
  ON schedules
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Policies for notifications
CREATE POLICY "Users can view related notifications"
  ON schedule_notifications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM schedules
      WHERE id = schedule_notifications.schedule_id
      AND (student_id = auth.uid() OR teacher_id = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all notifications"
  ON schedule_notifications
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_schedules_updated_at
  BEFORE UPDATE ON schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();