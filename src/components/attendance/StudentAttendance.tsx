import React, { useState } from 'react';
import { Search, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Attendance, UserRole } from '../../types';
import AttendanceCalendar from './AttendanceCalendar';

const mockStudentAttendance: Attendance[] = [
  {
    id: '1',
    userId: '1',
    userType: 'student',
    userName: 'Ahmed Khan',
    date: new Date().toISOString(),
    status: 'present',
    markedBy: 'Ustadh Abdullah',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

interface StudentAttendanceProps {
  userRole: UserRole;
}

export default function StudentAttendance({ userRole }: StudentAttendanceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [attendance] = useState<Attendance[]>(mockStudentAttendance);

  const filteredAttendance = attendance.filter(record =>
    record.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    console.log('Marking attendance:', { studentId, status, date: selectedDate });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Student Attendance</h2>
            <div className="flex gap-4">
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marked By</th>
                {userRole === 'teacher' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedStudent(record.userId)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.userName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(record.date), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      record.status === 'present'
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'late'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.markedBy}</div>
                  </td>
                  {userRole === 'teacher' && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAttendance(record.userId, 'present');
                          }}
                          className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200"
                        >
                          Present
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAttendance(record.userId, 'absent');
                          }}
                          className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
                        >
                          Absent
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAttendance(record.userId, 'late');
                          }}
                          className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200"
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudent && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Attendance History</h3>
            <button
              onClick={() => setSelectedStudent(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          <AttendanceCalendar userId={selectedStudent} />
        </div>
      )}

      {userRole === 'admin' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Consecutive Absences</h4>
                <p className="text-sm text-red-700">
                  Ahmed Khan has been absent for 3 consecutive classes
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}