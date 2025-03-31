import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Teacher } from '../../types';

interface TeacherFormProps {
  onClose: () => void;
  onSubmit: (teacher: Partial<Teacher>) => void;
  teacher?: Teacher;
}

const expertise = [
  { id: 'quran', name: 'Quran' },
  { id: 'math', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
];

export default function TeacherForm({ onClose, onSubmit, teacher }: TeacherFormProps) {
  const [formData, setFormData] = useState<Partial<Teacher>>(teacher || {
    fullName: '',
    phoneNumber: '',
    expertise: [],
    classAssignments: [{
      id: crypto.randomUUID(),
      subject: '',
      schedule: [{ day: '', time: '' }],
      studentCount: 0
    }],
    salary: {
      amount: 0,
      currency: 'PKR',
      paymentSchedule: 'Monthly'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSchedule = (assignmentIndex: number) => {
    const newAssignments = [...(formData.classAssignments || [])];
    newAssignments[assignmentIndex].schedule.push({ day: '', time: '' });
    setFormData({ ...formData, classAssignments: newAssignments });
  };

  const removeSchedule = (assignmentIndex: number, scheduleIndex: number) => {
    const newAssignments = [...(formData.classAssignments || [])];
    newAssignments[assignmentIndex].schedule.splice(scheduleIndex, 1);
    setFormData({ ...formData, classAssignments: newAssignments });
  };

  const addClassAssignment = () => {
    setFormData({
      ...formData,
      classAssignments: [
        ...(formData.classAssignments || []),
        {
          id: crypto.randomUUID(),
          subject: '',
          schedule: [{ day: '', time: '' }],
          studentCount: 0
        }
      ]
    });
  };

  const removeClassAssignment = (index: number) => {
    const newAssignments = [...(formData.classAssignments || [])];
    newAssignments.splice(index, 1);
    setFormData({ ...formData, classAssignments: newAssignments });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {teacher ? 'Edit Teacher' : 'Add New Teacher'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expertise
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {expertise.map((exp) => (
                  <label key={exp.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(formData.expertise || []).includes(exp.name)}
                      onChange={(e) => {
                        const expertise = formData.expertise || [];
                        if (e.target.checked) {
                          setFormData({ ...formData, expertise: [...expertise, exp.name] });
                        } else {
                          setFormData({
                            ...formData,
                            expertise: expertise.filter(item => item !== exp.name)
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{exp.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Assignments
              </label>
              {formData.classAssignments?.map((assignment, assignmentIndex) => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    
                    <h4 className="text-sm font-medium text-gray-700">Assignment {assignmentIndex + 1}</h4>
                    {assignmentIndex > 0 && (
                      <button
                        type="button"
                        onClick={() => removeClassAssignment(assignmentIndex)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={assignment.subject}
                        onChange={(e) => {
                          const newAssignments = [...(formData.classAssignments || [])];
                          newAssignments[assignmentIndex].subject = e.target.value;
                          setFormData({ ...formData, classAssignments: newAssignments });
                        }}
                      >
                        <option value="">Select a subject</option>
                        {expertise.map((exp) => (
                          <option key={exp.id} value={exp.name}>
                            {exp.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {assignment.schedule.map((schedule, scheduleIndex) => (
                    <div key={scheduleIndex} className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Day
                        </label>
                        <select
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={schedule.day}
                          onChange={(e) => {
                            const newAssignments = [...(formData.classAssignments || [])];
                            newAssignments[assignmentIndex].schedule[scheduleIndex].day = e.target.value;
                            setFormData({ ...formData, classAssignments: newAssignments });
                          }}
                        >
                          <option value="">Select a day</option>
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., 4:00 PM AEST"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={schedule.time}
                            onChange={(e) => {
                              const newAssignments = [...(formData.classAssignments || [])];
                              newAssignments[assignmentIndex].schedule[scheduleIndex].time = e.target.value;
                              setFormData({ ...formData, classAssignments: newAssignments });
                            }}
                          />
                        </div>
                        {scheduleIndex > 0 && (
                          <button
                            type="button"
                            onClick={() => removeSchedule(assignmentIndex, scheduleIndex)}
                            className="self-end mb-2 text-red-600 hover:text-red-700"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addSchedule(assignmentIndex)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Schedule
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addClassAssignment}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Class Assignment
              </button>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Information
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (PKR)
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.salary?.amount}
                    onChange={(e) => setFormData({
                      ...formData,
                      salary: { ...formData.salary!, amount: Number(e.target.value) }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <input
                    type="text"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    value="PKR"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Schedule
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.salary?.paymentSchedule}
                    onChange={(e) => setFormData({
                      ...formData,
                      salary: { ...formData.salary!, paymentSchedule: e.target.value }
                    })}
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
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
              {teacher ? 'Update Teacher' : 'Add Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}