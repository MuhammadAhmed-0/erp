import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ModuleCard from './components/ModuleCard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Schedule from './pages/Schedule';
import Payroll from './pages/Payroll';
import Attendance from './pages/Attendance';
import Management from './pages/Management';
import Login from './pages/Login';
import { Module } from './types';
import useAuthStore from './store/authStore';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  Calendar,
  DollarSign,
  Settings,
  LayoutDashboard,
} from 'lucide-react';

const modules: Module[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Overview of system activities and key metrics',
    icon: 'LayoutDashboard'
  },
  {
    id: 'students',
    title: 'Student Management',
    description: 'Manage student enrollments, profiles, and academic progress',
    icon: 'Users'
  },
  {
    id: 'teachers',
    title: 'Teacher Management',
    description: 'Handle teacher profiles, assignments, and qualifications',
    icon: 'GraduationCap'
  },
  {
    id: 'schedule',
    title: 'Class Scheduling',
    description: 'Create and manage class schedules and assignments',
    icon: 'Calendar'
  },
  {
    id: 'attendance',
    title: 'Attendance Tracking',
    description: 'Monitor and manage student and teacher attendance',
    icon: 'CalendarCheck'
  },
  {
    id: 'payroll',
    title: 'Payroll Management',
    description: 'Process teacher payments and manage financial records',
    icon: 'DollarSign'
  },
  {
    id: 'management',
    title: 'System Management',
    description: 'Configure system settings and user permissions',
    icon: 'Settings'
  }
];

function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const { isAuthenticated, hasPermission } = useAuthStore();

  // Listen for module change events from the sidebar
  React.useEffect(() => {
    const handleModuleChange = (event: CustomEvent) => {
      setCurrentModule(event.detail);
    };

    window.addEventListener('changeModule' as any, handleModuleChange);

    return () => {
      window.removeEventListener('changeModule' as any, handleModuleChange);
    };
  }, []);

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderModule = () => {
    switch (currentModule) {
      case 'students':
        return <Students />;
      case 'teachers':
        return <Teachers />;
      case 'schedule':
        return <Schedule />;
      case 'payroll':
        return <Payroll />;
      case 'attendance':
        return <Attendance />;
      case 'management':
        return <Management />;
      default:
        return (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome to Quran ERP</h1>
              <p className="text-gray-600 mt-2">
                Manage your educational institution efficiently with our comprehensive ERP system
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules
                .filter(module => 
                  module.id !== 'management' || hasPermission('super_admin')
                )
                .map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onClick={() => setCurrentModule(module.id)}
                  />
                ))
              }
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="pt-24 px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;