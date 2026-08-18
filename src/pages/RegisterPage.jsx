import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, User, Phone, MapPin, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RegisterPage({ setCurrentUser }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    wardNumber: '4',
    address: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      name: formData.fullName || 'New Citizen',
      email: formData.email,
      phone: formData.phone,
      ward: formData.wardNumber,
      role: 'citizen'
    };
    setCurrentUser(newUser);
    navigate('/citizen/dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF9933] to-[#e68a00] mx-auto flex items-center justify-center text-white shadow-md mb-3">
            <Building2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">New Citizen Registration</h2>
          <p className="text-xs text-slate-500 mt-1">Join NDMC Nagrik AI Grievance Network</p>
        </div>

        <div className="flex justify-center items-center gap-4 text-xs font-semibold">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#1e3a6e]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#1e3a6e] text-white' : 'bg-slate-200'}`}>1</span>
            Basic Info
          </div>
          <div className="w-6 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#1e3a6e]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#1e3a6e] text-white' : 'bg-slate-200'}`}>2</span>
            Ward & Address
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <form onSubmit={handleRegister} className="space-y-4">
            
            {step === 1 && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ramesh Sharma"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Phone (OTP Verified)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98100 12345"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@gmail.com"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-xl font-bold text-white bg-[#1e3a6e] hover:bg-blue-900 transition-all text-xs flex items-center justify-center gap-2 mt-4"
                >
                  Continue to Address <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Select NDMC Ward</label>
                  <select
                    value={formData.wardNumber}
                    onChange={e => setFormData({ ...formData, wardNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="1">Ward 1 - Bengali Market / Babar Road</option>
                    <option value="2">Ward 2 - Connaught Place / Janpath</option>
                    <option value="3">Ward 3 - Golf Links / Sundar Nagar</option>
                    <option value="4">Ward 4 - Lodhi Estate / Khan Market</option>
                    <option value="5">Ward 5 - Chanakyapuri / Diplomatic Enclave</option>
                    <option value="8">Ward 8 - Sarojini Nagar / Laxmibai Nagar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Resident Address</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House No, Block, Colony, New Delhi"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Create Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-xl font-semibold border border-slate-300 text-slate-700 text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-bold text-white bg-[#FF9933] hover:bg-amber-600 transition-all text-xs"
                  >
                    Complete Registration
                  </button>
                </div>
              </>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}