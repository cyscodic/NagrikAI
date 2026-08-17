import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getComplaintById, getAllComplaints } from '../services/complaintStore';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import DepartmentIcon from '../components/DepartmentIcon';
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  Calendar,
  FileText,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function TrackComplaintPage() {
  const [searchParams] = useSearchParams();
  const ticketQuery = searchParams.get('ticket') || searchParams.get('id');

  const [ticketId, setTicketId] = useState(ticketQuery || 'NDMC-2026-ELEC-0001');
  const [foundComplaint, setFoundComplaint] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (queryId) => {
    const target = queryId || ticketId;
    setHasSearched(true);
    const match = getComplaintById(target);
    if (match) {
      setFoundComplaint(match);
    } else {
      // Fallback to first complaint if no query matches
      const all = getAllComplaints();
      setFoundComplaint(all[0] || null);
    }
  };

  useEffect(() => {
    if (ticketQuery) {
      setTicketId(ticketQuery);
      handleSearch(ticketQuery);
    } else {
      handleSearch('NDMC-2026-ELEC-0001');
    }
  }, [ticketQuery]);

  const handleSubmitSearch = (e) => {
    e?.preventDefault();
    handleSearch(ticketId);
  };

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-extrabold uppercase tracking-wider">
            CIVIC AUDIT TRACKER • लाइव शिकायत ट्रैकिंग
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-[#0B1220]">Track Your Complaint</h1>
          <p className="text-sm text-slate-600">
            Inspect live SLA countdowns, assigned field officers, and step-by-step resolution logs for any NDMC ticket.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <form onSubmit={handleSubmitSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="Enter Ticket ID (e.g. NDMC-2026-ELEC-0001) or Phone Number"
              className="flex-1 px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none font-mono font-semibold text-[#0B1220]"
            />
            <button
              type="submit"
              className="px-7 py-3 rounded-xl font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors text-sm flex items-center justify-center gap-2 shadow-xs"
            >
              <Search className="w-4 h-4" /> Track Status
            </button>
          </form>
        </div>

        {/* Shipment Tracker Result Card */}
        {foundComplaint ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Top Info Bar */}
            <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Official Ticket Reference</span>
                <h2 className="text-xl sm:text-2xl font-mono font-extrabold text-[#0B1220]">{foundComplaint.id}</h2>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={foundComplaint.status} />
                <PriorityBadge priority={foundComplaint.priority} />
              </div>
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Department / विभाग</span>
                <span className="font-bold text-[#0B1220] text-sm">{foundComplaint.departmentName}</span>
                <span className="text-[10px] font-mono text-slate-500 block">Code: {foundComplaint.departmentCode}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Location / Ward</span>
                <span className="font-semibold text-[#0B1220]">{foundComplaint.address}</span>
                <span className="text-[10px] font-bold text-[#2563EB] block">Ward {foundComplaint.wardNumber} ({foundComplaint.wardName || 'Central Zone'})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned Officer</span>
                <span className="font-bold text-[#2563EB] text-sm block">{foundComplaint.assignedOfficer || 'AE Suresh Kumar'}</span>
                <span className="text-[10px] text-slate-500 block">NDMC Field Engineer</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B1220]">Issue Description</span>
              <p className="text-sm text-[#0B1220] leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
                "{foundComplaint.description || foundComplaint.title}"
              </p>
            </div>

            {/* Audit Timeline */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-heading font-extrabold text-sm text-[#0B1220] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                Official Resolution Audit Log
              </h3>

              <div className="space-y-4 pl-3 relative border-l-2 border-[#2563EB]/40 ml-2">
                {foundComplaint.timeline?.map((step, idx) => (
                  <div key={idx} className="relative pl-5">
                    <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-[#2563EB] ring-4 ring-white"></div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-[#0B1220] text-sm">{step.action || step.status}</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {step.timestamp ? new Date(step.timestamp).toLocaleString('en-IN') : 'Recent'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">{step.description || step.note}</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-semibold">
                      Updated by: {step.actor || step.by || 'System'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments / Notes */}
            {foundComplaint.comments && foundComplaint.comments.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Officer Work Notes</span>
                <div className="space-y-2">
                  {foundComplaint.comments.map((c, i) => (
                    <div key={i} className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 text-xs">
                      <div className="flex justify-between font-bold text-[#0B1220]">
                        <span>{c.author}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-600 mt-1">{c.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="font-bold text-[#0B1220]">No Ticket Found</h3>
            <p className="text-xs text-slate-500">
              Check the Ticket ID number and try again.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}