import React, { useState, useEffect } from 'react';
import { getAllComplaints, updateComplaintStatus } from '../services/complaintStore';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import StatsCard from '../components/StatsCard';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  MapPin,
  FileText,
  UserCheck,
  Send,
  RefreshCw
} from 'lucide-react';

export default function OfficerDashboard({ currentUser }) {
  const [queue, setQueue] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updateNote, setUpdateNote] = useState('');
  const [newStatus, setNewStatus] = useState('in-progress');

  const loadData = () => {
    const complaints = getAllComplaints();
    setQueue(complaints);
    if (complaints.length > 0) {
      setSelectedTicket(prev => prev ? (complaints.find(c => c.id === prev.id) || complaints[0]) : complaints[0]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const updatedTicket = updateComplaintStatus(
      selectedTicket.id, 
      newStatus, 
      updateNote || `Action taken on site by ${currentUser?.name || 'Er. Suresh Kumar'}`,
      currentUser?.name || 'Er. Suresh Kumar (Field Engineer)'
    );

    if (updatedTicket) {
      loadData();
      setUpdateNote('');
    }
  };

  const assignedCount = queue.length;
  const inProgressCount = queue.filter(c => c.status === 'in-progress' || c.status === 'assigned').length;
  const resolvedCount = queue.filter(c => c.status === 'resolved').length;
  const escalatedCount = queue.filter(c => c.status === 'escalated' || c.priority === 'critical').length;

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-extrabold uppercase tracking-wider mb-1">
              ENTERPRISE FIELD OFFICER WORKSTATION • फील्ड इंजीनियर पोर्टल
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B1220]">
              {currentUser?.name || 'Er. Suresh Kumar'} — Ward 4 Operational Queue
            </h1>
            <p className="text-xs text-slate-500">NDMC Electricity & Municipal Services Division • Zone 2</p>
          </div>

          <button
            onClick={loadData}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Live Queue
          </button>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatsCard title="Total Queue" value={assignedCount} icon={FileText} color="blue" />
          <StatsCard title="In Progress" value={inProgressCount} icon={Clock} color="amber" />
          <StatsCard title="Resolved Tickets" value={resolvedCount} icon={CheckCircle2} color="emerald" />
          <StatsCard title="Critical SLA / Risk" value={escalatedCount} icon={AlertTriangle} color="rose" />
        </div>

        {/* Workstation Queue & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Priority Queue List */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-extrabold text-base text-[#0B1220]">Live Priority Queue</h3>
              <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {queue.length} Active Tickets
              </span>
            </div>
            
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {queue.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedTicket(item)}
                  className={`p-4 rounded-xl border text-xs space-y-2 cursor-pointer transition-all ${
                    selectedTicket?.id === item.id 
                      ? 'border-[#2563EB] bg-blue-50/50 ring-1 ring-[#2563EB]' 
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-extrabold text-[#0B1220]">{item.id}</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="font-bold text-[#0B1220] line-clamp-2">{item.title || item.description}</p>
                  <div className="flex justify-between items-center text-slate-500 font-medium">
                    <span>Ward {item.wardNumber}</span>
                    <PriorityBadge priority={item.priority} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Officer Action Log */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            {selectedTicket ? (
              <div className="space-y-6">
                
                <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Ticket Reference</span>
                    <h2 className="text-lg font-mono font-extrabold text-[#0B1220]">{selectedTicket.id}</h2>
                  </div>
                  <StatusBadge status={selectedTicket.status} />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-[#0B1220] uppercase tracking-wider">Citizen Problem Description</span>
                  <p className="text-xs sm:text-sm text-[#0B1220] bg-slate-50 p-4 rounded-xl border border-slate-200 font-semibold leading-relaxed">
                    "{selectedTicket.description || selectedTicket.title}"
                  </p>
                  <div className="text-xs text-slate-500 font-medium">Location: {selectedTicket.address} (Ward {selectedTicket.wardNumber})</div>
                </div>

                {/* Form to update status */}
                <form onSubmit={handleUpdateStatus} className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#0B1220]">
                    Field Officer Action & Status Update Log
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewStatus('in-progress')}
                      className={`py-2.5 rounded-xl text-xs font-extrabold border transition-colors ${
                        newStatus === 'in-progress'
                          ? 'bg-amber-50 text-[#F59E0B] border-[#F59E0B]'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      In Progress (Work On-Site)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewStatus('resolved')}
                      className={`py-2.5 rounded-xl text-xs font-extrabold border transition-colors ${
                        newStatus === 'resolved'
                          ? 'bg-emerald-50 text-[#10B981] border-emerald-300'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      Mark as Resolved
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1220] mb-1">On-Site Inspection Note / Work Proof</label>
                    <textarea
                      rows={3}
                      value={updateNote}
                      onChange={e => setUpdateNote(e.target.value)}
                      placeholder="e.g. Inspected spot on site, replaced faulty transformer wire. Streetlight fully functional..."
                      className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-[#0B1220]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors text-xs shadow-xs"
                  >
                    Save & Update Ticket Log (स्थिति अपडेट करें)
                  </button>
                </form>

              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Select a ticket from the left queue to inspect details...
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}