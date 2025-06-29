import React from 'react';
import { Server, Cloud, Code, Shield, Zap, GitBranch, Container, Database, Monitor, Settings } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  // Real experience-based tech stack organized by category
  const techStack = {
    'Cloud Platforms': [
      { name: 'AWS', experience: 'Production', icon: Cloud, description: 'EKS, ECS, S3, CloudFront, RDS' },
      { name: 'GCP', experience: 'Production', icon: Cloud, description: 'Vertex AI, GKE, Cloud Run' },
      { name: 'Azure', experience: 'Learning', icon: Cloud, description: 'AKS, Container Apps, Key Vault' }
    ],
    'Container & Orchestration': [
      { name: 'Kubernetes', experience: 'Expert', icon: Server, description: 'Custom operators, multi-cluster' },
      { name: 'Docker', experience: 'Expert', icon: Container, description: 'Multi-stage builds, optimization' },
      { name: 'Helm', experience: 'Production', icon: Settings, description: 'Chart development, GitOps' }
    ],
    'Infrastructure as Code': [
      { name: 'Terraform', experience: 'Expert', icon: Code, description: 'Modules, workspaces, state mgmt' },
      { name: 'OpenTofu', experience: 'Production', icon: Code, description: 'Open-source Terraform fork' }
    ],
    'MLOps & AI': [
      { name: 'KServe', experience: 'Production', icon: Zap, description: 'Model serving, inference' },
      { name: 'Knative', experience: 'Production', icon: Zap, description: 'Serverless containers' },
      { name: 'LLM Deployment', experience: 'Learning', icon: Shield, description: 'Self-hosted models' }
    ],
    'Development': [
      { name: 'C# (.NET)', experience: 'Expert', icon: Code, description: 'Minimal APIs, microservices' },
      { name: 'Go', experience: 'Production', icon: Code, description: 'K8s operators, CLI tools' },
      { name: 'Python', experience: 'Production', icon: Code, description: 'Flask, FastAPI, ML pipelines' }
    ],
    'CI/CD & Monitoring': [
      { name: 'TeamCity', experience: 'Expert', icon: GitBranch, description: 'Complex pipelines, automation' },
      { name: 'GitHub Actions', experience: 'Production', icon: GitBranch, description: 'Workflows, security scanning' },
      { name: 'ELK Stack', experience: 'Production', icon: Monitor, description: 'Centralized logging' },
      { name: 'Prometheus', experience: 'Learning', icon: Monitor, description: 'Metrics collection' }
    ]
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Expert': return 'text-green-400 bg-green-400/10';
      case 'Production': return 'text-cyan-400 bg-cyan-400/10';
      case 'Learning': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const values = [
    {
      title: 'Automation First',
      description: 'If I have to do it twice, I\'ll spend 10 hours automating a 5-minute task. It\'s not laziness, it\'s efficiency.'
    },
    {
      title: 'Reliability Focus',
      description: 'Building systems that work at 3 AM when I\'m asleep and can\'t fix them. Because sleep is important.'
    },
    {
      title: 'Continuous Learning',
      description: 'The cloud changes faster than my coffee gets cold. Staying current isn\'t optional, it\'s survival.'
    },
    {
      title: 'Pragmatic Solutions',
      description: 'Sometimes the best architecture is the one that actually ships. Perfect is the enemy of done.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-800" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              About <span className="text-cyan-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a DevOps engineer who turns coffee into cloud infrastructure. Currently based in Turin, 
              I spend my days making sure applications deploy smoothly and my nights wondering why 
              Kubernetes decided to restart that pod at 2 AM.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Tech Stack Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Code className="text-cyan-400 mr-3" size={28} />
                Tech Stack & Experience
              </h3>
              <div className="space-y-6">
                {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
                  <div 
                    key={category}
                    className={`transition-all duration-1000 ${
                      isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                    style={{ transitionDelay: `${categoryIndex * 150}ms` }}
                  >
                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">{category}</h4>
                    <div className="grid gap-3">
                      {technologies.map((tech, techIndex) => {
                        const Icon = tech.icon;
                        return (
                          <div 
                            key={tech.name}
                            className="group bg-gray-700/30 rounded-lg p-4 border border-gray-600 hover:border-cyan-400/50 transition-all duration-300"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Icon className="text-cyan-400 mr-3 group-hover:text-green-400 transition-colors" size={20} />
                                <span className="text-gray-300 font-medium">{tech.name}</span>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(tech.experience)}`}>
                                {tech.experience}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">{tech.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Values Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Zap className="text-cyan-400 mr-3" size={28} />
                Core Values
              </h3>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div 
                    key={value.title}
                    className={`bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 ${
                      isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">{value.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Focus */}
          <div className="bg-gradient-to-r from-gray-700/30 to-gray-600/30 rounded-xl p-8 border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Current Obsessions</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-cyan-400 font-mono text-lg">MLOps</div>
                <p className="text-gray-300 text-sm">Making machine learning models behave in production (spoiler: they don't want to)</p>
              </div>
              <div className="space-y-2">
                <div className="text-green-400 font-mono text-lg">Kubernetes</div>
                <p className="text-gray-300 text-sm">Orchestrating containers like a symphony conductor, except the musicians are rebellious</p>
              </div>
              <div className="space-y-2">
                <div className="text-orange-400 font-mono text-lg">Multi-Cloud</div>
                <p className="text-gray-300 text-sm">Because putting all your eggs in one cloud basket is so 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;