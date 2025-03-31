/*
  # Attendance Management Schema

  1. New Tables
    - `attendance`
      - Stores attendance records for both teachers and students
      - Tracks attendance status, check-in/out times
    - `attendance_notifications`
      - Stores attendance-related notifications

  2. Security
    - Enable RLS
    - Add policies for different user roles
*/

CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  user_type text NOT NULL CHECK (user_type IN ('student', 'teacher')),
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  check_in time,
  check_out time,
  marked_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS attendance_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('absence', 'late', 'reminder')),
  status text NOT NULL DEFAULT 'unread' CHECK (status IN ('read', 'unread')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_notifications ENABLE ROW LEVEL SECURITY;

-- Policies for attendance
CREATE POLICY "Users can view their own attendance"
  ON attendance
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Teachers can manage student attendance"
  ON attendance
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'teacher'
    )
    AND user_type = 'student'
  );

CREATE POLICY "Admins can manage all attendance"
  ON attendance
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON attendance_notifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all notifications"
  ON attendance_notifications
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_attendance_updated_at
  BEFORE UPDATE ON attendance
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();