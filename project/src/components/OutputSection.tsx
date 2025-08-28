import React from 'react';
import { Copy, Check, Target, Users, DollarSign, TrendingUp, Lightbulb, MessageSquare } from 'lucide-react';
import { GeneratedPitch } from '../utils/pitchGenerator';

interface OutputSectionProps {
  pitch: GeneratedPitch;
  copiedSection: string | null;
  onCopy: (section: string, content: string) => void;
}

export default function OutputSection({ pitch, copiedSection, onCopy }: OutputSectionProps) {
  const sections = [
    {
      id: 'elevator',
      title: 'Elevator Pitch',
      icon: MessageSquare,
      content: pitch.elevatorPitch,
      description: '30-second version'
    },
    {
      id: 'tagline',
      title: 'Tagline',
      icon: Lightbulb,
      content: pitch.tagline,
      description: 'Memorable slogan'
    },
    {
      id: 'value',
      title: 'Value Proposition',
      icon: Target,
      content: pitch.valueProposition,
      description: 'Core business value'
    },
    {
      id: 'slides',
      title: 'Slide Bullets',
      icon: TrendingUp,
      content: pitch.slidePoints.map((point, idx) => `${idx + 1}. ${point}`).join('\n'),
      description: 'Presentation outline'
    },
    {
      id: 'competitors',
      title: 'Competitors',
      icon: Users,
      content: pitch.competitors.join('\n• '),
      description: 'Market landscape'
    },
    {
      id: 'revenue',
      title: 'Revenue Models',
      icon: DollarSign,
      content: pitch.revenueModels.map(model => `• ${model.name}: ${model.description}`).join('\n'),
      description: 'Monetization strategies'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Pitch Package</h2>
        <p className="text-gray-600">Professional materials ready for your presentation</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isCopied = copiedSection === section.id;

          return (
            <div key={section.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                      <p className="text-xs text-gray-500">{section.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onCopy(section.id, section.content)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isCopied 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-lg font-semibold mb-2">Ready to pitch? 🚀</h3>
        <p className="text-blue-100">Use these materials to create a compelling presentation and win your next pitch competition!</p>
      </div>
    </div>
  );
}