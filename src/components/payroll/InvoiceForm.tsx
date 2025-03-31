import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Invoice, InvoiceItem } from '../../types';
import CurrencyInput from 'react-currency-input-field';

interface InvoiceFormProps {
  onClose: () => void;
  onSubmit: (invoice: Partial<Invoice>) => void;
  invoice?: Invoice;
}

const currencies = ['AUD', 'NZD', 'PKR', 'SAR', 'AED', 'QAR', 'KWD'];

export default function InvoiceForm({ onClose, onSubmit, invoice }: InvoiceFormProps) {
  const [formData, setFormData] = useState<Partial<Invoice>>(invoice || {
    studentId: '',
    studentName: '',
    amount: 0,
    currency: 'AUD',
    status: 'pending',
    dueDate: new Date().toISOString().split('T')[0],
    items: [{ id: crypto.randomUUID(), description: '', amount: 0, quantity: 1 }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...(formData.items || []), { id: crypto.randomUUID(), description: '', amount: 0, quantity: 1 }]
    });
  };

  const removeItem = (id: string) => {
    setFormData({
      ...formData,
      items: formData.items?.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setFormData({
      ...formData,
      items: formData.items?.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const calculateTotal = () => {
    return formData.items?.reduce((total, item) => total + (item.amount * item.quantity), 0) || 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {invoice ? 'Edit Invoice' : 'Generate New Invoice'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.dueDate?.split('T')[0]}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Invoice['status'] })}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {formData.items?.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <CurrencyInput
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={item.amount}
                    onValueChange={(value) => updateItem(item.id, 'amount', Number(value) || 0)}
                    decimalsLimit={2}
                    prefix={`${formData.currency} `}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <div className="text-right">
                <span className="text-sm font-medium text-gray-700">Total: </span>
                <span className="text-lg font-bold text-gray-900">
                  {formData.currency} {calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {invoice ? 'Update Invoice' : 'Generate Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}