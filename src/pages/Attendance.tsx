import React, { useState } from 'react';
import TeacherAttendance from '../components/attendance/TeacherAttendance';
import StudentAttendance from '../components/attendance/StudentAttendance';
import AttendanceInsights from '../components/attendance/AttendanceInsights';
import { UserRole } from '../types';

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<'teachers' | 'students' | 'insights'>('teachers');
  const userRole: UserRole = 'admin'; // For demo purposes

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'teachers'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Teacher Attendance
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'students'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Student Attendance
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'insights'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Insights
          </button>
        </div>
      </div>

      {activeTab === 'teachers' && <TeacherAttendance userRole={userRole} />}
      {activeTab === 'students' && <StudentAttendance userRole={userRole} />}
      {activeTab === 'insights' && <AttendanceInsights />}
    </div>
  );
}