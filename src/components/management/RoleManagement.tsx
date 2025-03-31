import React, { useState } from 'react';
import { Shield, Check, X } from 'lucide-react';
import { Permission, UserRole } from '../../types';

const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'manage_students',
    description: 'Create, edit, and delete student records',
    module: 'students',
    actions: ['create', 'read', 'update', 'delete'],
  },
  {
    id: '2',
    name: 'manage_teachers',
    description: 'Create, edit, and delete teacher records',
    module: 'teachers',
    actions: ['create', 'read', 'update', 'delete'],
  },
  {
    id: '3',
    name: 'manage_attendance',
    description: 'Mark and view attendance records',
    module: 'attendance',
    actions: ['create', 'read', 'update'],
  },
  {
    id: '4',
    name: 'manage_schedule',
    description: 'Create and modify class schedules',
    module: 'schedule',
    actions: ['create', 'read', 'update', 'delete'],
  },
  {
    id: '5',
    name: 'manage_payroll',
    description: 'Process payments and manage financial records',
    module: 'payroll',
    actions: ['create', 'read', 'update'],
  },
];

const roles: { value: UserRole; label: string }[] = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
];

export default function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);

  const togglePermission = (permissionId: string) => {
    setRolePermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSave = () => {
    console.log('Saving permissions for role:', selectedRole, rolePermissions);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Role Permissions</h2>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {mockPermissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {permission.name.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </h3>
                    <p className="text-sm text-gray-500">{permission.description}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {permission.actions.map((action) => (
                        <span
                          key={action}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                        >
                          {action.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => togglePermission(permission.id)}
                  className={`p-2 rounded-full ${
                    rolePermissions.includes(permission.id)
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {rolePermissions.includes(permission.id) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}