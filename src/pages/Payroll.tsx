import React, { useState } from 'react';
import InvoiceList from '../components/payroll/InvoiceList';
import SalaryList from '../components/payroll/SalaryList';
import PayrollReport from '../components/payroll/PayrollReport';
import { UserRole } from '../types';

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'salaries' | 'reports'>('invoices');
  const userRole: UserRole = 'admin'; // For demo purposes

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'invoices'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('salaries')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'salaries'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Salaries
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'reports'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {activeTab === 'invoices' && <InvoiceList userRole={userRole} />}
      {activeTab === 'salaries' && <SalaryList userRole={userRole} />}
      {activeTab === 'reports' && <PayrollReport />}
    </div>
  );
}