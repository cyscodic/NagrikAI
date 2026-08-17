export const INITIAL_COMPLAINTS = [
  {
    id: 'NDMC-2026-ELEC-0001',
    title: 'Exposed live wire near children park in Lodhi Estate',
    description: 'High voltage electrical wire is hanging loosely from the pole right next to the entrance of Lodhi Estate park. Children play here every evening. Very dangerous, kindly fix urgently before an accident happens.',
    departmentId: 'electricity',
    departmentName: 'Electricity',
    departmentCode: 'ELEC',
    categoryId: 'elec-3',
    categoryName: 'Wiring Hazard / Live Wire',
    wardNumber: 4,
    wardName: 'Lodhi Estate / Khan Market',
    priority: 'critical',
    status: 'assigned',
    citizenName: 'Ramesh Sharma',
    citizenPhone: '+91 98101 23456',
    assignedOfficer: 'Er. Amit Verma (JE Electric)',
    filedAt: '2026-08-08T10:30:00Z',
    resolvedAt: null,
    slaDeadline: '2026-08-08T12:30:00Z',
    escalationLevel: 0,
    aiConfidence: 0.96,
    address: 'Near Gate No. 2, Main Park, Lodhi Estate, New Delhi',
    isDuplicate: false,
    duplicateCount: 3,
    timeline: [
      { action: 'Filed', description: 'Complaint registered by citizen via Nagrik AI Portal', actor: 'Citizen', timestamp: '2026-08-08T10:30:00Z' },
      { action: 'AI Classified', description: 'Auto-categorized into Electricity (Wiring Hazard) with Critical Priority', actor: 'Nagrik AI Engine', timestamp: '2026-08-08T10:30:05Z' },
      { action: 'Assigned', description: 'Assigned to Er. Amit Verma (JE Electric - Ward 4)', actor: 'System Auto-Route', timestamp: '2026-08-08T10:35:00Z' }
    ],
    comments: [
      { author: 'Er. Amit Verma', content: 'Field team dispatched with hydraulic ladder. Wire insulation under process.', isInternal: true, timestamp: '2026-08-08T11:15:00Z' }
    ]
  },
  {
    id: 'NDMC-2026-CIVIL-0002',
    title: 'Deep pothole causing traffic blockage on Ashoka Road',
    description: 'Huge pothole created after heavy rain near Patel Chowk metro station on Ashoka Road. Two scooters slipped yesterday. Needs urgent paver filling.',
    departmentId: 'civil',
    departmentName: 'Civil Engineering',
    departmentCode: 'CIVIL',
    categoryId: 'civ-1',
    categoryName: 'Road Damage & Potholes',
    wardNumber: 2,
    wardName: 'Connaught Place / Janpath',
    priority: 'high',
    status: 'in-progress',
    citizenName: 'Priya Malhotra',
    citizenPhone: '+91 98712 34567',
    assignedOfficer: 'Rajesh Kumar (AE Civil)',
    filedAt: '2026-08-07T14:20:00Z',
    resolvedAt: null,
    slaDeadline: '2026-08-08T14:20:00Z',
    escalationLevel: 0,
    aiConfidence: 0.92,
    address: 'Opposite Bus Stop, Ashoka Road near Patel Chowk, New Delhi',
    isDuplicate: false,
    duplicateCount: 1,
    timeline: [
      { action: 'Filed', description: 'Complaint filed', actor: 'Citizen', timestamp: '2026-08-07T14:20:00Z' },
      { action: 'Assigned', description: 'Assigned to AE Civil Team', actor: 'Dept Officer', timestamp: '2026-08-07T15:00:00Z' },
      { action: 'In Progress', description: 'Cold mix patch work initiated on site', actor: 'Rajesh Kumar', timestamp: '2026-08-08T09:00:00Z' }
    ],
    comments: []
  },
  {
    id: 'NDMC-2026-PH-0003',
    title: 'Overflowing sewage drain near Bengali Market shops',
    description: 'Ganda paani overflow ho raha hai Bengali Market ke shop no 12 ke saamne. Foul smell is making it impossible for shopkeepers and customers.',
    departmentId: 'public-health',
    departmentName: 'Public Health & Sanitation',
    departmentCode: 'PH',
    categoryId: 'ph-2',
    categoryName: 'Sewage Overflow & Leakage',
    wardNumber: 1,
    wardName: 'Bengali Market / Babar Road',
    priority: 'critical',
    status: 'escalated',
    citizenName: 'Sunil Gupta',
    citizenPhone: '+91 99100 88776',
    assignedOfficer: 'Dr. V.K. Singh (Sanitation Inspector)',
    filedAt: '2026-08-07T08:00:00Z',
    resolvedAt: null,
    slaDeadline: '2026-08-07T12:00:00Z',
    escalationLevel: 1,
    aiConfidence: 0.95,
    address: 'Main Market Road, Bengali Market, New Delhi',
    isDuplicate: false,
    duplicateCount: 0,
    timeline: [
      { action: 'Filed', description: 'Complaint filed', actor: 'Citizen', timestamp: '2026-08-07T08:00:00Z' },
      { action: 'SLA Breached', description: 'SLA deadline of 4 hours exceeded. Auto-escalated to Level 1 (Zonal Officer)', actor: 'System SLA Monitor', timestamp: '2026-08-07T12:00:01Z' },
      { action: 'Escalated', description: 'Reassigned to Chief Sanitary Inspector', actor: 'System', timestamp: '2026-08-07T12:05:00Z' }
    ],
    comments: [
      { author: 'System Alert', content: 'SLA Breached by 28 hours. Escalated to Level 1.', isInternal: true, timestamp: '2026-08-07T12:00:01Z' }
    ]
  }
];
