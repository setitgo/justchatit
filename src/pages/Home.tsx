import { useState } from 'react';
import { Bot, Calendar, HeadsetIcon, Banknote, Clock, TrendingUp, DollarSign, Heart, MessageSquare, Activity, Users, Calculator } from 'lucide-react';
import { Header } from '../components/Header';
import { ServiceCard } from '../components/ServiceCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { Modal } from '../components/Modal';
import { CalendlyWidget } from '../components/CalendlyWidget';
import { AssessmentForm } from '../components/AssessmentForm';

const services = [
  {
    title: 'AI Chatbots',
    description: 'Intelligent conversational agents that provide 24/7 patient support and information.',
    icon: <Bot className="w-6 h-6" />
  },
  {
    title: 'AI Receptionists',
    description: 'Virtual receptionists that handle scheduling, inquiries, and patient routing.',
    icon: <HeadsetIcon className="w-6 h-6" />
  },
  {
    title: 'AI Appointment Setters',
    description: 'Automated scheduling system that manages appointments efficiently.',
    icon: <Calendar className="w-6 h-6" />
  },
  {
    title: 'AI Collections Callers',
    description: 'Automated payment collection and billing management system.',
    icon: <Banknote className="w-6 h-6" />
  }
];

const benefits = [
  {
    title: '24/7 Availability',
    description: 'Round-the-clock service for patient support',
    icon: <Clock className="w-6 h-6" />
  },
  {
    title: 'Increased Efficiency',
    description: 'Streamlined operations and faster response times',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: 'Cost Reduction',
    description: 'Significant savings on operational expenses',
    icon: <DollarSign className="w-6 h-6" />
  },
  {
    title: 'Better Patient Experience',
    description: 'Enhanced patient satisfaction and care quality',
    icon: <Heart className="w-6 h-6" />
  }
];

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Medical Director',
    content: 'JustChatIt has revolutionized our patient communication system. The AI chatbots handle routine inquiries perfectly, allowing our staff to focus on more complex patient needs.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'James Wilson',
    role: 'Hospital Administrator',
    content: 'The cost savings and efficiency gains from implementing JustChatIt\'s AI solutions have been remarkable. Our patient satisfaction scores have increased significantly.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Clinical Director',
    content: 'The AI appointment setter has eliminated scheduling conflicts and reduced no-shows by 60%. It\'s been a game-changer for our practice.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Revolutionize Medical Communication with AI
              </h1>
              <p className="text-xl text-purple-100">
                Transform your healthcare practice with intelligent, automated communication solutions that enhance patient care and streamline operations.
              </p>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Get Started
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse rounded-3xl"></div>
              <div className="relative p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg animate-float">
                    <Activity className="w-8 h-8 mb-4" />
                    <h3 className="font-semibold mb-2">Smart Analytics</h3>
                    <p className="text-sm text-purple-100">Real-time insights into patient interactions</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg animate-float delay-500">
                    <MessageSquare className="w-8 h-8 mb-4" />
                    <h3 className="font-semibold mb-2">AI Chat</h3>
                    <p className="text-sm text-purple-100">24/7 intelligent patient support</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg animate-float delay-700">
                    <Users className="w-8 h-8 mb-4" />
                    <h3 className="font-semibold mb-2">Patient Care</h3>
                    <p className="text-sm text-purple-100">Enhanced patient experience</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg animate-float">
                    <Bot className="w-8 h-8 mb-4" />
                    <h3 className="font-semibold mb-2">AI Assistant</h3>
                    <p className="text-sm text-purple-100">Automated scheduling & support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <ServiceCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Value Assessment Tool Section */}
      <section id="assessment" className="py-20 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 p-12 rounded-3xl backdrop-blur-md">
            <Calculator className="w-16 h-16 mx-auto mb-6 text-purple-300" />
            <h2 className="text-3xl font-bold mb-6">AI Value Assessment Tool</h2>
            <p className="text-xl text-purple-100 mb-8">
              Discover how much time and money your practice could save with our AI-powered solutions. Get a personalized ROI analysis in minutes.
            </p>
            <AssessmentForm />
          </div>
        </div>
      </section>

      {/* Book a Session Section */}
      <section id="book" className="py-20 px-4 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Practice?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Schedule a personalized session with our team to discover how JustChatIt can revolutionize your medical practice's communication.
          </p>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all"
          >
            Book a Session
          </button>
        </div>
      </section>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Schedule a Session"
      >
        <CalendlyWidget url="https://calendly.com/pateljilly1/30min" />
      </Modal>
    </div>
  );
}