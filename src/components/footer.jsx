import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, Globe, Shield, UserCheck, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1220] text-white pt-16 pb-8 border-t-2 border-[#2563EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                <img 
                  src="/logo.png" 
                  alt="NagrikAI Official Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  Nagrik<span className="text-[#2563EB]">AI</span>
                </span>
                <p className="text-[10px] text-slate-400 font-hindi font-semibold">आपकी समस्या, हमारी जिम्मेदारी</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Official New Delhi Municipal Council (NDMC) Smart Citizen Services portal for automated grievance classification and SLA resolution tracking.
            </p>

            <div className="pt-1">
              <a
                href="https://www.ndmc.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs transition-colors shadow-xs"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Official NDMC Portal ↗</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links & Workstation Logins */}
          <div>
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#F59E0B] mb-4">
              Quick Services & Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link to="/citizen/file-complaint" className="hover:text-white hover:underline transition-colors">
                  Report an Issue (समस्या दर्ज करें)
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-white hover:underline transition-colors">
                  Track Complaint Status (स्थिति जांचें)
                </Link>
              </li>
              <li>
                <Link to="/login?role=citizen" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 text-blue-300 font-bold">
                  <User className="w-3.5 h-3.5" /> Citizen Portal Login
                </Link>
              </li>
              <li>
                <Link to="/login?role=officer" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 text-amber-300 font-bold">
                  <UserCheck className="w-3.5 h-3.5" /> Officer Workstation Login
                </Link>
              </li>
              <li>
                <Link to="/login?role=admin" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 text-emerald-300 font-bold">
                  <Shield className="w-3.5 h-3.5" /> Admin Analytics Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Departments */}
          <div>
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#F59E0B] mb-4">
              Key Departments
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link to="/citizen/file-complaint?dept=electricity" className="hover:text-white hover:underline transition-colors">
                  Electricity & Streetlights
                </Link>
              </li>
              <li>
                <Link to="/citizen/file-complaint?dept=civil" className="hover:text-white hover:underline transition-colors">
                  Civil Engineering & Roads
                </Link>
              </li>
              <li>
                <Link to="/citizen/file-complaint?dept=public-health" className="hover:text-white hover:underline transition-colors">
                  Public Health & Sanitation
                </Link>
              </li>
              <li>
                <Link to="/citizen/file-complaint?dept=horticulture" className="hover:text-white hover:underline transition-colors">
                  Horticulture & Parks
                </Link>
              </li>
              <li>
                <Link to="/citizen/file-complaint?dept=fire" className="hover:text-white hover:underline transition-colors">
                  Fire & Public Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Helpline & Headquarters */}
          <div className="space-y-3 text-xs text-slate-300">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#F59E0B] mb-4">
              24/7 Helpline
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span>Palika Kendra, Sansad Marg, New Delhi - 110001</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="font-mono font-bold">Toll Free: 1533 / 011-23362222</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="font-mono">grievance@ndmc.gov.in</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-3">
          <p>© 2026 New Delhi Municipal Council (NDMC). All Rights Reserved.</p>
          <div className="flex items-center gap-4 font-medium">
            <a href="https://www.ndmc.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#F59E0B] font-bold flex items-center gap-1">
              www.ndmc.gov.in <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>NIC Governance Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}