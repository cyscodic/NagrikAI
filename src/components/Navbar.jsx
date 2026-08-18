import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  LogOut, 
  ExternalLink,
  Menu, 
  X,
  UserCheck,
  Shield,
  User,
  ArrowRight
} from 'lucide-react';

export default function Navbar({ currentUser, setCurrentUser }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Subtle Indian Tricolor Accent Strip */}
      <div className="h-1 w-full flex">
        <div className="h-full flex-1 bg-[#FF9933]"></div> {/* Saffron */}
        <div className="h-full flex-1 bg-white"></div>    {/* White */}
        <div className="h-full flex-1 bg-[#138808]"></div> {/* Green */}
      </div>

      <div className={`w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-300 ${
        isScrolled ? 'py-1.5' : 'py-2.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            
            {/* Left: Custom NagrikAI Logo + Branding */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 p-0.5 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#2563EB] transition-colors overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="NagrikAI Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-xl tracking-tight text-[#0B1220]">
                    Nagrik<span className="text-[#2563EB]">AI</span>
                  </span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200 uppercase tracking-wider">
                    NDMC
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold leading-none">Smart Citizen Services • आपकी समस्या, हमारी जिम्मेदारी</p>
              </div>
            </Link>

            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive ? 'bg-white text-[#2563EB] shadow-2xs font-extrabold' : 'text-slate-600 hover:text-[#0B1220]'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/citizen/file-complaint"
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive ? 'bg-white text-[#2563EB] shadow-2xs font-extrabold' : 'text-slate-600 hover:text-[#0B1220]'
                  }`
                }
              >
                Report an Issue
              </NavLink>

              <NavLink
                to="/track"
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive ? 'bg-white text-[#2563EB] shadow-2xs font-extrabold' : 'text-slate-600 hover:text-[#0B1220]'
                  }`
                }
              >
                Track Complaint
              </NavLink>

              <a
                href="/#services"
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-[#0B1220] transition-all"
              >
                Services
              </a>
            </nav>

            {/* Right Action Controls */}
            <div className="hidden md:flex items-center gap-2">
              
              {!currentUser ? (
                <div className="flex items-center gap-1.5 pr-2">
                  <Link
                    to="/login?role=citizen"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0B1220] hover:bg-slate-100 transition-colors flex items-center gap-1"
                  >
                    <User className="w-3.5 h-3.5 text-[#0B1220]" />
                    <span>Citizen</span>
                  </Link>

                  <Link
                    to="/login?role=officer"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#2563EB] hover:bg-blue-50 transition-colors flex items-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Officer</span>
                  </Link>

                  <Link
                    to="/login?role=admin"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0B1220] hover:bg-slate-100 transition-colors flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2 pr-2">
                  <Link
                    to={
                      currentUser.role === 'admin'
                        ? '/admin/dashboard'
                        : currentUser.role === 'officer'
                        ? '/officer/dashboard'
                        : '/citizen/dashboard'
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#0B1220] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Dashboard ({currentUser.role})
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Primary Civic Blue CTA Button */}
              <Link
                to="/citizen/file-complaint"
                className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all flex items-center gap-1.5 shadow-xs hover:shadow-md group"
              >
                <span>Report an Issue</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-[#0B1220] hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-[#0B1220] hover:bg-slate-50"
          >
            Home / मुख्य पृष्ठ
          </Link>
          <Link
            to="/citizen/file-complaint"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-[#0B1220] hover:bg-slate-50"
          >
            Report an Issue / समस्या दर्ज करें
          </Link>
          <Link
            to="/track"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-[#0B1220] hover:bg-slate-50"
          >
            Track Complaint / स्थिति जांचें
          </Link>
          <a
            href="/#services"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-600 hover:bg-slate-50"
          >
            Services / 16 नागरिक विभाग
          </a>
          
          <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
            <Link to="/login?role=citizen" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border rounded-lg font-bold">Citizen</Link>
            <Link to="/login?role=officer" onClick={() => setIsMobileMenuOpen(false)} className="py-2 bg-blue-50 text-[#2563EB] font-bold rounded-lg border border-blue-200">Officer</Link>
            <Link to="/login?role=admin" onClick={() => setIsMobileMenuOpen(false)} className="py-2 bg-[#0B1220] text-white font-bold rounded-lg">Admin</Link>
          </div>
        </div>
      )}
    </header>
  );
}