import React, { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { generateCVPDF } from '../utils/pdfGenerator';

interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string[];
  }>;
  skills: string[];
  education: Array<{
    institution: string;
    degree: string;
    period: string;
  }>;
  certifications: string[];
}

const CV: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [showPreview, setShowPreview] = useState(false);

  const cvData: CVData = {
    personalInfo: {
      name: 'Leonardo Poggiani',
      title: 'Cloud & DevOps Engineer',
      email: 'leonardo.poggiani@gmail.com',
      phone: '+39 345 30 46 078',
      location: 'Turin, Italy',
      linkedin: 'leonardo-poggiani-359625153',
      github: 'leonardopoggiani'
    },
    summary: 'Results-driven Cloud & DevOps Engineer with expertise in architecting and implementing scalable cloud-native solutions. Specialized in MLOps, Kubernetes orchestration, and multi-cloud infrastructure across AWS, GCP, and Azure. Proven track record in implementing robust CI/CD pipelines and developing cloud-native applications. Currently focused on advancing LLM deployment strategies and ML infrastructure optimization.',
    experience: [
      {
        company: 'Geckosoft S.R.L.',
        position: 'DevOps & Backend Engineer',
        period: '05/2023 - Present',
        description: [
          'Led end-to-end migration of high-traffic travel website Imperatore Travel from on-premise multi-VPS setup to scalable AWS cloud-native architecture',
          'Spearheaded MLOps practices implementation, including deployment of self-hosted LLMs using KServe and Knative with Envoy AI Gateway',
          'Designed and implemented end-to-end ML training pipelines on GCP and AWS',
          'Architected multi-cloud infrastructure using AWS and managed production systems on Azure with Infrastructure as Code principles',
          'Developed custom Kubernetes operators and established production-grade clusters',
          'Engineered sophisticated CI/CD pipelines using TeamCity with automated testing and security scanning'
        ]
      }
    ],
    skills: [
      'KServe', 'Knative', 'ML Training Pipelines', 'Kubernetes', 'AWS', 'Azure', 
      'Terraform/OpenTofu', 'TeamCity', 'GitHub Actions', 'ArgoCD', 'Helm',
      'ELK Stack', 'Prometheus', 'Grafana', 'C# (.NET Core)', 'Python', 'Go (Academic)', 'TypeScript', 'Envoy AI Gateway'
    ],
    education: [
      {
        institution: 'Università di Pisa',
        degree: 'Master\'s Degree in Computer Engineering',
        period: '2020-2024'
      },
      {
        institution: 'Università di Pisa',
        degree: 'Bachelor\'s Degree in Computer Engineering',
        period: '2017-2020'
      }
    ],
    certifications: [
      'Published research on "Live Migration of Multi-Container Kubernetes Pods in Multi-Cluster Serverless Edge Systems"',
      'SEATED Workshop co-located with ACM HPDC (2024)'
    ]
  };

  const handleDownloadPDF = async () => {
    try {
      await generateCVPDF(cvData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <section id="cv" className="py-20 bg-gray-900" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              My <span className="text-cyan-400">CV</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              The formal stuff. Because apparently "I make things work in the cloud" isn't detailed enough for HR.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                <Download className="mr-2" size={18} />
                Download PDF
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center px-6 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-semibold rounded-md transition-all duration-200 transform hover:scale-105"
              >
                <Eye className="mr-2" size={18} />
                {showPreview ? 'Hide Preview' : 'Preview CV'}
              </button>
            </div>
          </div>

          {/* CV Preview */}
          {showPreview && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white text-gray-900 rounded-lg p-8 shadow-2xl">
                {/* Header */}
                <div className="border-b-2 border-gray-300 pb-6 mb-6">
                  <h1 className="text-3xl font-bold mb-2">{cvData.personalInfo.name}</h1>
                  <h2 className="text-xl text-gray-600 mb-4">{cvData.personalInfo.title}</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>{cvData.personalInfo.email}</div>
                    <div>{cvData.personalInfo.phone}</div>
                    <div>{cvData.personalInfo.location}</div>
                    <div>linkedin.com/in/{cvData.personalInfo.linkedin}</div>
                    <div>github.com/{cvData.personalInfo.github}</div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-cyan-600">Profile</h3>
                  <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
                </div>

                {/* Areas of Expertise */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-cyan-600">Areas of Expertise</h3>
                  <p className="text-gray-700 leading-relaxed">
                    MLOps • Kubernetes • AWS • Azure Production Systems • Terraform/OpenTofu • CI/CD • .NET • Go (Academic) • Python • Docker • KServe • Knative • Envoy AI Gateway • ML Infrastructure • Cloud Migration
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-cyan-600">Quick Stats about Turin</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                    <li>First capital of unified Italy (1861-1865) and host of the 2006 Winter Olympics</li>
                    <li>Home to automotive giants: Fiat, Lancia, Alfa Romeo, and Stellantis headquarters</li>
                    <li>Houses the world's second-largest Egyptian museum after Cairo</li>
                    <li>"Chocolate Capital of Italy" - birthplace of Nutella, gianduiotto, and bicerin</li>
                    <li>Tech hub: home to major startups and the UniCredit Innovation Lab</li>
                    <li>UNESCO World Heritage sites include Residences of the Royal House of Savoy</li>
                  </ul>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-cyan-600">Professional Experience</h3>
                  {cvData.experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold">{exp.position} - {exp.company}</h4>
                        <span className="text-sm text-gray-600">{exp.period}</span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                        {exp.description.map((desc, descIndex) => (
                          <li key={descIndex}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Technical Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-cyan-600">Technical Skills</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><strong>Cloud & MLOps:</strong> KServe, Knative, ML Training Pipelines (GCP Vertex AI, AWS SageMaker), Model Serving, Envoy AI Gateway</div>
                    <div><strong>Kubernetes:</strong> Cluster Management (GKE, EKS, AKS), Custom Operators, GitOps (ArgoCD), Helm</div>
                    <div><strong>Cloud Platforms:</strong> AWS (EKS, ECS, EC2, S3, Lambda), Azure (Managed Production Systems, AKS, Container Apps), GCP</div>
                    <div><strong>Infrastructure as Code:</strong> Terraform/OpenTofu (Modules, Workspaces, Remote State)</div>
                    <div><strong>Development:</strong> C# (.NET Core), Python (Flask, FastAPI), Go (Academic), TypeScript, SQL</div>
                  </div>
                </div>

                {/* Education & Research */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-cyan-600">Education</h3>
                    {cvData.education.map((edu, index) => (
                      <div key={index} className="mb-3">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-sm text-gray-600">{edu.institution} - {edu.period}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-cyan-600">Research & Publications</h3>
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold">Live Migration of Multi-Container Kubernetes Pods in Multi-Cluster Serverless Edge Systems</p>
                      <p className="text-gray-600">SEATED Workshop co-located with ACM HPDC (2024)</p>
                      <p className="text-gray-600">DOI: 10.1145/3660319.3660330</p>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-3 text-cyan-600">Languages</h3>
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">Italian:</span> Native • 
                    <span className="font-semibold"> English:</span> Professional Working Proficiency (B2) • 
                    <span className="font-semibold"> French:</span> Elementary Proficiency (A2)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CV;