import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import { Teacher, UserRole } from '../../types';

const mockTeachers: Teacher[] = [
  {
    id: '1',
    fullName: 'Ustadh Abdullah',
    phoneNumber: '+61234567890',
    expertise: ['Quran', 'Mathematics'],
    classAssignments: [
      {
        id: '1',
        subject: 'Quran Recitation',
        schedule: [
          { day: 'Monday', time: '4:00 PM AEST' },
          { day: 'Wednesday', time: '4:00 PM AEST' }
        ],
        studentCount: 5
      }
    ],
    salary: {
      amount: 50000,
      currency: 'PKR',
      paymentSchedule: 'Monthly'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

interface TeacherListProps {
  userRole: UserRole;
  onAddNew: () => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacherId: string) => void;
  onView: (teacher: Teacher) => void;
}

export default function TeacherList({ userRole, onAddNew, onEdit, onDelete, onView }: TeacherListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers] = useState<Teacher[]>(mockTeachers);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Teachers</h2>
          {userRole === 'admin' && (
            <button
              onClick={onAddNew}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Teacher
            </button>
          )}
        </div>
        
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search teachers..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
              {userRole === 'admin' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{teacher.fullName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {teacher.expertise.map((exp, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {teacher.classAssignments.map((assignment) => (
                      <div key={assignment.id} className="mb-1">
                        {assignment.subject}
                        <span className="text-gray-500 text-xs block">
                          {assignment.schedule.map(s => `${s.day} ${s.time}`).join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                {userRole === 'admin' && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.phoneNumber}</div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onView(teacher)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {userRole === 'admin' && (
                      <>
                        <button
                          onClick={() => onEdit(teacher)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(teacher.id)}
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
  );
}