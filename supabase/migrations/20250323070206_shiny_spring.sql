/*
  # Student Management Schema

  1. New Tables
    - `students`
      - Extends user information for students
      - Stores additional student-specific details
      - Links to parent information and class assignments

  2. Security
    - Enable RLS
    - Add policies for admins and teachers
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  parent_name text NOT NULL,
  country text NOT NULL,
  class_type text NOT NULL CHECK (class_type IN ('quran', 'subject')),
  subject text CHECK (
    (class_type = 'subject' AND subject IN ('Mathematics', 'Physics', 'Chemistry')) OR
    (class_type = 'quran' AND subject IS NULL)
  ),
  assigned_teacher_id uuid REFERENCES users(id),
  class_time text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Students can view their own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Teachers can view assigned students"
  ON students
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'teacher'
      AND id = students.assigned_teacher_id
    )
  );

CREATE POLICY "Admins can manage all students"
  ON students
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();