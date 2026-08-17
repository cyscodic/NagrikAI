import { INITIAL_COMPLAINTS } from '../data/mockComplaints';
import { DEPARTMENTS } from '../data/departments';

const STORAGE_KEY = 'nagrikai_complaints_v1';

// Helper to load complaints from LocalStorage or initialize with defaults
export function getAllComplaints() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS));
      return INITIAL_COMPLAINTS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read complaints from LocalStorage:', error);
    return INITIAL_COMPLAINTS;
  }
}

// Helper to save updated complaints list
function saveComplaints(complaints) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  } catch (error) {
    console.error('Failed to save complaints to LocalStorage:', error);
  }
}

// Fetch a single complaint by Ticket ID or Citizen Phone Number
export function getComplaintById(idOrPhone) {
  const complaints = getAllComplaints();
  if (!idOrPhone) return null;
  
  const query = idOrPhone.trim().toLowerCase();
  
  // Try exact ID match first
  let match = complaints.find(c => c.id.toLowerCase() === query);
  if (match) return match;
  
  // Try phone match
  match = complaints.find(c => c.citizenPhone && c.citizenPhone.replace(/[\s+-]/g, '').includes(query.replace(/[\s+-]/g, '')));
  if (match) return match;

  // Try partial ID match (e.g. "4921" or "0001")
  return complaints.find(c => c.id.toLowerCase().includes(query)) || null;
}

// Generate a new ticket ID based on department code
function generateTicketId(deptCode) {
  const complaints = getAllComplaints();
  const year = new Date().getFullYear();
  const code = (deptCode || 'GEN').toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `NDMC-${year}-${code}-${randomNum}`;
}

// Calculate SLA deadline based on priority (in hours)
function calculateSlaDeadline(priority = 'medium') {
  const now = new Date();
  let hours = 24;
  if (priority === 'critical') hours = 4;
  else if (priority === 'high') hours = 12;
  else if (priority === 'medium') hours = 24;
  else if (priority === 'low') hours = 72;
  
  now.setHours(now.getHours() + hours);
  return now.toISOString();
}

// Create a new complaint ticket
export function createComplaint(formData) {
  const complaints = getAllComplaints();
  
  const dept = DEPARTMENTS.find(d => d.id === formData.departmentId) || DEPARTMENTS[0];
  const ticketId = generateTicketId(dept.code);
  const nowIso = new Date().toISOString();
  const slaDeadline = calculateSlaDeadline(formData.priority || 'medium');

  const newTicket = {
    id: ticketId,
    title: formData.title || 'Civic Complaint Logged',
    description: formData.description || '',
    departmentId: dept.id,
    departmentName: dept.name,
    departmentCode: dept.code,
    categoryId: formData.categoryId || `${dept.code.toLowerCase()}-1`,
    categoryName: formData.categoryName || 'General Issue',
    wardNumber: formData.wardNumber || 4,
    wardName: formData.wardName || 'Ward 4 (Connaught Place & Central)',
    priority: formData.priority || 'medium',
    status: 'filed',
    citizenName: formData.citizenName || 'Citizen User',
    citizenPhone: formData.citizenPhone || '+91 98100 00000',
    assignedOfficer: `Er. ${dept.head} (${dept.name} Division)`,
    filedAt: nowIso,
    resolvedAt: null,
    slaDeadline: slaDeadline,
    escalationLevel: 0,
    aiConfidence: formData.aiConfidence || 0.94,
    address: formData.address || 'NDMC Municipal Area, New Delhi',
    isDuplicate: false,
    duplicateCount: 0,
    timeline: [
      {
        action: 'Filed',
        description: 'Complaint registered by citizen via NagrikAI Portal',
        actor: 'Citizen',
        timestamp: nowIso
      },
      {
        action: 'AI Classified',
        description: `Auto-categorized into ${dept.name} with ${formData.priority || 'medium'} priority`,
        actor: 'NagrikAI Engine',
        timestamp: nowIso
      },
      {
        action: 'Auto-Routed',
        description: `Assigned to ${dept.name} Ward Engineer`,
        actor: 'System Router',
        timestamp: nowIso
      }
    ],
    comments: []
  };

  const updatedList = [newTicket, ...complaints];
  saveComplaints(updatedList);
  return newTicket;
}

// Update status of an existing ticket
export function updateComplaintStatus(id, newStatus, commentText = '', actorName = 'Officer') {
  const complaints = getAllComplaints();
  const index = complaints.findIndex(c => c.id === id);
  if (index === -1) return null;

  const ticket = { ...complaints[index] };
  const nowIso = new Date().toISOString();

  ticket.status = newStatus;
  if (newStatus === 'resolved') {
    ticket.resolvedAt = nowIso;
  }

  // Append to timeline
  ticket.timeline = [
    ...(ticket.timeline || []),
    {
      action: newStatus.toUpperCase().replace('-', ' '),
      description: commentText || `Status updated to ${newStatus} by ${actorName}`,
      actor: actorName,
      timestamp: nowIso
    }
  ];

  // Append to comments if provided
  if (commentText) {
    ticket.comments = [
      ...(ticket.comments || []),
      {
        author: actorName,
        content: commentText,
        isInternal: true,
        timestamp: nowIso
      }
    ];
  }

  complaints[index] = ticket;
  saveComplaints(complaints);
  return ticket;
}

// Compute dynamic executive analytics stats
export function getAnalyticsStats() {
  const complaints = getAllComplaints();
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;
  const inProgress = complaints.filter(c => c.status === 'in-progress' || c.status === 'assigned').length;
  const escalated = complaints.filter(c => c.status === 'escalated' || c.escalationLevel > 0).length;
  const filed = complaints.filter(c => c.status === 'filed').length;

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 100;

  return {
    total,
    resolved,
    inProgress,
    escalated,
    filed,
    resolutionRate
  };
}
