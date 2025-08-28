import React, { useState } from 'react';
import { Plus, Minus, Sparkles } from 'lucide-react';

interface InputFormProps {
  onGenerate: (data: StartupData) => void;
  isLoading: boolean;
}

export interface StartupData {
  name: string;
  problem: string[];
  solution: string[];
  target: string[];
  unique: string[];
}

export default function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [formData, setFormData] = useState<StartupData>({
    name: '',
    problem: [''],
    solution: [''],
    target: [''],
    unique: ['']
  });

  const addBulletPoint = (field: keyof Omit<StartupData, 'name'>) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeBulletPoint = (field: keyof Omit<StartupData, 'name'>, index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const updateBulletPoint = (field: keyof Omit<StartupData, 'name'>, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const renderBulletSection = (
    title: string,
    field: keyof Omit<StartupData, 'name'>,
    placeholder: string
  ) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">{title}</label>
      {formData[field].map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <div className="flex-1">
            <input
              type="text"
              value={item}
              onChange={(e) => updateBulletPoint(field, index, e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
          {formData[field].length > 1 && (
            <button
              type="button"
              onClick={() => removeBulletPoint(field, index)}
              className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Minus className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addBulletPoint(field)}
        className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Add bullet point
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          AI Pitch Generator
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transform Your Startup Idea</h2>
        <p className="text-gray-600">Enter your startup details and get a professional pitch package</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Startup Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your startup name"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {renderBulletSection(
          "Problem Statement",
          "problem",
          "What problem does your startup solve?"
        )}

        {renderBulletSection(
          "Solution",
          "solution",
          "How does your startup solve this problem?"
        )}

        {renderBulletSection(
          "Target Audience",
          "target",
          "Who are your target customers?"
        )}

        {renderBulletSection(
          "Unique Value",
          "unique",
          "What makes your startup unique?"
        )}

        <button
          type="submit"
          disabled={isLoading || !formData.name.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Pitch...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate Pitch Package
            </div>
          )}
        </button>
      </form>
    </div>
  );
}