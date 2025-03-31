import React, { useState } from 'react';
import StudentList from '../components/students/StudentList';
import StudentForm from '../components/students/StudentForm';
import { Student } from '../types';

export default function Students() {
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();

  const handleSubmit = (student: Partial<Student>) => {
    console.log('Student data:', student);
    setShowForm(false);
    setSelectedStudent(undefined);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleDelete = (studentId: string) => {
    console.log('Delete student:', studentId);
  };

  return (
    <div className="p-6">
      <StudentList
        onAddNew={() => {
          setSelectedStudent(undefined);
          setShowForm(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <StudentForm
          student={selectedStudent}
          onClose={() => {
            setShowForm(false);
            setSelectedStudent(undefined);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}