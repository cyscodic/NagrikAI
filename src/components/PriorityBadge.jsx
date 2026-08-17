import React from 'react';
import { AlertCircle, AlertTriangle, ShieldAlert, ArrowDown } from 'lucide-react';

export default function PriorityBadge({ priority }) {
  const getPriorityConfig = (priorityKey) => {
    const key = (priorityKey || '').toLowerCase();

    switch (key) {
      case 'critical':
      case 'emergency':
        return {
          label: 'Critical SLA (2h)',
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-600 animate-ping',
          icon: ShieldAlert
        };
      case 'high':
        return {
          label: 'High SLA (24h)',
          bg: 'bg-amber-50 text-[#D97706] border-amber-300',
          dot: 'bg-[#D97706]',
          icon: AlertTriangle
        };
      case 'medium':
        return {
          label: 'Medium SLA (48h)',
          bg: 'bg-teal-50 text-[#0D9488] border-teal-200',
          dot: 'bg-[#0D9488]',
          icon: AlertCircle
        };
      case 'low':
      default:
        return {
          label: 'Low SLA (72h)',
          bg: 'bg-slate-100 text-slate-600 border-slate-300',
          dot: 'bg-slate-500',
          icon: ArrowDown
        };
    }
  };

  const config = getPriorityConfig(priority);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
}