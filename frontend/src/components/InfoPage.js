import React, { useState, useEffect, useRef } from 'react';
import './InfoPage.css';
import { createUserFeedback } from '../api/api';
import { API_BASE_URL } from '../config';

const InfoPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [scrollY, setScrollY] = useState(0);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const foundersRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(''); // Clear any previous errors
    
    try {
      const result = await createUserFeedback(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.feedback,
        API_BASE_URL
      );
      
      if (result.error) {
        // Handle API error
        console.error('Feedback submission failed:', result.error);
        setSubmitError(result.error);
        setIsSubmitting(false);
        return;
      }
      
      // Success - reset form and show success message
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitError(''); // Clear any error messages
      setFormData({ firstName: '', lastName: '', email: '', feedback: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      console.error('Network error:', error);
      setSubmitError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const founders = [
    {
      name: 'Sam Gibson',
      role: 'Software & Technology',
      description: 'Leading the technical development and platform architecture to create a seamless networking experience for pastors and church leaders.',
      image: '/headshots/sam.jpg'
    },
    {
      name: 'Bernard Legaspi',
      role: 'Vision & Strategy',
      description: 'Driving the strategic direction and long-term vision for Assembly, ensuring we serve the unique needs of pastoral communities.',
      image: '/headshots/bernard.jpg'
    },
    {
      name: 'Jeff Wang',
      role: 'Communication & Outreach',
      description: 'Building bridges between pastors and churches, fostering meaningful connections and community engagement across the body of Christ.',
      image: '/headshots/jeff.jpeg'
    }
  ];

  const cards = [
    {
      icon: '🤝',
      title: 'Pastor-to-Pastor Networking',
      desc: 'Connect with verified pastors from churches worldwide for fellowship, mentorship, and collaboration.',
      bgColor: 'bg-blue-800/50',
      iconBg: 'bg-blue-700'
    },
    {
      icon: '🏛️',
      title: 'Church & Ministry Focus',
      desc: 'Built for churches, organizations, and ministry leaders with kingdom growth in mind.',
                     bgColor: 'bg-indigo-800/50',
       iconBg: 'bg-indigo-700'
    },
    {
      icon: '🔒',
      title: 'Trust & Verification',
      desc: 'All pastors and churches are verified to ensure authentic connections within the ministry community.',
      bgColor: 'bg-blue-900/50',
      iconBg: 'bg-blue-800'
    }
  ];

  const features = [
    { icon: '👥', title: 'Verified Profiles', desc: 'Every pastor and church profile is verified to ensure authenticity' },
    { icon: '📱', title: 'Private Messaging', desc: 'Secure communication between leaders' },
    { icon: '📅', title: 'Event Sharing', desc: 'Share and discover ministry events' },
    { icon: '💬', title: 'Community Posts', desc: 'Share insights and ministry updates' },
    { icon: '🔍', title: 'Search & Filter', desc: 'Find pastors and churches by location, church size, denomination, and more' },
    { icon: '🗣️', title: 'Discussion Forums', desc: 'Engage in discussions and share ideas with fellow pastors' },
]

  // Calculate scroll-based transforms
  const getScrollTransform = (ref, offset = 0) => {
    if (!ref.current) return { opacity: 1, transform: 'translateY(0)' };
    const rect = ref.current.getBoundingClientRect();
    const elementTop = rect.top + offset;
    const elementHeight = rect.height;
    const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - elementTop) / elementHeight));
    
    return {
      opacity: scrollProgress,
      transform: `translateY(${20 - scrollProgress * 20}px)`
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Hero Section */}
        <div ref={heroRef} className="relative overflow-hidden min-h-[60vh] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                      <div 
              className="animate-fade-in"
              style={getScrollTransform(heroRef)}
            >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                Assembly
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              The premier networking platform connecting pastors and church leaders worldwide. 
              Building bridges between ministries, facilitating collaboration, and strengthening the Body of Christ.
            </p>
                         <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 border border-blue-400/30">
              <span className="animate-pulse mr-2">🚀</span>
              Coming Soon
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-indigo-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-300/20 rounded-full animate-float-slow"></div>
      </div>

             {/* Platform Description */}
       <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-16">
                     <h2 className="text-4xl font-bold text-slate-900 mb-6">
             Why Assembly?
           </h2>
           <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Assembly is specifically designed for pastors and church leaders to connect, collaborate, and support one another in ministry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {cards.map((feature, index) => (
            <div 
                key={index}
                                 className={`text-center p-6 rounded-2xl ${feature.bgColor} backdrop-blur-sm border border-blue-700/30 shadow-2xl transition-all duration-500 group`}
                                 style={{
                  ...getScrollTransform(featuresRef, index * 100),
                  transitionDelay: `${index * 100}ms`,
                  transform: `${getScrollTransform(featuresRef, index * 100).transform} scale(1)`
                }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = `${getScrollTransform(featuresRef, index * 100).transform} scale(1.1)`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = `${getScrollTransform(featuresRef, index * 100).transform} scale(1)`;
                 }}
            >
                <div className={`w-16 h-16 ${feature.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                             <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
               <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founders Section */}
             <div ref={foundersRef} className="bg-gradient-to-b from-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Meet Our Founders
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              A team of passionate leaders committed to strengthening pastoral communities through meaningful connections.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
                <div 
                    key={founder.name}
                    className="text-center group"
                >
                <div className="relative mb-6">
                   <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl transform group-hover:scale-110 transition-all duration-500 border-4 border-blue-600/30">
                     <img 
                       src={founder.image} 
                       alt={`${founder.name} - ${founder.role}`}
                       className="w-full h-full object-cover"
                     />
                   </div>
                 </div>
                <h3 className="text-2xl font-bold text-white mb-2">{founder.name}</h3>
                <p className="text-lg font-semibold text-blue-300 mb-4">{founder.role}</p>
                <p className="text-blue-200 leading-relaxed">{founder.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Preview */}
             <div className="bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Platform Features
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Everything pastors need to connect, collaborate, and grow together in ministry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center text-white group hover:scale-105 transition-transform duration-300"
                style={{
                  ...getScrollTransform(foundersRef, index * 100),
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-200 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

             {/* Feedback Form */}
       <div ref={formRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-12">
                     <h2 className="text-4xl font-bold text-slate-900 mb-6">
             Stay Connected
           </h2>
           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We'd love to hear from you! Share your thoughts, feedback, or just let us know you're interested in Assembly.
          </p>
        </div>
        
                 <div 
           className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 border border-blue-200"
           style={getScrollTransform(formRef)}
         >
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                <span className="text-3xl text-green-400">✓</span>
              </div>
                             <h3 className="text-2xl font-semibold text-slate-900 mb-2">Thank You!</h3>
               <p className="text-slate-600">Your feedback has been submitted. We use your feedback to inform the development process and improve the platform. Thank you for your input!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                                 <label htmlFor="feedback" className="block text-sm font-medium text-slate-700 mb-2">
                   Feedback or Message
                 </label>
                                 <textarea
                   id="feedback"
                   name="feedback"
                   value={formData.feedback}
                   onChange={handleInputChange}
                   rows={4}
                   className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-slate-900 placeholder-slate-400"
                   placeholder="Share your thoughts, questions, or how you'd like to use Assembly..."
                 />
              </div>
              
              {submitError && (
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <span className="text-sm font-medium">⚠️ {submitError}</span>
                  </div>
                </div>
              )}
              
              <div className="text-center">
                                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/30 hover:shadow-blue-500/25"
                 >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Feedback'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
             <div className="bg-blue-950 text-white py-12 border-t border-blue-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Assembly</h3>
                     <p className="text-blue-300 mb-6">
             Connecting pastors, strengthening churches, building community.
           </p>
           <div className="text-sm text-blue-400">
            © 2025 Assembly. All rights reserved.
          </div>
        </div>
      </div>


    </div>
  );
};

export default InfoPage;
