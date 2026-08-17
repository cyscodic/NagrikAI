export function formatDate(isoString) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(isoString) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function timeAgo(isoString) {
  if (!isoString) return '';
  const now = new Date();
  const past = new Date(isoString);
  const diffMs = now - past;
  
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays}d ago`;
}

export function getStatusStyle(status) {
  switch (status) {
    case 'filed':
      return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', label: 'Filed' };
    case 'ai-processing':
      return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', label: 'AI Processing' };
    case 'assigned':
      return { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300', label: 'Assigned' };
    case 'in-progress':
      return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300', label: 'In Progress' };
    case 'field-visit':
      return { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-300', label: 'Field Visit' };
    case 'resolved':
      return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300', label: 'Resolved' };
    case 'closed':
      return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', label: 'Closed' };
    case 'escalated':
      return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', label: 'Escalated' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', label: status };
  }
}

export function getPriorityStyle(priority) {
  switch (priority) {
    case 'critical':
      return { bg: 'bg-rose-500', text: 'text-white', badge: 'Critical 🔴', border: 'border-rose-600' };
    case 'high':
      return { bg: 'bg-orange-500', text: 'text-white', badge: 'High 🟠', border: 'border-orange-600' };
    case 'medium':
      return { bg: 'bg-amber-400', text: 'text-slate-900', badge: 'Medium 🟡', border: 'border-amber-500' };
    case 'low':
      return { bg: 'bg-emerald-500', text: 'text-white', badge: 'Low 🟢', border: 'border-emerald-600' };
    default:
      return { bg: 'bg-slate-400', text: 'text-white', badge: priority, border: 'border-slate-500' };
  }
}

export function getSLAStatus(deadlineIso, isResolved) {
  if (isResolved) {
    return { status: 'resolved', label: 'Resolved within SLA', color: 'text-emerald-600' };
  }

  const now = new Date();
  const deadline = new Date(deadlineIso);
  const diffMs = deadline - now;

  if (diffMs <= 0) {
    const overdueMins = Math.abs(Math.floor(diffMs / (1000 * 60)));
    const overdueHours = Math.floor(overdueMins / 60);
    return {
      status: 'breached',
      label: `Breached by ${overdueHours > 0 ? `${overdueHours}h` : `${overdueMins}m`}`,
      color: 'text-red-600 font-bold',
      bg: 'bg-red-50 border-red-200'
    };
  }

  const remainingHours = Math.floor(diffMs / (1000 * 60 * 60));
  const remainingMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (remainingHours < 2) {
    return {
      status: 'urgent',
      label: `${remainingHours}h ${remainingMins}m left`,
      color: 'text-amber-600 font-bold',
      bg: 'bg-amber-50 border-amber-200'
    };
  }

  return {
    status: 'on-track',
    label: `${remainingHours}h remaining`,
    color: 'text-slate-600',
    bg: 'bg-slate-50 border-slate-200'
  };
}