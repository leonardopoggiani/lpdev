import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, BookOpen, Container, Coffee, Zap, Terminal, Code, Cloud, Server } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Links: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/leonardopoggiani',
      description: 'Where I store my code and pretend to be organized',
      color: 'hover:bg-gray-700',
      stats: 'Public repos & contributions'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/leonardo-poggiani-359625153',
      description: 'Professional networking and humble bragging',
      color: 'hover:bg-blue-600',
      stats: 'Professional connections'
    },
    {
      name: 'Docker Hub',
      icon: Container,
      url: 'https://hub.docker.com/u/leonardopoggiani',
      description: 'Container images that actually work',
      color: 'hover:bg-blue-500',
      stats: 'Containerized solutions'
    },
    {
      name: 'Research',
      icon: BookOpen,
      url: 'https://dl.acm.org/doi/10.1145/3660319.3660330',
      description: 'Academic proof that I can write more than just code',
      color: 'hover:bg-green-600',
      stats: 'Published research'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:leonardo.poggiani@gmail.com',
      description: 'For when you need to reach me directly',
      color: 'hover:bg-red-600',
      stats: 'Direct contact'
    }
  ];

  const currentlyReading = [
    {
      title: 'Kubernetes: The Hard Way',
      author: 'Kelsey Hightower',
      url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way',
      description: 'Learning K8s from the ground up',
      icon: Server
    },
    {
      title: 'Terraform: Up & Running',
      author: 'Yevgeniy Brikman',
      url: 'https://www.terraformupandrunning.com/',
      description: 'Infrastructure as Code best practices',
      icon: Cloud
    },
    {
      title: 'Building Microservices',
      author: 'Sam Newman',
      url: 'https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/',
      description: 'Designing fine-grained systems',
      icon: Code
    },
    {
      title: 'MLOps Engineering at Scale',
      author: 'Carl Osipov',
      url: 'https://www.manning.com/books/mlops-engineering-at-scale',
      description: 'Production ML systems',
      icon: Zap
    },
    {
      title: 'Cloud Native Patterns',
      author: 'Cornelia Davis',
      url: 'https://www.manning.com/books/cloud-native-patterns',
      description: 'Designing change-tolerant software',
      icon: Terminal
    }
  ];

  const quickStats = [
    { label: 'Years in DevOps', value: '2+', description: 'And counting...' },
    { label: 'Cloud Platforms', value: '3', description: 'AWS, GCP, Azure' },
    { label: 'Containers Deployed', value: '1000+', description: 'Still running' },
    { label: 'Coffee Dependency', value: 'Critical', description: 'Send help' }
  ];

  return (
    <section id="links" className="py-20 bg-gray-900" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Connect With <span className="text-cyan-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find me across the internet, where I occasionally share useful things and frequently overthink infrastructure decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-gray-800 rounded-xl p-6 border border-gray-700 transition-all duration-300 transform hover:scale-105 hover:border-cyan-400/50 ${link.color} ${
                    isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon 
                      size={32} 
                      className="text-gray-400 group-hover:text-white transition-colors" 
                    />
                    <ExternalLink 
                      size={18} 
                      className="text-gray-600 group-hover:text-gray-400 transition-colors" 
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                    {link.description}
                  </p>
                  <div className="text-xs text-cyan-400 font-mono">
                    {link.stats}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Quick Stats & Currently Reading */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {quickStats.map((stat, index) => (
                  <div key={stat.label} className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm font-medium mb-1">
                      {stat.label}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <p className="text-gray-400 text-sm">
                  Powered by caffeine and curiosity since 2023
                </p>
              </div>
            </div>

            {/* Currently Reading/Learning */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Currently Reading
              </h3>
              <div className="space-y-4">
                {currentlyReading.map((book, index) => {
                  const Icon = book.icon;
                  return (
                    <a
                      key={book.title}
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-200 group"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <Icon className="text-cyan-400 group-hover:text-green-400 transition-colors" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">
                          {book.title}
                        </h4>
                        <p className="text-gray-400 text-xs mb-1">by {book.author}</p>
                        <p className="text-gray-500 text-xs">{book.description}</p>
                      </div>
                      <ExternalLink 
                        size={14} 
                        className="text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 ml-2" 
                      />
                    </a>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <p className="text-gray-400 text-sm">
                  Always learning, sometimes understanding
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Links;