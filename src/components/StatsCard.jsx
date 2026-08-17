import React from 'react';

export default function StatsCard({ title, value, icon: Icon, color = 'teal', trend }) {
  const getColorClasses = () => {
    switch (color) {
      case 'teal':
        return { bg: 'bg-teal-50', text: 'text-[#0D9488]', border: 'border-teal-200' };
      case 'amber':
        return { bg: 'bg-amber-50', text: 'text-[#D97706]', border: 'border-amber-200' };
      case 'rose':
        return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
      case 'emerald':
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
      default:
        return { bg: 'bg-slate-100', text: 'text-[#0F172A]', border: 'border-slate-200' };
    }
  };

  const style = getColorClasses();

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg ${style.bg} ${style.text} border ${style.border}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="text-2xl font-heading font-extrabold text-[#0F172A]">{value}</div>
      {trend && <p className="text-[11px] text-slate-500 font-medium">{trend}</p>}
    </div>
  );
}