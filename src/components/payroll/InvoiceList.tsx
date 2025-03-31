import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Send, FileText } from 'lucide-react';
import { Invoice, UserRole } from '../../types';
import InvoiceForm from './InvoiceForm';
import { format } from 'date-fns';

const mockInvoices: Invoice[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Ahmed Khan',
    amount: 100,
    currency: 'AUD',
    status: 'pending',
    dueDate: new Date().toISOString(),
    items: [
      {
        id: '1',
        description: 'Quran Recitation Classes',
        amount: 100,
        quantity: 1
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

interface InvoiceListProps {
  userRole: UserRole;
}

export default function InvoiceList({ userRole }: InvoiceListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [showForm, setShowForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>();
  const [showNotification, setShowNotification] = useState(false);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendWhatsApp = async (invoice: Invoice) => {
    try {
      // In a real application, this would use the WhatsApp Business API
      console.log('Sending invoice via WhatsApp:', invoice);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
  };

  const handleGeneratePDF = (invoice: Invoice) => {
    // In a real application, this would generate a PDF using jsPDF
    console.log('Generating PDF for invoice:', invoice);
  };

  return (
    <div className="space-y-4">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Invoice sent via WhatsApp successfully!
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Student Invoices</h2>
            {userRole === 'admin' && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Generate New Invoice
              </button>
            )}
          </div>
          
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoices..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.studentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {invoice.amount} {invoice.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : invoice.status === 'overdue'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleGeneratePDF(invoice)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Generate PDF"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSendWhatsApp(invoice)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Send via WhatsApp"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      {userRole === 'admin' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setShowForm(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => console.log('Delete invoice:', invoice.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
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
        <InvoiceForm
          invoice={selectedInvoice}
          onClose={() => {
            setShowForm(false);
            setSelectedInvoice(undefined);
          }}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            setShowForm(false);
            setSelectedInvoice(undefined);
          }}
        />
      )}
    </div>
  );
}