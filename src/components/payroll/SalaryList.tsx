import React, { useState } from 'react';
import { Plus, Search, Edit2, DollarSign } from 'lucide-react';
import { Salary, UserRole } from '../../types';
import SalaryForm from './SalaryForm';
import { format } from 'date-fns';

const mockSalaries: Salary[] = [
  {
    id: '1',
    teacherId: '1',
    teacherName: 'Ustadh Abdullah',
    amount: 50000,
    month: 'March',
    year: 2024,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

interface SalaryListProps {
  userRole: UserRole;
}

export default function SalaryList({ userRole }: SalaryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [salaries] = useState<Salary[]>(mockSalaries);
  const [showForm, setShowForm] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<Salary | undefined>();

  const filteredSalaries = salaries.filter(salary =>
    salary.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePaySalary = (salary: Salary) => {
    // In a real application, this would process the payment
    console.log('Processing salary payment:', salary);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Teacher Salaries</h2>
            {userRole === 'admin' && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Salary Record
              </button>
            )}
          </div>
          
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search salaries..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (PKR)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSalaries.map((salary) => (
                <tr key={salary.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{salary.teacherName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{salary.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{salary.month} {salary.year}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      salary.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-3">
                      {userRole === 'admin' && (
                        <>
                          <button
                            onClick={() => handlePaySalary(salary)}
                            className="text-green-600 hover:text-green-900"
                            title="Process Payment"
                          >
                
                            <DollarSign className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSalary(salary);
                              setShowForm(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <SalaryForm
          salary={selectedSalary}
          onClose={() => {
            setShowForm(false);
            setSelectedSalary(undefined);
          }}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            setShowForm(false);
            setSelectedSalary(undefined);
          }}
        />
      )}
    </div>
  );
}