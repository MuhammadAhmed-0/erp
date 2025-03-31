import React from 'react';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { PayrollReport as PayrollReportType } from '../../types';

const mockReport: PayrollReportType = {
  totalSalaries: 250000,
  totalInvoices: 150000,
  outstandingInvoices: 50000,
  monthlyExpenses: 300000,
  salaryHistory: [],
  recentInvoices: []
};

export default function PayrollReport() {
  const stats = [
    {
      title: 'Total Salaries (PKR)',
      value: mockReport.totalSalaries.toLocaleString(),
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Invoices (PKR)',
      value: mockReport.totalInvoices.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Outstanding Invoices',
      value: mockReport.outstandingInvoices.toLocaleString(),
      icon: AlertCircle,
      color: 'bg-yellow-500'
    },
    {
      title: 'Monthly Expenses',
      value: mockReport.monthlyExpenses.toLocaleString(),
      icon: CheckCircle,
      color: 'bg-purple-500'
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
                <p className="text-2xl font-bold text-gray-900">PKR {stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Salary Trend</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart will be implemented here
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Status Distribution</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart will be implemented here
          </div>
        </div>
      </div>
    </div>
  );
}