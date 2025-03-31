import React, { useState } from 'react';
import TeacherList from '../components/teachers/TeacherList';
import TeacherForm from '../components/teachers/TeacherForm';
import { Teacher } from '../types';

export default function Teachers() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>();
  
  // For demo purposes, assuming admin role
  const userRole = 'admin';

  const handleSubmit = (teacher: Partial<Teacher>) => {
    console.log('Teacher data:', teacher);
    setShowForm(false);
    setSelectedTeacher(undefined);
  };

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowForm(true);
  };

  const handleDelete = (teacherId: string) => {
    console.log('Delete teacher:', teacherId);
  };

  const handleView = (teacher: Teacher) => {
    console.log('View teacher:', teacher);
  };

  return (
    <div className="p-6">
      <TeacherList
        userRole={userRole}
        onAddNew={() => {
          setSelectedTeacher(undefined);
          setShowForm(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
      {showForm && (
        <TeacherForm
          teacher={selectedTeacher}
          onClose={() => {
            setShowForm(false);
            setSelectedTeacher(undefined);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}