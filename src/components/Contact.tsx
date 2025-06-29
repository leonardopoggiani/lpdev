import React, { useState } from 'react';
import { Mail, Calendar, Send, User, MessageSquare, ExternalLink } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio Website');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:leonardo.poggiani@gmail.com?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Get In <span className="text-cyan-400">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? Want to discuss cloud architecture over coffee? 
              Or just need someone to explain why your Kubernetes pods keep restarting? Let's talk!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-200 ${
              isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <Mail className="text-cyan-400 mr-3" size={28} />
                  <h3 className="text-2xl font-bold text-white">Send me a message</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        <User size={16} className="inline mr-2" />
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      <MessageSquare size={16} className="inline mr-2" />
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell me about your project, ask a question, or just say hi!"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-semibold rounded-md transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <div className="text-green-400 text-sm text-center">
                      Email client opened! Your message is ready to send.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="text-red-400 text-sm text-center">
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <p className="text-gray-400 text-sm text-center">
                    Or reach out directly: 
                    <a 
                      href="mailto:leonardo.poggiani@gmail.com" 
                      className="text-cyan-400 hover:text-cyan-300 ml-1 transition-colors"
                    >
                      leonardo.poggiani@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Calendar Booking */}
            <div className={`transition-all duration-1000 delay-400 ${
              isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 h-full">
                <div className="flex items-center mb-6">
                  <Calendar className="text-cyan-400 mr-3" size={28} />
                  <h3 className="text-2xl font-bold text-white">Book a meeting</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Prefer to chat face-to-face? Schedule a meeting and we can discuss your project, 
                  brainstorm solutions, or just talk about the latest in cloud tech.
                </p>
                
                <div className="bg-gray-700 rounded-lg p-6 mb-6 text-center">
                  <Calendar className="text-cyan-400 mx-auto mb-4" size={48} />
                  <h4 className="text-white font-semibold mb-4">Schedule a Call</h4>
                  <p className="text-gray-300 mb-6 text-sm">
                    Due to iframe restrictions, please click the button below to open my calendar in a new tab.
                  </p>
                  <a
                    href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1U6tvUj9YU9dNrNRq0S5CgYLorXuHJnZXRInNVaalE4KHAJSesF_xlD6hGSZu0z9Y1or-8qbia?gv=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md transition-all duration-200 transform hover:scale-105"
                  >
                    <ExternalLink className="mr-2" size={18} />
                    Open Calendar
                  </a>
                </div>
                
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                    <span>15-minute consultation calls available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                    <span>Video call via Google Meet</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3" />
                    <span>Timezone: Europe/Rome (CET/CEST)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Options */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Other ways to connect</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a
                href="mailto:leonardo.poggiani@gmail.com"
                className="group bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <Mail className="text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="text-white font-semibold mb-2">Email</h4>
                <p className="text-gray-400 text-sm">leonardo.poggiani@gmail.com</p>
              </a>
              
              <a
                href="https://linkedin.com/in/leonardo-poggiani-359625153"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">in</span>
                </div>
                <h4 className="text-white font-semibold mb-2">LinkedIn</h4>
                <p className="text-gray-400 text-sm">Professional networking</p>
              </a>
              
              <a
                href="https://github.com/leonardopoggiani"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-400/50 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="w-8 h-8 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">GH</span>
                </div>
                <h4 className="text-white font-semibold mb-2">GitHub</h4>
                <p className="text-gray-400 text-sm">Code & contributions</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;