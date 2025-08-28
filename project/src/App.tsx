import React, { useState } from 'react';
import { Lightbulb, Rocket, Users, TrendingUp, Target } from 'lucide-react';
import InputForm, { StartupData } from './components/InputForm';
import OutputSection from './components/OutputSection';
import { generatePitch, GeneratedPitch } from './utils/pitchGenerator';

function App() {
  const [generatedPitch, setGeneratedPitch] = useState<GeneratedPitch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleGenerate = async (data: StartupData) => {
    setIsLoading(true);
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const pitch = generatePitch(data);
    setGeneratedPitch(pitch);
    setIsLoading(false);
  };

  const handleCopy = async (section: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleReset = () => {
    setGeneratedPitch(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PitchCraft AI</h1>
                <p className="text-sm text-gray-600">Professional pitch generation for startups</p>
              </div>
            </div>
            {generatedPitch && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                New Pitch
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!generatedPitch && (
        <section className="py-16">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
              AI Business Pitch Generator
            </h1>
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Ideas into 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Winning Pitches</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Generate professional elevator pitches, slide outlines, and business strategies in minutes. Perfect for hackathons, startup competitions, and investor presentations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Lightbulb, title: 'Smart Generation', desc: 'AI-powered content creation' },
                { icon: Target, title: 'Professional Quality', desc: 'Investor-ready materials' },
                { icon: Users, title: 'Market Analysis', desc: 'Competitor insights' },
                { icon: TrendingUp, title: 'Revenue Focus', desc: 'Monetization strategies' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {!generatedPitch ? (
          <div className="flex justify-center">
            <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
        ) : (
          <OutputSection 
            pitch={generatedPitch} 
            copiedSection={copiedSection}
            onCopy={handleCopy}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Built for entrepreneurs, by entrepreneurs. Make your next pitch unforgettable.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;