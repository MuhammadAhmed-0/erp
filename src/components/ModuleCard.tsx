import React from 'react';
import { Module } from '../types';
import * as Icons from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  onClick?: () => void;
}

export default function ModuleCard({ module, onClick }: ModuleCardProps) {
  const Icon = (Icons as any)[module.icon];

  return (
    <div
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
      <p className="text-gray-600">{module.description}</p>
    </div>
  );
}