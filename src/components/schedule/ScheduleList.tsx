import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Bell } from 'lucide-react';
import { Schedule, UserRole } from '../../types';

const mockSchedules: Schedule[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Ahmed Khan',
    teacherId: '1',
    teacherName: 'Ustadh Abdullah',
    subject: 'Quran Recitation',
    day: 'Monday',
    time: '4:00 PM AEST',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'Ahmed Khan',
    teacherId: '1',
    teacherName: 'Ustadh Abdullah',
    subject: 'Quran Recitation',
    day: 'Wednesday',
    time: '4:00 PM AEST',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface ScheduleListProps {
  userRole: UserRole;
  onAddNew: () => void;
  onEdit: (schedule: Schedule) => void;
  onDelete: (scheduleId: string) => void;
}

export default function ScheduleList({ userRole, onAddNew, onEdit, onDelete }: ScheduleListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [schedules] = useState<Schedule[]>(mockSchedules);
  const [showNotification, setShowNotification] = useState(false);

  const filteredSchedules = schedules.filter(schedule =>
    schedule.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendNotification = (schedule: Schedule) => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="space-y-4">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Notification sent successfully!
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Class Schedule</h2>
            {userRole === 'admin' && (
              <button
                onClick={onAddNew}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Schedule
              </button>
            )}
          </div>
          
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search schedules..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{schedule.studentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.teacherName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.day}</div>
                    <div className="text-sm text-gray-500">{schedule.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => sendNotification(schedule)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Send reminder"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                      {userRole === 'admin' && (
                        <>
                          <button
                            onClick={() => onEdit(schedule)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(schedule.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}