import React from 'react';
import { 
  FileText, 
  UserCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function StatusBadge({ status }) {
  const getStatusConfig = (statusKey) => {
    const key = (statusKey || '').toLowerCase().replace(/\s+/g, '_');
    
    switch (key) {
      case 'registered':
      case 'submitted':
      case 'open':
        return {
          label: 'Registered',
          bg: 'bg-slate-100 text-[#334155] border-slate-300',
          dot: 'bg-[#334155]',
          icon: FileText
        };
      case 'assigned':
        return {
          label: 'Assigned',
          bg: 'bg-teal-50 text-[#0D9488] border-teal-200',
          dot: 'bg-[#0D9488]',
          icon: UserCheck
        };
      case 'in_progress':
      case 'in progress':
      case 'investigating':
        return {
          label: 'In Progress',
          bg: 'bg-amber-50 text-[#D97706] border-amber-300',
          dot: 'bg-[#D97706] animate-pulse',
          icon: Clock
        };
      case 'escalated':
      case 'breached':
        return {
          label: 'Escalated',
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-600 animate-ping',
          icon: AlertTriangle
        };
      case 'resolved':
      case 'closed':
      case 'completed':
        return {
          label: 'Resolved',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-600',
          icon: CheckCircle2
        };
      default:
        return {
          label: status || 'Registered',
          bg: 'bg-slate-100 text-[#334155] border-slate-300',
          dot: 'bg-[#334155]',
          icon: FileText
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold border ${config.bg} shadow-2xs`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
}