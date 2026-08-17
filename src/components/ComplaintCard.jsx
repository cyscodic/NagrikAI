import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import DepartmentIcon from './DepartmentIcon';
import { DEPARTMENTS } from '../data/departments';
import { getSLAStatus, timeAgo } from '../data/helpers';
import { MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ComplaintCard({ complaint }) {
  const dept = DEPARTMENTS.find(d => d.id === complaint.departmentId) || DEPARTMENTS[0];
  const sla = getSLAStatus(complaint.slaDeadline, complaint.status === 'resolved');

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 group">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            {complaint.id}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Filed {timeAgo(complaint.filedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <PriorityBadge priority={complaint.priority} />
          <StatusBadge status={complaint.status} />
        </div>
      </div>

      <h3 className="font-semibold text-slate-900 text-base mb-1.5 group-hover:text-[#2563eb] transition-colors line-clamp-1">
        {complaint.title}
      </h3>
      
      <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
        {complaint.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium">
            <span style={{ color: dept.color }}>
              <DepartmentIcon name={dept.icon} className="w-3.5 h-3.5" />
            </span>
            <span>{dept.name}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Ward {complaint.wardNumber}</span>
          </div>
        </div>

        <div className={`px-2.5 py-1 rounded-md text-xs border font-medium flex items-center gap-1 ${sla.bg || 'bg-slate-50 border-slate-200'}`}>
          <Clock className="w-3 h-3 text-slate-500" />
          <span className={sla.color}>{sla.label}</span>
        </div>
      </div>
    </div>
  );
}