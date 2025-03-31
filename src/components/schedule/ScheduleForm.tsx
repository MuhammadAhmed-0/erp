import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Schedule, Student, Teacher, ClassSubject } from '../../types';

interface ScheduleFormProps {
  onClose: () => void;
  onSubmit: (schedule: Partial<Schedule>) => void;
  schedule?: Schedule;
}

// Mock data for demonstration
const mockStudents = [
  { id: '1', fullName: 'Ahmed Khan' },
  { id: '2', fullName: 'Sara Ahmed' },
];

const mockTeachers = [
  { id: '1', fullName: 'Ustadh Abdullah' },
  { id: '2', fullName: 'Ustadha Aisha' },
];

const subjects: ClassSubject[] = [
  { id: '1', name: 'Quran Recitation' },
  { id: '2', name: 'Quran Memorization' },
  { id: '3', name: 'Islamic Studies' },
  { id: '4', name: 'Arabic Language' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function ScheduleForm({ onClose, onSubmit, schedule }: ScheduleFormProps) {
  const [formData, setFormData] = useState<Partial<Schedule>>(schedule || {
    studentId: '',
    studentName: '',
    teacherId: '',
    teacherName: '',
    subject: '',
    day: '',
    time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleStudentChange = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    setFormData({
      ...formData,
      studentId,
      studentName: student?.fullName || '',
    });
  };

  const handleTeacherChange = (teacherId: string) => {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    setFormData({
      ...formData,
      teacherId,
      teacherName: teacher?.fullName || '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {schedule ? 'Edit Schedule' : 'Add New Schedule'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.studentId}
                onChange={(e) => handleStudentChange(e.target.value)}
              >
                <option value="">Select a student</option>
                {mockStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.teacherId}
                onChange={(e) => handleTeacherChange(e.target.value)}
              >
                <option value="">Select a teacher</option>
                {mockTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Day
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              >
                <option value="">Select a day</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 4:00 PM AEST"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {schedule ? 'Update Schedule' : 'Add Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}