import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Student } from '../../types';

const mockStudents: Student[] = [
  {
    id: '1',
    fullName: 'Ahmed Khan',
    phoneNumber: '+61234567890',
    parentName: 'Mohammad Khan',
    country: 'Australia',
    class: 'Quran Class',
    assignedTeacher: 'Ustadh Abdullah',
    classTime: 'Monday, Wednesday 4:00 PM AEST',
    leaves: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    fullName: 'Sara Ahmed',
    phoneNumber: '+61234567891',
    parentName: 'Ahmed Ali',
    country: 'Australia',
    class: 'Physics',
    assignedTeacher: 'Mr. John Smith',
    classTime: 'Tuesday, Thursday 2:00 PM AEST',
    leaves: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

interface StudentListProps {
  onAddNew: () => void;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

export default function StudentList({ onAddNew, onEdit, onDelete }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [students] = useState<Student[]>(mockStudents);

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Students</h2>
          <button
            onClick={onAddNew}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Student
          </button>
        </div>
        
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                      <div className="text-sm text-gray-500">{student.country}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.phoneNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.parentName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{student.class}</div>
                  <div className="text-sm text-gray-500">{student.assignedTeacher}</div>
                  <div className="text-sm text-gray-500">{student.classTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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