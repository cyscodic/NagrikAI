import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllComplaints } from '../services/complaintStore';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import StatsCard from '../components/StatsCard';
import { 
  PlusCircle, 
  Search, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Filter,
  RefreshCw
} from 'lucide-react';

export default function CitizenDashboard({ currentUser }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [complaints, setComplaints] = useState([]);

  const loadData = () => {
    const list = getAllComplaints();
    setComplaints(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredComplaints = complaints.filter(c => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return c.status === 'in-progress' || c.status === 'assigned' || c.status === 'filed';
    if (activeFilter === 'resolved') return c.status === 'resolved';
    return true;
  });

  const activeCount = complaints.filter(c => c.status !== 'resolved').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Editorial Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-extrabold uppercase tracking-wider mb-1">
              PERSONAL CIVIC COMMAND CENTER • नागरिक पोर्टल
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B1220]">
              Good afternoon, {currentUser?.name || 'Rahul Sharma'}.
            </h1>
            <p className="text-xs text-slate-500">Here is the real-time status of your reported municipal complaints.</p>
          </div>

          <Link
            to="/citizen/file-complaint"
            className="px-6 py-3 rounded-xl text-sm font-extrabold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report an Issue (समस्या दर्ज करें)</span>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatsCard title="Total Complaints" value={complaints.length.toString()} icon={FileText} color="blue" />
          <StatsCard title="Active Requests" value={activeCount.toString()} icon={Clock} color="amber" />
          <StatsCard title="Resolved Issues" value={resolvedCount.toString()} icon={CheckCircle2} color="emerald" />
          <StatsCard title="SLA Protected" value="100%" icon={AlertTriangle} color="teal" />
        </div>

        {/* Complaints List Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="font-heading font-extrabold text-lg text-[#0B1220]">My Reported Complaints</h3>

            {/* Filter Tabs */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                  activeFilter === 'all' ? 'bg-white text-[#2563EB] shadow-2xs font-extrabold' : 'text-slate-600'
                }`}
              >
                All ({complaints.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('pending')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                  activeFilter === 'pending' ? 'bg-white text-[#2563EB] shadow-2xs font-extrabold' : 'text-slate-600'
                }`}
              >
                Active ({activeCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('resolved')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                  activeFilter === 'resolved' ? 'bg-white text-[#2563EB] shadow-2xs font-extrabold' : 'text-slate-600'
                }`}
              >
                Resolved ({resolvedCount})
              </button>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {filteredComplaints.map(item => (
              <div
                key={item.id}
                className="p-4.5 rounded-xl border border-slate-200 hover:border-[#2563EB] bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-xs text-[#0B1220]">{item.id}</span>
                    <span className="text-xs text-[#2563EB] font-extrabold">• {item.departmentName}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#0B1220]">{item.title || item.description}</h4>
                  <div className="text-xs text-slate-500 font-medium">{item.address} (Ward {item.wardNumber})</div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={item.status} />
                  <PriorityBadge priority={item.priority} />
                  <Link
                    to={`/track?id=${item.id}`}
                    className="p-2 text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                    title="View Live Audit Timeline"
                  >
                    Track <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}