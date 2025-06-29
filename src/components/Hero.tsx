import React, { useEffect, useState } from 'react';
import { Terminal, ChevronDown } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

const Hero: React.FC = () => {
  const [showCursor, setShowCursor] = useState(true);
  const typewriterText = useTypewriter({
    words: ['Cloud Engineer', 'DevOps Enthusiast', 'Kubernetes Whisperer', 'MLOps Practitioner', 'Infrastructure Automator'],
    typeSpeed: 80,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
  });

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Terminal Window */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl mb-8 max-w-2xl mx-auto">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Terminal className="text-cyan-400" size={18} />
              <span className="text-gray-300 font-mono text-sm">leonardo@cloud:~$</span>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 font-mono text-left">
            <div className="text-gray-400 mb-2">$ whoami</div>
            <div className="text-green-400 mb-4">Leonardo Poggiani</div>
            
            <div className="text-gray-400 mb-2">$ cat role.txt</div>
            <div className="text-cyan-400 text-xl md:text-2xl font-bold mb-4">
              {typewriterText}
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </div>
            
            <div className="text-gray-400 mb-2">$ cat mission.txt</div>
            <div className="text-gray-300 leading-relaxed">
              Fueled by perfectly steeped tea, Umbria ingenuity, and relentless curiosity since 2023. Currently making Kubernetes behave in Turin (but my heart is in Umbria).
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-6">
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I build things that scale, deploy things that work, and occasionally fix things that break at 3 AM. 
            Welcome to my corner of the cloud.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              View My Work
            </button>
            <button
              onClick={() => document.querySelector('#cv')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-semibold rounded-md transition-all duration-200 transform hover:scale-105"
            >
              Download CV
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-cyan-400 transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;