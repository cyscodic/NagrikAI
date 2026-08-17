import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEPARTMENTS } from '../data/departments';
import DepartmentIcon from '../components/DepartmentIcon';
import { 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Building2,
  FileCheck2,
  AlertTriangle,
  Send,
  UserCheck,
  Globe,
  Activity,
  Cpu,
  User,
  Shield,
  Layers,
  ArrowDown,
  Check
} from 'lucide-react';

export default function LandingPage() {
  const [slaCountdown, setSlaCountdown] = useState({ hours: 18, minutes: 42, seconds: 16 });

  // SLA Live Countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSlaCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1220] font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#F8FAFC] civic-radial-glow border-b border-slate-200/80 pt-10 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Civic Label + NDMC Emblem */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-extrabold tracking-wide shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                  SMART CIVIC SERVICES • AI POWERED
                </span>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-2xs">
                  <img src="/ndmc_logo.svg" alt="NDMC Emblem" className="w-4 h-4 object-contain" />
                  <span>New Delhi Municipal Council • NDMC</span>
                </div>
              </div>

              {/* Editorial Main Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[#0B1220] leading-[1.08]">
                  Your City. <br />
                  Your Voice. <br />
                  <span className="text-[#2563EB]">Resolved Smarter.</span>
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-[#10B981] font-hindi tracking-wide pt-1">
                  आपकी शहर। आपकी आवाज़। स्मार्ट समाधान।
                </p>
              </div>

              {/* Supporting Copy (Bilingual) */}
              <div className="space-y-2.5 max-w-2xl">
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  NagrikAI connects citizens with the right NDMC department, intelligently routes complaints, tracks SLA commitments, and keeps every resolution transparent from submission to closure.
                </p>
                <p className="text-sm sm:text-base text-[#0B1220] leading-relaxed font-semibold font-hindi">
                  NagrikAI नागरिकों को सीधे सही NDMC विभाग से जोड़ता है, शिकायत दर्ज करने की प्रक्रिया को स्वचालित बनाता है और हर समाधान की लाइव स्थिति दिखाता है।
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  to="/citizen/file-complaint"
                  className="px-8 py-4 rounded-xl font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all flex items-center gap-3 shadow-md hover:shadow-lg text-sm group"
                >
                  <PlusCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <div className="text-left leading-tight">
                    <div className="font-bold text-sm">Report an Issue</div>
                    <div className="text-[10px] font-medium text-blue-100 font-hindi">समस्या दर्ज करें</div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/track"
                  className="px-7 py-4 rounded-xl font-bold text-[#0B1220] bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center gap-3 shadow-2xs text-sm"
                >
                  <Search className="w-5 h-5 text-slate-500" />
                  <div className="text-left leading-tight">
                    <div className="font-bold text-sm">Track Complaint</div>
                    <div className="text-[10px] font-medium text-slate-500 font-hindi">स्थिति जांचें</div>
                  </div>
                </Link>
              </div>

              {/* Direct Workstation Logins */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold">
                <span>Direct Access:</span>
                <Link to="/login?role=officer" className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#2563EB] hover:bg-blue-100 border border-blue-200 transition-colors font-bold flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" /> Officer Workstation
                </Link>
                <Link to="/login?role=admin" className="px-3 py-1.5 rounded-lg bg-[#0B1220] text-white hover:bg-slate-800 transition-colors font-bold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Admin Analytics
                </Link>
              </div>

            </div>

            {/* Right Column Visual: CIVIC INTELLIGENCE FLOW DIAGRAM */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5 relative">
                
                {/* Visual Header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span>
                    <span className="font-heading font-extrabold text-xs text-[#0B1220] tracking-wider uppercase">
                      CIVIC INTELLIGENCE FLOW
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 font-mono text-[10px] font-bold">
                    LIVE SYSTEM DEMO
                  </span>
                </div>

                {/* Simplified Flow Diagram */}
                <div className="space-y-3.5 relative">
                  
                  {/* Step 1 */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-200 font-extrabold">
                        01
                      </div>
                      <div>
                        <div className="font-extrabold text-[#0B1220] text-xs">1. CITIZEN REPORTS ISSUE</div>
                        <div className="text-[11px] text-slate-500 font-medium font-hindi">नागरिक द्वारा शिकायत दर्ज</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Logged
                    </span>
                  </div>

                  <div className="flex justify-center -my-1">
                    <ArrowDown className="w-4 h-4 text-[#2563EB] animate-bounce" />
                  </div>

                  {/* Step 2 */}
                  <div className="p-3.5 rounded-xl border-2 border-[#2563EB] bg-blue-50/60 flex items-center justify-between gap-3 text-xs shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0 font-extrabold">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-extrabold text-[#2563EB] text-xs flex items-center gap-1.5">
                          2. NAGRIKAI UNDERSTANDS
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        </div>
                        <div className="text-[11px] text-slate-600 font-medium font-hindi">AI द्वारा समस्या और स्थान की पहचान</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-[#2563EB] bg-white px-2 py-0.5 rounded border border-blue-300">
                      96% Match
                    </span>
                  </div>

                  <div className="flex justify-center -my-1">
                    <ArrowDown className="w-4 h-4 text-[#2563EB] animate-bounce" />
                  </div>

                  {/* Step 3 */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center shrink-0 border border-emerald-200 font-extrabold">
                        03
                      </div>
                      <div>
                        <div className="font-extrabold text-[#0B1220] text-xs">3. AUTO-DISPATCHED TO DEPT</div>
                        <div className="text-[11px] text-slate-500 font-medium">Electricity Dept • Khan Market Zone</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#0B1220] bg-white px-2 py-0.5 rounded border border-slate-200">
                      Code: ELEC
                    </span>
                  </div>

                  <div className="flex justify-center -my-1">
                    <ArrowDown className="w-4 h-4 text-[#2563EB] animate-bounce" />
                  </div>

                  {/* Step 4 */}
                  <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#F59E0B] flex items-center justify-center shrink-0 border border-amber-300 font-extrabold">
                        04
                      </div>
                      <div>
                        <div className="font-extrabold text-[#0B1220] text-xs">4. FIELD OFFICER ASSIGNED</div>
                        <div className="text-[11px] text-slate-600 font-medium">AE Suresh Kumar • Khan Market</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      SLA: 18h Remaining
                    </span>
                  </div>

                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500 font-semibold">
                  <span>Transparent Audit Trail</span>
                  <Link to="/track" className="font-bold text-[#2563EB] hover:underline flex items-center gap-1">
                    Inspect Ticket NDMC-2026 →
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST / IMPACT STATS STRIP */}
      <section className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            <div className="pt-4 md:pt-0 space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B1220]">16</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Civic Divisions</div>
              <div className="text-[11px] font-semibold text-[#10B981] font-hindi">16 नागरिक विभाग</div>
            </div>

            <div className="pt-4 md:pt-0 space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2563EB]">AI</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Intelligent Routing</div>
              <div className="text-[11px] font-semibold text-[#2563EB] font-hindi">स्वचालित श्रेणीकरण</div>
            </div>

            <div className="pt-4 md:pt-0 space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B1220]">24/7</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Complaint Tracking</div>
              <div className="text-[11px] font-semibold text-slate-500 font-hindi">24/7 स्थिति जांच</div>
            </div>

            <div className="pt-4 md:pt-0 space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F59E0B]">SLA</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Automated Escalation</div>
              <div className="text-[11px] font-semibold text-[#F59E0B] font-hindi">समयबद्ध निवारण</div>
            </div>

            <div className="pt-4 md:pt-0 space-y-1 col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#10B981]">100%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Transparent Audit</div>
              <div className="text-[11px] font-semibold text-[#10B981] font-hindi">पूर्ण पारदर्शिता</div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. "HOW NAGRIKAI WORKS" */}
      <section className="py-20 sm:py-24 bg-[#F3F7FC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#2563EB]">
              TRANSPARENT WORKFLOW • पारदर्शी प्रक्रिया
            </p>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#0B1220]">
              How NagrikAI Works
            </h2>
            <p className="text-base sm:text-lg font-semibold text-slate-600 font-hindi pt-1">
              NagrikAI कैसे काम करता है — 6 आसान चरण
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2563EB] hover:shadow-md transition-all space-y-4 relative group">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-heading font-extrabold text-[#2563EB]">01</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                  <Send className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[#0B1220]">01 — Raise</h3>
                <p className="text-xs font-bold text-[#2563EB] font-hindi mt-0.5">समस्या दर्ज करें</p>
              </div>
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <p className="leading-relaxed font-medium">Citizen submits a civic issue in natural English, Hindi, or Hinglish with photos.</p>
                <p className="leading-relaxed font-hindi text-[#0B1220] font-semibold">नागरिक अपनी शिकायत आसान भाषा में या फ़ोटो के साथ दर्ज करते हैं।</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2563EB] hover:shadow-md transition-all space-y-4 relative group">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-heading font-extrabold text-[#2563EB]">02</span>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[#0B1220]">02 — Understand</h3>
                <p className="text-xs font-bold text-[#F59E0B] font-hindi mt-0.5">AI द्वारा समझें</p>
              </div>
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <p className="leading-relaxed font-medium">AI identifies issue category, priority SLA limit, and flags duplicates instantly.</p>
                <p className="leading-relaxed font-hindi text-[#0B1220] font-semibold">AI शिकायत की गंभीरता और श्रेणी की तुरंत पहचान करता है।</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2563EB] hover:shadow-md transition-all space-y-4 relative group">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-heading font-extrabold text-[#0B1220]">03</span>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B1220] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[#0B1220]">03 — Route</h3>
                <p className="text-xs font-bold text-[#0B1220] font-hindi mt-0.5">सही विभाग में भेजें</p>
              </div>
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <p className="leading-relaxed font-medium">Automatically dispatches the complaint to the exact NDMC ward engineer.</p>
                <p className="leading-relaxed font-hindi text-[#0B1220] font-semibold">शिकायत स्वतः सम्बंधित NDMC विभाग और क्षेत्र इंजीनियर के पास जाती है।</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2563EB] hover:shadow-md transition-all space-y-4 relative group">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-heading font-extrabold text-[#10B981]">04</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[#0B1220]">04 — Resolve</h3>
                <p className="text-xs font-bold text-[#10B981] font-hindi mt-0.5">मौके पर समाधान</p>
              </div>
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <p className="leading-relaxed font-medium">Assigned field officer conducts on-site work and uploads verification notes.</p>
                <p className="leading-relaxed font-hindi text-[#0B1220] font-semibold">तैनात अधिकारी मौके पर जाकर समस्या का निवारण करते हैं।</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2563EB] hover:shadow-md transition-all space-y-4 relative group">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-heading font-extrabold text-[#F59E0B]">05</span>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[#0B1220]">05 — Escalate</h3>
                <p className="text-xs font-bold text-rose-600 font-hindi mt-0.5">समय पर एस्केलेशन</p>
              </div>
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <p className="leading-relaxed font-medium">Breached SLA timers trigger automatic escalation to senior directors.</p>
                <p className="leading-relaxed font-hindi text-[#0B1220] font-semibold">समय सीमा बीतने पर शिकायत उच्च अधिकारी को खुद चली जाती है।</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2563EB] hover:shadow-md transition-all space-y-4 relative group">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-heading font-extrabold text-[#10B981]">06</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[#0B1220]">06 — Close</h3>
                <p className="text-xs font-bold text-emerald-800 font-hindi mt-0.5">पुष्टि और पूर्णता</p>
              </div>
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <p className="leading-relaxed font-medium">Citizen inspects on-site fix and closes ticket with feedback score.</p>
                <p className="leading-relaxed font-hindi text-[#0B1220] font-semibold">नागरिक समाधान देखकर संतुष्टि दर्ज करते हैं और टिकट बंद होता है।</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. LIVE COMPLAINT LIFECYCLE & SLA COUNTDOWN */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
                REAL-TIME SLA ENGINE
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B1220]">
                Every Complaint Has a Live SLA Target.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                NagrikAI enforces strict time limits for every municipal service. Field officers receive automated countdowns, ensuring rapid resolution before SLAs breach.
              </p>

              <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3 border border-slate-800 shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">SLA REMAINING COUNTDOWN</span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-[#10B981] border border-emerald-500/30 text-[10px] font-extrabold">
                    HEALTHY SLA
                  </span>
                </div>
                <div className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {String(slaCountdown.hours).padStart(2, '0')}:
                  {String(slaCountdown.minutes).padStart(2, '0')}:
                  {String(slaCountdown.seconds).padStart(2, '0')}
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#10B981] h-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>24h Resolution Limit</span>
                  <span>Target: Today 6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-7 shadow-md space-y-5">
                
                <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Sample Ticket ID</span>
                    <span className="font-mono font-extrabold text-[#0B1220] text-lg">NDMC-2026-ELEC-4921</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-[#F59E0B] border border-amber-300 text-xs font-extrabold">
                    In Progress / प्रगति पर
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#2563EB]">Electricity & Streetlights Division</div>
                  <p className="text-sm font-bold text-[#0B1220]">
                    Non-functional street pole light near Gate 2, Khan Market. / खान मार्केट के पास सड़क की लाइट बंद है।
                  </p>
                </div>

                <div className="space-y-4 pt-2 relative border-l-2 border-[#2563EB]/40 ml-3 pl-5 text-xs">
                  
                  <div className="relative">
                    <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#2563EB] ring-4 ring-white"></div>
                    <div className="font-bold text-[#0B1220] text-sm">01 — Submitted</div>
                    <div className="text-slate-500">10:14 AM • Citizen logged issue via portal</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#2563EB] ring-4 ring-white"></div>
                    <div className="font-bold text-[#0B1220] text-sm flex items-center gap-1.5">
                      02 — AI Auto-Routed
                      <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                    </div>
                    <div className="text-slate-500">10:14 AM • Classified to Electricity Dept (Ward 4)</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#F59E0B] ring-4 ring-white"></div>
                    <div className="font-bold text-[#F59E0B] text-sm">03 — Officer Assigned</div>
                    <div className="text-slate-500">10:45 AM • AE Suresh Kumar dispatched to site</div>
                  </div>

                  <div className="relative opacity-60">
                    <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
                    <div className="font-bold text-slate-600 text-sm">04 — Field Inspection & Repair</div>
                    <div className="text-slate-400">Pending on-site verification</div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. NAGRIKAI AI INTELLIGENCE PANEL — PURE SOLID BLACK TEXT */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content - 100% Solid Black Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#2563EB]">
                  SMART AI ASSISTANT • कृत्रिम बुद्धिमत्ता सहायता
                </p>
                <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-black leading-tight" style={{ color: '#000000' }}>
                  AI Understands Your Problem in Seconds.
                </h2>
                <p className="text-xl sm:text-2xl font-bold text-[#10B981] font-hindi">
                  AI कुछ ही सेकेंड में आपकी समस्या समझता है।
                </p>
              </div>

              <p className="text-sm sm:text-base text-black leading-relaxed font-medium" style={{ color: '#000000' }}>
                Write in everyday English, Hindi, or Hinglish. Describe your complaint normally, like <span className="font-bold text-black bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono" style={{ color: '#000000' }}>"Khan market streetlight band h 2 din se"</span>. NagrikAI automatically routes it to the exact NDMC department and engineer.
              </p>

              {/* 4 Citizen-Friendly Benefit Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-300 shadow-2xs space-y-1">
                  <div className="font-extrabold text-black text-sm flex items-center gap-1.5" style={{ color: '#000000' }}>
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                    Write Natural Language
                  </div>
                  <div className="text-black font-hindi font-bold" style={{ color: '#000000' }}>अपनी ही आम भाषा में लिखें</div>
                  <div className="text-slate-700 font-medium pt-0.5" style={{ color: '#334155' }}>No technical terms or complicated form codes needed.</div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-300 shadow-2xs space-y-1">
                  <div className="font-extrabold text-black text-sm flex items-center gap-1.5" style={{ color: '#000000' }}>
                    <Building2 className="w-4 h-4 text-[#2563EB]" />
                    Auto Department Pick
                  </div>
                  <div className="text-black font-hindi font-bold" style={{ color: '#000000' }}>सही विभाग की खुद पहचान</div>
                  <div className="text-slate-700 font-medium pt-0.5" style={{ color: '#334155' }}>Automatically selects Electricity, Water, or Sanitation.</div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-300 shadow-2xs space-y-1">
                  <div className="font-extrabold text-black text-sm flex items-center gap-1.5" style={{ color: '#000000' }}>
                    <Clock className="w-4 h-4 text-[#F59E0B]" />
                    Guaranteed Time Limit
                  </div>
                  <div className="text-black font-hindi font-bold" style={{ color: '#000000' }}>समाधान की निश्चित समय-सीमा</div>
                  <div className="text-slate-700 font-medium pt-0.5" style={{ color: '#334155' }}>Assigns urgent SLA target to responsible officer.</div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-300 shadow-2xs space-y-1">
                  <div className="font-extrabold text-black text-sm flex items-center gap-1.5" style={{ color: '#000000' }}>
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    No Duplicate Confusion
                  </div>
                  <div className="text-black font-hindi font-bold" style={{ color: '#000000' }}>दोहरी शिकायत से बचाव</div>
                  <div className="text-slate-700 font-medium pt-0.5" style={{ color: '#334155' }}>Links duplicate reports in your ward to speed up work.</div>
                </div>
              </div>

            </div>

            {/* Right Side Visual AI Demo Box - Deep Slate Contrast Box */}
            <div className="lg:col-span-6">
              <div className="bg-[#0B1220] text-white border border-slate-800 rounded-2xl p-7 shadow-2xl space-y-5">
                
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-white font-extrabold text-xs tracking-wider uppercase">
                      LIVE AI DEMO • सीधा उदाहरण
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#2563EB]/20 text-[#3B82F6] border border-[#2563EB]/40 text-[10px] font-extrabold">
                    Auto-Processing
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 text-xs font-semibold block">Citizen Complaint Text (नागरिक द्वारा दर्ज शिकायत):</span>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs leading-relaxed font-bold">
                    "Khan Market gate 2 ke paas streetlight 2 din se band h..."
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 text-xs border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-[#10B981] font-semibold">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Issue Identified: Broken Streetlight (सड़क बत्ती खराब)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#10B981] font-semibold">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Department Selected: Electricity & Streetlights (विद्युत विभाग)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#10B981] font-semibold">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Resolution Target: Within 24 Hours (24 घंटे में समाधान)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#10B981] font-semibold">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Officer Dispatched: AE Suresh Kumar (Khan Market Zone)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/50 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase text-blue-300 font-bold tracking-wider block">DISPATCHED TO</span>
                    <span className="font-extrabold text-white text-sm">Electricity & Streetlights Division</span>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#2563EB] text-white font-extrabold text-xs shadow-xs">
                    96% Precision
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CIVIC DEPARTMENT DIRECTORY (16 DIVISIONS) */}
      <section id="services" className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
                CIVIC TAXONOMY • सभी 16 नागरिक विभाग
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B1220]">
                NDMC Municipal Services Directory
              </h2>
              <p className="text-base font-bold text-[#10B981] font-hindi">
                किसी भी विभाग में समस्या दर्ज करने के लिए कार्ड पर क्लिक करें
              </p>
            </div>

            <Link
              to="/citizen/file-complaint"
              className="text-xs font-extrabold text-[#2563EB] hover:underline flex items-center gap-1 shrink-0"
            >
              Report an Issue in any Department →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEPARTMENTS.map(dept => (
              <Link
                key={dept.id}
                to={`/citizen/file-complaint?dept=${dept.id}`}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#2563EB] hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 text-[#0B1220] group-hover:bg-[#2563EB] group-hover:text-white transition-colors flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs">
                      <DepartmentIcon name={dept.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-sm text-[#0B1220] group-hover:text-[#2563EB] transition-colors leading-snug">
                        {dept.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono font-semibold">Code: {dept.code}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {dept.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Critical SLA:</span>
                  <span className="font-bold text-rose-600">{dept.sla.critical}h limit</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 7. WHY NAGRIKAI — CLEAN UNBOXED HEADER & EDITORIAL LAYOUT */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#2563EB]">
              CITIZEN FIRST • नागरिक केंद्रित सेवा
            </p>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#0B1220]">
              Why NagrikAI?
            </h2>
            <p className="text-base sm:text-lg font-semibold text-slate-600 font-hindi pt-1">
              NagrikAI ही क्यों चुनें — त्वरित, पारदर्शी और जिम्मेदार सेवा
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-7 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0B1220]">Faster Resolution</h3>
              <p className="text-xs font-bold text-[#2563EB] font-hindi">त्वरित समाधान</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Direct auto-dispatch routes tickets to field engineers in seconds without paperwork delays.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0B1220]">Transparent Tracking</h3>
              <p className="text-xs font-bold text-[#2563EB] font-hindi">पारदर्शी ट्रैकिंग</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Complete visibility into officer assignments and live status updates at every stage.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0B1220]">Intelligent Routing</h3>
              <p className="text-xs font-bold text-[#F59E0B] font-hindi">स्मार्ट स्वचालित श्रेणीकरण</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                AI categorizes complaints written in casual English, Hindi, or Hinglish without form jargon.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0B1220]">Automated Escalation</h3>
              <p className="text-xs font-bold text-rose-600 font-hindi">स्वचालित एस्केलेशन</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Strict SLA timers automatically flag and escalate pending complaints to higher directors.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0B1220]">Citizen-First Support</h3>
              <p className="text-xs font-bold text-[#2563EB] font-hindi">नागरिक सहायता प्राथमिकता</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Designed for accessibility across mobile and desktop with simple bilingual instructions.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B1220] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0B1220]">Institutional Trust</h3>
              <p className="text-xs font-bold text-[#0B1220] font-hindi">सरकारी निकाय द्वारा संचालित</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Official NDMC public portal integrated with 16 civic departments and municipal ward boundaries.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. RE-ADDED FINAL CTA SECTION WITH UNBOXED BILINGUAL CLEAN CONTRAST */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-t border-slate-200 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#2563EB]">
              SMART GOVERNANCE IN ACTION • स्मार्ट नागरिक सेवा
            </p>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-black leading-tight" style={{ color: '#000000' }}>
              Your complaint shouldn't disappear into a system.
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-[#10B981] font-hindi">
              आपकी शिकायत किसी भी सरकारी फ़ाइल में गुम नहीं होगी।
            </p>
          </div>

          <div className="space-y-1.5 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-black font-semibold" style={{ color: '#000000' }}>
              NagrikAI makes every civic issue visible, accountable, and trackable from submission to resolution.
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-hindi font-medium" style={{ color: '#334155' }}>
              NagrikAI हर शिकायत को दर्ज करने से लेकर समाधान तक पूरी तरह पारदर्शी और ट्रैक करने योग्य बनाता है।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-3">
            <Link
              to="/citizen/file-complaint"
              className="px-8 py-4 rounded-xl font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all flex items-center gap-3 shadow-lg hover:shadow-xl text-sm"
            >
              <span>Report an Issue (समस्या दर्ज करें)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/track"
              className="px-7 py-4 rounded-xl font-bold text-white bg-[#0B1220] hover:bg-slate-800 transition-all text-sm shadow-md"
            >
              <span>Track Complaint (स्थिति जांचें)</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}