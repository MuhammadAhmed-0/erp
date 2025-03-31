import React, { useState } from 'react';
import ScheduleList from '../components/schedule/ScheduleList';
import ScheduleForm from '../components/schedule/ScheduleForm';
import { Schedule } from '../types';

export default function SchedulePage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>();
  
  // For demo purposes, assuming admin role
  const userRole = 'admin';

  const handleSubmit = (schedule: Partial<Schedule>) => {
    console.log('Schedule data:', schedule);
    setShowForm(false);
    setSelectedSchedule(undefined);
  };

  const handleEdit = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowForm(true);
  };

  const handleDelete = (scheduleId: string) => {
    console.log('Delete schedule:', scheduleId);
  };

  return (
    <div className="p-6">
      <ScheduleList
        userRole={userRole}
        onAddNew={() => {
          setSelectedSchedule(undefined);
          setShowForm(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <ScheduleForm
          schedule={selectedSchedule}
          onClose={() => {
            setShowForm(false);
            setSelectedSchedule(undefined);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}