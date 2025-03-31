export interface NavItem {
  title: string;
  path: string;
  icon: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Student {
  id: string;
  fullName: string;
  phoneNumber: string;
  parentName: string;
  country: string;
  class: string;
  assignedTeacher: string;
  classTime: string;
  leaves: Leave[];
  createdAt: string;
  updatedAt: string;
}

export interface Leave {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Country {
  code: string;
  name: string;
}

export interface ClassSubject {
  id: string;
  name: string;
}

export interface Teacher {
  id: string;
  fullName: string;
  phoneNumber: string;
  expertise: string[];
  classAssignments: ClassAssignment[];
  salary?: {
    amount: number;
    currency: string;
    paymentSchedule: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ClassAssignment {
  id: string;
  subject: string;
  schedule: {
    day: string;
    time: string;
  }[];
  studentCount: number;
}

export interface Schedule {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  day: string;
  time: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  amount: number;
  quantity: number;
}

export interface Salary {
  id: string;
  teacherId: string;
  teacherName: string;
  amount: number;
  month: string;
  year: number;
  status: 'pending' | 'paid';
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollReport {
  totalSalaries: number;
  totalInvoices: number;
  outstandingInvoices: number;
  monthlyExpenses: number;
  salaryHistory: Salary[];
  recentInvoices: Invoice[];
}

export interface Attendance {
  id: string;
  userId: string;
  userType: 'student' | 'teacher';
  userName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  checkIn?: string;
  checkOut?: string;
  markedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceReport {
  userId: string;
  userName: string;
  userType: 'student' | 'teacher';
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  attendancePercentage: number;
  recentAttendance: Attendance[];
}

export interface AttendanceInsights {
  totalStudents: number;
  totalTeachers: number;
  averageAttendance: number;
  teacherAttendance: {
    present: number;
    absent: number;
    late: number;
  };
  studentAttendance: {
    present: number;
    absent: number;
    late: number;
  };
}

export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  fullName: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  actions: string[];
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'schedule' | 'reminder' | 'change' | 'attendance';
  status: 'unread' | 'read';
  createdAt: string;
}