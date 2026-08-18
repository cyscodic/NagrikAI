import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_COMPLAINTS } from '../data/mockComplaints';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { DEPARTMENTS } from '../data/departments';
import { formatDateTime, getSLAStatus } from '../data/helpers';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  MessageSquare, 
  Send, 
  FileText,
  AlertCircle
} from 'lucide-react';

export default function ComplaintDetailPage() {
  const { id } = useParams();
  const complaint = INITIAL_COMPLAINTS.find(c => c.id === id) || INITIAL_COMPLAINTS[0];
  
  const [comments, setComments] = useState(complaint.comments || []);
  const [newComment, setNewComment] = useState('');

  const dept = DEPARTMENTS.find(d => d.id === complaint.departmentId) || DEPARTMENTS[0];
  const sla = getSLAStatus(complaint.slaDeadline, complaint.status === 'resolved');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      author: 'Citizen (You)',
      content: newComment,
      isInternal: false,
      timestamp: new Date().toISOString()
    };
    setComments(prev => [...prev, commentObj]);
    setNewComment('');
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <Link to="/citizen/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="font-mono text-sm font-bold text-[#1e3a6e] bg-blue-50 px-3 py-1 rounded border border-blue-200">
                {complaint.id}
              </span>
              <span className="text-xs text-[#94a3b8] ml-3">Filed on {formatDateTime(complaint.filedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <PriorityBadge priority={complaint.priority} />
              <StatusBadge status={complaint.status} />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900">{complaint.title}</h1>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {complaint.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Department</span>
              <span className="font-bold text-slate-800">{complaint.departmentName}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location</span>
              <span className="font-bold text-slate-800">Ward {complaint.wardNumber} ({complaint.wardName})</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Field Officer</span>
              <span className="font-bold text-slate-800">{complaint.assignedOfficer || 'Pending Assignment'}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">SLA Status</span>
              <span className={`font-bold ${sla.color}`}>{sla.label}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">Audit & Resolution Timeline</h3>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200 pt-2">
            {complaint.timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-8">
                <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full bg-[#2563eb] border-2 border-white ring-2 ring-blue-100"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{item.action}</span>
                    <span className="text-[10px] text-slate-400">• {formatDateTime(item.timestamp)}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{item.description}</p>
                  <span className="text-[10px] text-blue-600 font-medium mt-1 block">Actor: {item.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" /> Comments & Officer Notes
          </h3>

          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No notes added yet.</p>
            ) : (
              comments.map((c, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{c.author}</span>
                    <span className="text-[10px] font-normal text-slate-400">{formatDateTime(c.timestamp)}</span>
                  </div>
                  <p className="text-slate-600">{c.content}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Add follow-up note for officer..."
              className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#2563eb] text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}