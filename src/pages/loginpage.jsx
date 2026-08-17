import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Shield, User, Building2, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage({ setCurrentUser }) {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'citizen';

  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleDemoFill = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'citizen') {
      setEmail('rahul.sharma@gmail.com');
      setPassword('password123');
    } else if (selectedRole === 'officer') {
      setEmail('ae.suresh@ndmc.gov.in');
      setPassword('officer123');
    } else if (selectedRole === 'admin') {
      setEmail('director.grievance@ndmc.gov.in');
      setPassword('admin123');
    }
  };

  useEffect(() => {
    handleDemoFill(initialRole);
  }, [initialRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email || `${role}@ndmc.gov.in`,
      role: role,
      name: role === 'admin' ? 'Super Admin' : role === 'officer' ? 'AE Suresh Kumar' : 'Rahul Sharma'
    };
    setCurrentUser(user);
    
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'officer') navigate('/officer/dashboard');
    else navigate('/citizen/dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl border border-slate-200 shadow-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 p-1 flex items-center justify-center mx-auto">
            <img src="/ndmc_logo.svg" alt="NDMC Emblem" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-heading font-extrabold text-[#0F172A]">
            Nagrik<span className="text-[#0D9488]">AI</span> Portal Login
          </h2>
          <p className="text-xs font-bold text-[#0D9488]">
            {role === 'officer' ? '👷 Field Officer Workstation' : role === 'admin' ? '📊 Super Admin Executive Portal' : '👤 Citizen Services Portal'}
          </p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => handleDemoFill('citizen')}
            className={`py-2 rounded-md font-bold transition-all ${
              role === 'citizen' ? 'bg-white text-[#0D9488] shadow-2xs' : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            Citizen
          </button>
          <button
            type="button"
            onClick={() => handleDemoFill('officer')}
            className={`py-2 rounded-md font-bold transition-all ${
              role === 'officer' ? 'bg-white text-[#0D9488] shadow-2xs' : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            Officer
          </button>
          <button
            type="button"
            onClick={() => handleDemoFill('admin')}
            className={`py-2 rounded-md font-bold transition-all ${
              role === 'admin' ? 'bg-white text-[#0D9488] shadow-2xs' : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@ndmc.gov.in"
              className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0D9488] outline-none text-[#0F172A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0D9488] outline-none text-[#0F172A]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] transition-colors text-sm shadow-xs flex items-center justify-center gap-2"
          >
            <span>Sign In as {role.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Don't have a citizen account?{' '}
          <Link to="/register" className="font-bold text-[#0D9488] hover:underline">
            Register Here
          </Link>
        </div>

      </div>
    </div>
  );
}