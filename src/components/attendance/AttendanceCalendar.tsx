import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, format } from 'date-fns';

interface AttendanceCalendarProps {
  userId: string;
}

// Mock data generator for the heatmap
const generateMockData = (userId: string) => {
  const today = new Date();
  const data = [];
  for (let i = 0; i < 365; i++) {
    if (Math.random() > 0.3) { // 70% attendance rate
      data.push({
        date: format(subDays(today, i), 'yyyy-MM-dd'),
        count: Math.random() > 0.8 ? 0.5 : 1 // 0.5 for late, 1 for present
      });
    }
  }
  return data;
};

export default function AttendanceCalendar({ userId }: AttendanceCalendarProps) {
  const attendanceData = generateMockData(userId);
  const today = new Date();
  const startDate = subDays(today, 365);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-sm text-gray-600">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
            <span className="text-sm text-gray-600">Late</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
            <span className="text-sm text-gray-600">Absent</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={attendanceData}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return value.count === 1 ? 'color-present' : 'color-late';
          }}
          titleForValue={(value) => {
            if (!value) {
              return 'Absent';
            }
            return value.count === 1 ? 'Present' : 'Late';
          }}
        />
      </div>

      <style>{`
        .react-calendar-heatmap .color-empty {
          fill: #e5e7eb;
        }
        .react-calendar-heatmap .color-present {
          fill: #34d399;
        }
        .react-calendar-heatmap .color-late {
          fill: #fbbf24;
        }
      `}</style>
    </div>
  );
}