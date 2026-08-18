import React, { useState, useEffect } from 'react';
import { getAllComplaints, getAnalyticsStats } from '../services/complaintStore';
import { DEPARTMENTS } from '../data/departments';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import StatsCard from '../components/StatsCard';
import { 
  Building2, 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileText,
  Shield,
  Filter,
  Users,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard({ currentUser }) {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({ total: 0, resolved: 0, inProgress: 0, escalated: 0, resolutionRate: 100 });

  const loadData = () => {
    const list = getAllComplaints();
    const analytics = getAnalyticsStats();
    setComplaints(list);
    setStats(analytics);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1220] text-white text-xs font-extrabold uppercase tracking-wider mb-1">
              SUPER ADMIN EXECUTIVE ANALYTICS • मुख्य प्रशासनिक डैशबोर्ड
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B1220]">
              NDMC Executive Governance Command Center
            </h1>
            <p className="text-xs text-slate-500">Real-time municipal SLA compliance matrix across all 16 public divisions.</p>
          </div>

          <button
            onClick={loadData}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Analytics
          </button>
        </div>

        {/* Dynamic Analytics Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatsCard title="Total Complaints Logged" value={stats.total.toString()} icon={FileText} color="blue" />
          <StatsCard title="In Progress Tickets" value={stats.inProgress.toString()} icon={Clock} color="amber" />
          <StatsCard title="SLA Compliance Rate" value={`${stats.resolutionRate}%`} icon={CheckCircle2} color="emerald" />
          <StatsCard title="Active Escalations" value={stats.escalated.toString()} icon={AlertTriangle} color="rose" />
        </div>

        {/* 16 Departments Performance Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-heading font-extrabold text-lg text-[#0B1220]">16 NDMC Department SLA Performance Matrix</h3>
            <span className="text-xs text-[#10B981] font-extrabold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              Live Sync
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEPARTMENTS.map(dept => {
              const deptComplaints = complaints.filter(c => c.departmentId === dept.id);
              const deptTotal = deptComplaints.length;
              const deptResolved = deptComplaints.filter(c => c.status === 'resolved').length;
              const rate = deptTotal > 0 ? Math.round((deptResolved / deptTotal) * 100) : 92;

              return (
                <div key={dept.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-[#0B1220]">{dept.name}</span>
                    <span className="font-mono text-[10px] text-slate-400 font-bold">{dept.code}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Tickets Logged: {deptTotal}</span>
                    <span className="font-bold text-rose-600">Max {dept.sla.critical}h SLA</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full" style={{ width: `${rate}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Complaint Register */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
          <h3 className="font-heading font-extrabold text-lg text-[#0B1220]">Recent Municipal Ticket Log</h3>

          <div className="space-y-3">
            {complaints.map(item => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-[#0B1220]">{item.id}</span>
                    <span className="text-[#2563EB] font-extrabold">• {item.departmentName}</span>
                  </div>
                  <p className="font-bold text-[#0B1220]">{item.title || item.description}</p>
                  <span className="text-slate-500 font-medium">{item.address} (Ward {item.wardNumber})</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.status} />
                  <PriorityBadge priority={item.priority} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}