import React, { useState } from 'react';
import UserManagement from '../components/management/UserManagement';
import RoleManagement from '../components/management/RoleManagement';
import useAuthStore from '../store/authStore';

export default function Management() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const hasPermission = useAuthStore(state => state.hasPermission);

  if (!hasPermission('super_admin')) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                You don't have permission to access this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">System Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'roles'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Role Management
          </button>
        </div>
      </div>

      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'roles' && <RoleManagement />}
    </div>
  );
}