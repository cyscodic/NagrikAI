import express from 'express';
import cors from 'cors';
import { INITIAL_COMPLAINTS } from './seed.js';

const app = express();
const PORT = process.env.PORT || 5000;
const SISTER_AI_CLOUD_URL = 'https://nagrikai-ahtq.onrender.com';

app.use(cors());
app.use(express.json());

// In-Memory Database Store for complaints
let complaintsDB = [...INITIAL_COMPLAINTS];

// DEPARTMENTS TAXONOMY
const DEPARTMENTS = [
  { id: 'electricity', name: 'Electricity & Streetlights', code: 'ELEC', head: 'Er. Suresh Kumar', criticalSla: 2 },
  { id: 'civil', name: 'Civil Engineering & Roads', code: 'CIVIL', head: 'Rajesh Kumar', criticalSla: 4 },
  { id: 'public-health', name: 'Public Health & Sanitation', code: 'PH', head: 'Dr. V.K. Singh', criticalSla: 4 },
  { id: 'horticulture', name: 'Horticulture & Parks', code: 'HORT', head: 'Suresh Pal', criticalSla: 4 },
  { id: 'fire', name: 'Fire Safety & Hazards', code: 'FIRE', head: 'Chief Officer R.K. Sharma', criticalSla: 1 },
  { id: 'water', name: 'Water Supply & Sewage', code: 'WATER', head: 'Er. N.K. Gupta', criticalSla: 2 }
];

// Helper to generate Ticket ID
function generateTicketId(code = 'GEN') {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `NDMC-${year}-${code.toUpperCase()}-${rand}`;
}

// 0. Root Health-Check Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    service: "NagrikAI REST API Backend Server",
    organization: "New Delhi Municipal Council (NDMC)",
    status: "Healthy & Operational 🚀",
    cloudAiConnected: true,
    cloudAiUrl: SISTER_AI_CLOUD_URL,
    endpoints: {
      allComplaints: "GET /api/complaints",
      singleComplaint: "GET /api/complaints/:id",
      fileComplaint: "POST /api/complaints",
      updateStatus: "PATCH /api/complaints/:id/status",
      analytics: "GET /api/analytics",
      cloudAiClassify: "POST /api/ai/classify",
      cloudAiChat: "POST /api/ai/chat"
    }
  });
});

// Proxy route for Sister's Cloud AI Classifier
app.post('/api/ai/classify', async (req, res) => {
  try {
    const response = await fetch(`${SISTER_AI_CLOUD_URL}/api/ai/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Cloud AI Microservice call failed', error: err.message });
  }
});

// Proxy route for Sister's Cloud AI Chatbot
app.post('/api/ai/chat', async (req, res) => {
  try {
    const response = await fetch(`${SISTER_AI_CLOUD_URL}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Cloud AI Chatbot call failed', error: err.message });
  }
});

// 1. GET /api/complaints - Fetch all tickets (filterable)
app.get('/api/complaints', (req, res) => {
  const { dept, ward, status } = req.query;
  let results = [...complaintsDB];

  if (dept) results = results.filter(c => c.departmentId === dept);
  if (ward) results = results.filter(c => c.wardNumber === parseInt(ward));
  if (status) results = results.filter(c => c.status === status);

  res.json({ success: true, count: results.length, data: results });
});

// 2. GET /api/complaints/:id - Lookup ticket by ID or phone
app.get('/api/complaints/:id', (req, res) => {
  const query = req.params.id.trim().toLowerCase();
  const ticket = complaintsDB.find(
    c => c.id.toLowerCase() === query || 
         (c.citizenPhone && c.citizenPhone.replace(/[\s+-]/g, '').includes(query.replace(/[\s+-]/g, ''))) ||
         c.id.toLowerCase().includes(query)
  );

  if (!ticket) {
    return res.status(404).json({ success: false, message: 'Complaint ticket not found' });
  }

  res.json({ success: true, data: ticket });
});

// 3. POST /api/complaints - Create new complaint ticket
app.post('/api/complaints', (req, res) => {
  const { title, description, departmentId, wardNumber, address, citizenName, citizenPhone, priority } = req.body;

  const dept = DEPARTMENTS.find(d => d.id === departmentId) || DEPARTMENTS[0];
  const ticketId = generateTicketId(dept.code);
  const nowIso = new Date().toISOString();

  const newTicket = {
    id: ticketId,
    title: title || description?.slice(0, 80) || 'Civic Issue Reported',
    description: description || '',
    departmentId: dept.id,
    departmentName: dept.name,
    departmentCode: dept.code,
    wardNumber: parseInt(wardNumber) || 4,
    wardName: `Ward ${wardNumber || 4}`,
    priority: priority || 'medium',
    status: 'filed',
    citizenName: citizenName || 'Citizen User',
    citizenPhone: citizenPhone || '+91 98100 00000',
    assignedOfficer: `${dept.head} (${dept.name})`,
    filedAt: nowIso,
    resolvedAt: null,
    slaDeadline: new Date(Date.now() + (dept.criticalSla || 24) * 3600 * 1000).toISOString(),
    escalationLevel: 0,
    address: address || 'NDMC Municipal Area, New Delhi',
    timeline: [
      { action: 'Filed', description: 'Complaint logged via REST API', actor: 'Citizen', timestamp: nowIso },
      { action: 'AI Auto-Routed', description: `Dispatched to ${dept.name}`, actor: 'NagrikAI Live Cloud Engine', timestamp: nowIso }
    ],
    comments: []
  };

  complaintsDB.unshift(newTicket);
  res.status(201).json({ success: true, message: 'Complaint filed successfully', data: newTicket });
});

// 4. PATCH /api/complaints/:id/status - Update status & add officer verification note
app.patch('/api/complaints/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, note, officerName } = req.body;

  const ticketIndex = complaintsDB.findIndex(c => c.id.toLowerCase() === id.toLowerCase());
  if (ticketIndex === -1) {
    return res.status(404).json({ success: false, message: 'Ticket not found' });
  }

  const nowIso = new Date().toISOString();
  const ticket = { ...complaintsDB[ticketIndex] };

  ticket.status = status || ticket.status;
  if (status === 'resolved') {
    ticket.resolvedAt = nowIso;
  }

  ticket.timeline.push({
    action: status.toUpperCase(),
    description: note || `Status updated to ${status}`,
    actor: officerName || 'Field Officer',
    timestamp: nowIso
  });

  if (note) {
    ticket.comments.push({
      author: officerName || 'Field Officer',
      content: note,
      isInternal: true,
      timestamp: nowIso
    });
  }

  complaintsDB[ticketIndex] = ticket;
  res.json({ success: true, message: 'Status updated successfully', data: ticket });
});

// 5. GET /api/analytics - Executive SLA stats
app.get('/api/analytics', (req, res) => {
  const total = complaintsDB.length;
  const resolved = complaintsDB.filter(c => c.status === 'resolved').length;
  const inProgress = complaintsDB.filter(c => c.status === 'in-progress' || c.status === 'assigned').length;
  const escalated = complaintsDB.filter(c => c.status === 'escalated' || c.priority === 'critical').length;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 100;

  res.json({
    success: true,
    data: {
      total,
      resolved,
      inProgress,
      escalated,
      resolutionRate
    }
  });
});

app.listen(PORT, () => {
  console.log(`NagrikAI REST API Server running on http://localhost:${PORT} [Connected to Cloud AI: ${SISTER_AI_CLOUD_URL}]`);
});
