"use client";
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    hospitalName: '',
    email: '',
    details: ''
  });
  
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ fullName: '', hospitalName: '', email: '', details: '' }); // Clear form
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-slate-50 py-20 px-[5%] text-center">
        <h1 className="text-4xl font-bold text-[#005a8d] mb-4">Partner with Leadwell</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Inquire about bulk hospital supplies, distribution partnerships, or clinical product details. 
          Our team in Hyderabad is ready to assist.
        </p>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info Cards */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-[#005a8d]">Get in Touch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <Phone className="text-[#2ecc71] mb-4" size={24} />
              <h4 className="font-bold text-[#005a8d]">Business Inquiry</h4>
              <p className="text-gray-600 text-sm mt-1">+91 9346652741</p>
            </div>
            
            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <Mail className="text-[#2ecc71] mb-4" size={24} />
              <h4 className="font-bold text-[#005a8d]">Official Email</h4>
              <p className="text-gray-600 text-sm mt-1">lwppharma@gmail.com</p>
            </div>

            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <MapPin className="text-[#2ecc71] mb-4" size={24} />
              <h4 className="font-bold text-[#005a8d]">Location</h4>
              <p className="text-gray-600 text-sm mt-1">Hyderabad, Telangana, India</p>
            </div>

            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <Clock className="text-[#2ecc71] mb-4" size={24} />
              <h4 className="font-bold text-[#005a8d]">Operations</h4>
              <p className="text-gray-600 text-sm mt-1">Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>

        {/* Interactive Inquiry Form */}
        <div className="bg-white border border-slate-200 p-10 rounded-[40px] shadow-xl shadow-slate-100">
          <h3 className="text-2xl font-bold text-[#005a8d] mb-6">Send an Inquiry</h3>
          
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <CheckCircle2 size={60} className="text-[#2ecc71] mb-4" />
              <h4 className="text-2xl font-bold text-[#005a8d] mb-2">Inquiry Sent!</h4>
              <p className="text-slate-500">Our team will get back to you shortly.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-[#005a8d] font-bold underline">Send another inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#2ecc71]" 
                    placeholder="Enter Name" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">Hospital/Clinic Name</label>
                  <input 
                    type="text" 
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#2ecc71]" 
                    placeholder="Hospital Name" 
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#2ecc71]" 
                  placeholder="email@example.com" 
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Inquiry Details</label>
                <textarea 
                  rows="4" 
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-[#2ecc71]" 
                  placeholder="What products are you interested in?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-[#005a8d] text-white py-4 rounded-xl font-bold hover:bg-[#004066] transition shadow-lg shadow-blue-100 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
              </button>
              
              {status === 'error' && <p className="text-red-500 text-sm text-center mt-2">Failed to send inquiry. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}