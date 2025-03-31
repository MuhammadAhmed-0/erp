import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, Clock, AlertTriangle } from 'lucide-react';
import { AttendanceInsights as AttendanceInsightsType } from '../../types';

const mockInsights: AttendanceInsightsType = {
  totalStudents: 50,
  totalTeachers: 10,
  averageAttendance: 85,
  teacherAttendance: {
    present: 8,
    absent: 1,
    late: 1
  },
  studentAttendance: {
    present: 42,
    absent: 5,
    late: 3
  }
};

const chartData = [
  {
    name: 'Teachers',
    Present: (mockInsights.teacherAttendance.present / mockInsights.totalTeachers) * 100,
    Late: (mockInsights.teacherAttendance.late / mockInsights.totalTeachers) * 100,
    Absent: (mockInsights.teacherAttendance.absent / mockInsights.totalTeachers) * 100,
  },
  {
    name: 'Students',
    Present: (mockInsights.studentAttendance.present / mockInsights.totalStudents) * 100,
    Late: (mockInsights.studentAttendance.late / mockInsights.totalStudents) * 100,
    Absent: (mockInsights.studentAttendance.absent / mockInsights.totalStudents) * 100,
  },
];

export default function AttendanceInsights() {
  const stats = [
    {
      title: 'Total Students',
      value: mockInsights.totalStudents,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Teachers',
      value: mockInsights.totalTeachers,
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      title: 'Average Attendance',
      value: `${mockInsights.averageAttendance}%`,
      icon: Clock,
      color: 'bg-indigo-500'
    },
    {
      title: 'Attendance Alerts',
      value: mockInsights.studentAttendance.absent + mockInsights.teacherAttendance.absent,
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Attendance Distribution</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Present" stackId="a" fill="#34d399" />
              <Bar dataKey="Late" stackId="a" fill="#fbbf24" />
              <Bar dataKey="Absent" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Absences</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Student Absence</h4>
                <p className="text-sm text-red-700">
                  Ahmed Khan has been absent for 3 consecutive classes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Late Check-in</h4>
                <p className="text-sm text-yellow-700">
                  Ustadh Abdullah checked in 15 minutes late today
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Teacher Attendance Rate</span>
              <span className="text-sm font-bold text-gray-900">
                {((mockInsights.teacherAttendance.present + mockInsights.teacherAttendance.late) / mockInsights.totalTeachers * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${(mockInsights.teacherAttendance.present / mockInsights.totalTeachers * 100)}%`
                }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-gray-600">Student Attendance Rate</span>
              <span className="text-sm font-bold text-gray-900">
                {((mockInsights.studentAttendance.present + mockInsights.studentAttendance.late) / mockInsights.totalStudents * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${(mockInsights.studentAttendance.present / mockInsights.totalStudents * 100)}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}