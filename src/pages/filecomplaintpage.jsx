import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DEPARTMENTS } from '../data/departments';
import { classifyComplaintAsync, checkDuplicateComplaints } from '../data/aiResponses';
import { INITIAL_COMPLAINTS } from '../data/mockComplaints';
import { createComplaint } from '../services/complaintStore';
import PriorityBadge from '../components/PriorityBadge';
import DepartmentIcon from '../components/DepartmentIcon';
import { 
  Sparkles, 
  Upload, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  FileText,
  Building2,
  Cpu,
  Globe
} from 'lucide-react';

export default function FileComplaintPage({ currentUser }) {
  const [searchParams] = useSearchParams();
  const initialDeptId = searchParams.get('dept');

  const [currentStep, setCurrentStep] = useState(1);
  const [description, setDescription] = useState('');
  const [wardNumber, setWardNumber] = useState('4');
  const [address, setAddress] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newComplaintId, setNewComplaintId] = useState('');
  const [duplicates, setDuplicates] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialDeptId) {
      const foundDept = DEPARTMENTS.find(d => d.id === initialDeptId);
      if (foundDept) {
        setAiResult({
          departmentId: foundDept.id,
          departmentName: foundDept.name,
          departmentCode: foundDept.code,
          categoryName: foundDept.categories[0]?.name || 'General Query',
          priority: 'medium',
          confidence: 0.95
        });
      }
    }
  }, [initialDeptId]);

  const handleDescriptionChange = async (e) => {
    const text = e.target.value;
    setDescription(text);

    if (text.trim().length > 8) {
      setIsAnalyzing(true);
      const result = await classifyComplaintAsync(text, wardNumber);
      setAiResult(result);
      setIsAnalyzing(false);

      const dupes = checkDuplicateComplaints(text, parseInt(wardNumber), INITIAL_COMPLAINTS);
      setDuplicates(dupes);
    } else if (!initialDeptId) {
      setAiResult(null);
      setDuplicates([]);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const newTicket = createComplaint({
      title: description.slice(0, 80),
      description: description,
      departmentId: aiResult?.departmentId || 'electricity',
      categoryName: aiResult?.categoryName || 'General Query',
      priority: aiResult?.priority || 'medium',
      wardNumber: parseInt(wardNumber) || 4,
      address: address || 'NDMC Municipal Ward Area, New Delhi',
      citizenName: currentUser?.name || 'Rahul Sharma',
      citizenPhone: currentUser?.phone || '+91 98101 49210',
      aiConfidence: aiResult?.confidence || 0.95
    });

    setNewComplaintId(newTicket.id);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-heading font-extrabold text-[#0B1220]">Complaint Filed Successfully</h2>
            <p className="text-xs font-bold text-[#10B981] font-hindi">आपकी शिकायत सफलतापूर्वक दर्ज कर ली गई है</p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Your issue has been logged into the NDMC Smart Routing engine and dispatched to the field engineer.
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm font-extrabold text-[#0B1220]">
            Ticket ID: {newComplaintId}
          </div>

          <div className="text-left text-xs space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-600">
            <div className="flex justify-between">
              <span>Department:</span>
              <span className="font-bold text-[#0B1220]">{aiResult?.departmentName}</span>
            </div>
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="font-semibold text-[#0B1220]">{aiResult?.categoryName}</span>
            </div>
            <div className="flex justify-between">
              <span>SLA Target:</span>
              <span className="font-bold text-rose-700 uppercase">{aiResult?.priority} SLA</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate(`/track?id=${newComplaintId}`)}
              className="py-3.5 rounded-xl font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors text-xs shadow-xs"
            >
              Track Live Ticket →
            </button>
            <button
              onClick={() => navigate('/citizen/dashboard')}
              className="py-3.5 rounded-xl font-extrabold text-[#0B1220] bg-slate-100 hover:bg-slate-200 transition-colors text-xs"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-extrabold uppercase tracking-wider">
            GUIDED CIVIC SUBMISSION • 24/7 AI TRIAGE ACTIVE
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-[#0B1220]">Report an Issue</h1>
          <p className="text-sm text-slate-600">
            Describe the civic problem in natural English, Hindi, or Hinglish. NagrikAI will auto-categorize and dispatch to the right NDMC department.
          </p>
        </div>

        {/* Guided Step Progress Indicator Bar */}
        <div className="grid grid-cols-4 gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs text-xs font-bold">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`py-2 px-3 rounded-lg text-left transition-all ${
              currentStep === 1 ? 'bg-[#2563EB] text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            01. What happened
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`py-2 px-3 rounded-lg text-left transition-all ${
              currentStep === 2 ? 'bg-[#2563EB] text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            02. Location
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className={`py-2 px-3 rounded-lg text-left transition-all ${
              currentStep === 3 ? 'bg-[#2563EB] text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            03. Evidence
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(4)}
            className={`py-2 px-3 rounded-lg text-left transition-all ${
              currentStep === 4 ? 'bg-[#2563EB] text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            04. AI Review
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Multi-Step Form */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            
            {/* Step 1: What happened */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-extrabold text-[#0B1220] uppercase tracking-wider">
                    Step 1: Describe the Problem / समस्या विवरण
                  </label>
                  {isAnalyzing && (
                    <span className="text-[11px] text-[#2563EB] font-bold flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Live Cloud AI Analyzing...
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500">
                  Describe the issue naturally. You can write in English, Hindi, or Hinglish without technical jargon.
                </p>

                <textarea
                  rows={5}
                  required
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="e.g. Khan market gate 2 ke paas transformer sparking ho rahi h aur streetlight 2 din se band hai..."
                  className="w-full p-4 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none leading-relaxed text-[#0B1220]"
                />

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={!description.trim()}
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-xl font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 transition-colors text-xs flex items-center gap-2 shadow-xs"
                  >
                    <span>Next: Select Location →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <label className="block text-xs font-extrabold text-[#0B1220] uppercase tracking-wider">
                  Step 2: Where is the Issue? / स्थान विवरण
                </label>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1220] mb-1">NDMC Ward / वार्ड</label>
                    <select
                      value={wardNumber}
                      onChange={e => setWardNumber(e.target.value)}
                      className="w-full p-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-[#0B1220]"
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
                    <label className="block text-xs font-bold text-[#0B1220] mb-1">Landmark & Address Details</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="e.g. Near Gate 2, Khan Market..."
                      className="w-full p-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-[#0B1220]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 text-xs flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 rounded-xl font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors text-xs shadow-xs"
                  >
                    Next: Add Evidence →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Evidence */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <label className="block text-xs font-extrabold text-[#0B1220] uppercase tracking-wider">
                  Step 3: Upload Photo Evidence (Optional)
                </label>

                <div className="border-2 border-dashed border-slate-300 p-6 rounded-2xl text-center hover:border-[#2563EB] transition-colors cursor-pointer bg-slate-50 space-y-2">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                  <span className="text-xs font-bold text-[#0B1220] block">Drag & Drop photo here or click to browse</span>
                  <span className="text-[11px] text-slate-500 block">Supports JPEG, PNG up to 10MB</span>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 text-xs flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 rounded-xl font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors text-xs shadow-xs"
                  >
                    Next: AI Review & Submit →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: AI Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold text-xs">
                  <Cpu className="w-4 h-4" />
                  <span>Step 4: NagrikAI Understanding Summary</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Problem:</span>
                    <span className="font-bold text-[#0B1220] max-w-[60%] text-right truncate">{description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-semibold text-[#0B1220]">{address || 'Khan Market Ward'} (Ward {wardNumber})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Auto Department:</span>
                    <span className="font-bold text-[#2563EB]">{aiResult?.departmentName || 'Electricity & Streetlights'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Priority SLA:</span>
                    <PriorityBadge priority={aiResult?.priority || 'medium'} />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 text-xs flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-3.5 rounded-xl font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors text-sm shadow-md flex items-center gap-2"
                  >
                    <span>Submit Complaint (समस्या दर्ज करें)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* AI Live Inspection Right Panel */}
          <div className="space-y-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#2563EB]" />
                  <h3 className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#0B1220]">
                    Live Cloud AI Classifier
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Live API
                </span>
              </div>

              {aiResult ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Identified Department</span>
                    <div className="font-extrabold text-[#0B1220] text-sm mt-0.5">
                      {aiResult.departmentName}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Category</span>
                    <span className="font-semibold text-[#0B1220]">{aiResult.categoryName}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Target Priority SLA</span>
                    <div className="mt-1">
                      <PriorityBadge priority={aiResult.priority} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
                    <span className="text-slate-500">Routing Precision:</span>
                    <span className="font-extrabold text-[#2563EB]">{(aiResult.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Describe your problem to see real-time AI classification & SLA assignment...
                </div>
              )}
            </div>

            {duplicates.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Existing Report Linked</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  {duplicates.length} similar issue(s) already logged in Ward {wardNumber}. Your submission will be merged into the existing ticket to accelerate field action.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}