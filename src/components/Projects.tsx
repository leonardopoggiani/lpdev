import React, { useState } from 'react';
import { ExternalLink, Server, Cloud, Code, Shield, Zap, Database } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Projects: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    {
      title: 'Imperatore Travel Cloud Migration',
      description: 'Led the complete migration of a high-traffic travel website from on-premise multi-VPS setup to AWS cloud-native architecture. Because sometimes you need to move mountains (or at least websites).',
      tech: ['AWS', 'Kubernetes', 'Terraform', 'WordPress'],
      allTech: ['AWS', 'Kubernetes', 'Terraform', 'WordPress', 'Docker', 'CloudFront'],
      demo: 'https://www.imperatoretravel.com/it/',
      icon: Cloud,
      achievements: ['Zero downtime migration', 'Improved performance', 'Reduced infrastructure costs'],
      featured: true
    },
    {
      title: 'MLOps Pipeline with KServe',
      description: 'Implemented self-hosted LLM deployment using KServe and Knative. Making AI models behave in production is like herding cats, but with more YAML.',
      tech: ['KServe', 'Knative', 'Kubernetes', 'Python'],
      allTech: ['KServe', 'Knative', 'Kubernetes', 'Python', 'MLflow', 'Prometheus'],
      demo: null,
      icon: Code,
      achievements: ['Reduced inference latency', 'Automated model serving', 'Scalable ML infrastructure'],
      featured: true
    },
    {
      title: 'Multi-Cloud Infrastructure',
      description: 'Architected infrastructure spanning AWS, GCP, and Azure using Terraform. Because putting all your eggs in one cloud basket is so 2020.',
      tech: ['Terraform', 'AWS', 'GCP', 'Azure'],
      allTech: ['Terraform', 'AWS', 'GCP', 'Azure', 'OpenTofu', 'Ansible'],
      demo: null,
      icon: Zap,
      achievements: ['Multi-cloud deployment', 'Infrastructure as Code', 'Disaster recovery'],
      featured: false
    },
    {
      title: 'Kubernetes Pod Migration Research',
      description: 'Published research on live migration of multi-container Kubernetes pods across clusters. Academic proof that I can make containers move without breaking things.',
      tech: ['Kubernetes', 'Go', 'Research', 'Edge Computing'],
      allTech: ['Kubernetes', 'Go', 'Research', 'Edge Computing', 'CRIU', 'Containerd'],
      demo: 'https://dl.acm.org/doi/10.1145/3660319.3660330',
      icon: Shield,
      achievements: ['Published at ACM HPDC', 'Novel migration strategy', 'Edge computing optimization'],
      featured: false
    },
    {
      title: 'CI/CD Pipeline Automation',
      description: 'Engineered sophisticated CI/CD pipelines using TeamCity with automated testing and security scanning. Because manual deployments are for people who enjoy suffering.',
      tech: ['TeamCity', 'Docker', 'Kubernetes', 'Security Scanning'],
      allTech: ['TeamCity', 'Docker', 'Kubernetes', 'Security Scanning', 'SonarQube', 'Trivy'],
      demo: null,
      icon: Database,
      achievements: ['Automated deployments', 'Security integration', 'Reduced deployment time'],
      featured: false
    },
    {
      title: 'Custom Kubernetes Operators',
      description: 'Developed custom Kubernetes operators for production-grade clusters. Teaching Kubernetes new tricks, one CRD at a time.',
      tech: ['Go', 'Kubernetes', 'Operators', 'CRDs'],
      allTech: ['Go', 'Kubernetes', 'Operators', 'CRDs', 'Kubebuilder', 'Helm'],
      demo: null,
      icon: Server,
      achievements: ['Custom automation', 'Improved reliability', 'Simplified operations'],
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const TechStackTooltip = ({ project }: { project: typeof projects[0] }) => {
    const hiddenTech = project.allTech.slice(project.tech.length);
    const hiddenCount = project.allTech.length - project.tech.length;
    
    if (hiddenCount <= 0) return null;
    
    return (
      <div className="relative inline-block">
        <span 
          className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded cursor-help"
          onMouseEnter={() => setHoveredProject(project.title)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          +{hiddenCount}
        </span>
        {hoveredProject === project.title && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg border border-gray-600 whitespace-nowrap z-10">
            {hiddenTech.join(', ')}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 bg-gray-800" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured <span className="text-cyan-400">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A collection of things I've built, migrated, or convinced to work properly. 
              Some even work on weekends.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.title}
                  className={`bg-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 ${
                    isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <Icon className="text-cyan-400" size={32} />
                      <div className="flex space-x-3">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-700 text-cyan-400 text-sm rounded-full font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        <TechStackTooltip project={project} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Key Achievements</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {project.achievements.map((achievement) => (
                          <div key={achievement} className="flex items-center text-sm text-gray-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Other Projects Grid */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Other Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProjects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <div
                    key={project.title}
                    className={`bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 ${
                      isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${(index + featuredProjects.length) * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="text-cyan-400" size={24} />
                      <div className="flex space-x-2">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-700 text-cyan-400 text-xs rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      <TechStackTooltip project={project} />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {project.achievements[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;