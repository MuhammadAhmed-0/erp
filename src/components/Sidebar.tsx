import React from 'react';
import { NavItem } from '../types';
import useAuthStore from '../store/authStore';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  Calendar,
  DollarSign,
  Settings,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';

const navigation: NavItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { title: 'Students', path: '/students', icon: 'Users' },
  { title: 'Teachers', path: '/teachers', icon: 'GraduationCap' },
  { title: 'Attendance', path: '/attendance', icon: 'CalendarCheck' },
  { title: 'Schedule', path: '/schedule', icon: 'Calendar' },
  { title: 'Payroll', path: '/payroll', icon: 'DollarSign' },
  { title: 'Management', path: '/management', icon: 'Settings' },
];

const iconComponents: { [key: string]: React.ComponentType } = {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  Calendar,
  DollarSign,
  Settings,
};

export default function Sidebar() {
  const { logout, user, hasPermission } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const filteredNavigation = navigation.filter(item => {
    if (item.path === '/management' && !hasPermission('super_admin')) {
      return false;
    }
    return true;
  });

  return (
    <div className="h-screen w-64 bg-indigo-900 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <GraduationCap className="w-8 h-8" />
        <h1 className="text-xl font-bold">Quran ERP</h1>
      </div>
      <nav className="flex flex-col justify-between h-[calc(100%-5rem)]">
        <div className="space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = iconComponents[item.icon];
            return (
              <a
                key={item.path}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  const moduleId = item.path.replace('/', '');
                  window.dispatchEvent(new CustomEvent('changeModule', { detail: moduleId }));
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{item.title}</span>
              </a>
            );
          })}
        </div>
        
        <div className="border-t border-indigo-800 pt-4">
          <div className="px-4 py-2 mb-4">
            <p className="text-sm text-indigo-300">Signed in as</p>
            <p className="font-medium">{user?.fullName}</p>
            <p className="text-sm text-indigo-300">{user?.role.replace('_', ' ').toUpperCase()}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}