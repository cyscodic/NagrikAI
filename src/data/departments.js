export const DEPARTMENTS = [
  {
    id: 'electricity',
    name: 'Electricity',
    code: 'ELEC',
    icon: 'Zap',
    color: '#f59e0b',
    description: 'Power supply, streetlights, wiring hazards, and transformer issues',
    sla: { critical: 2, high: 8, medium: 48, low: 168 },
    categories: [
      { id: 'elec-1', name: 'Streetlight Fault', keywords: ['streetlight', 'street light', 'dark', 'light not working', 'lamp'] },
      { id: 'elec-2', name: 'Power Cut / Outage', keywords: ['power cut', 'no electricity', 'outage', 'voltage', 'blackout'] },
      { id: 'elec-3', name: 'Wiring Hazard / Live Wire', keywords: ['live wire', 'sparking', 'exposed wire', 'hanging wire', 'short circuit'] },
      { id: 'elec-4', name: 'Transformer Issue', keywords: ['transformer', 'sparking transformer', 'blast', 'meter fault'] },
    ]
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    code: 'CIVIL',
    icon: 'HardHat',
    color: '#6366f1',
    description: 'Road repair, potholes, footpaths, waterlogging, and public works',
    sla: { critical: 4, high: 24, medium: 120, low: 360 },
    categories: [
      { id: 'civ-1', name: 'Road Damage & Potholes', keywords: ['pothole', 'road broken', 'pavement', 'damaged road', 'cracks'] },
      { id: 'civ-2', name: 'Broken Footpath / Paver Blocks', keywords: ['footpath', 'paver block', 'sidewalk', 'tripping', 'tiles broken'] },
      { id: 'civ-3', name: 'Waterlogging & Drainage', keywords: ['waterlogging', 'flooding', 'water standing', 'monsoon drain'] },
      { id: 'civ-4', name: 'Building / Structural Risk', keywords: ['wall crack', 'building collapse', 'unstable structure', 'debris'] },
    ]
  },
  {
    id: 'public-health',
    name: 'Public Health & Sanitation',
    code: 'PH',
    icon: 'HeartPulse',
    color: '#ef4444',
    description: 'Garbage collection, sewage overflow, pest control, and public hygiene',
    sla: { critical: 4, high: 12, medium: 72, low: 168 },
    categories: [
      { id: 'ph-1', name: 'Garbage Collection & Dump', keywords: ['garbage', 'kachra', 'dump', 'trash', 'dustbin full', 'waste'] },
      { id: 'ph-2', name: 'Sewage Overflow & Leakage', keywords: ['sewage', 'drain overflow', 'sewer', 'ganda paani', 'foul smell'] },
      { id: 'ph-3', name: 'Open Drain Hazard', keywords: ['open drain', 'missing cover', 'manhole open', 'gutter'] },
      { id: 'ph-4', name: 'Mosquitoes & Pest Control', keywords: ['mosquito', 'fogging', 'dengue', 'malaria', 'pest'] },
    ]
  },
  {
    id: 'horticulture',
    name: 'Horticulture',
    code: 'HORT',
    icon: 'Trees',
    color: '#22c55e',
    description: 'Parks, fallen trees, green belts, and tree branch trimming',
    sla: { critical: 4, high: 24, medium: 120, low: 360 },
    categories: [
      { id: 'hort-1', name: 'Fallen Tree / Branch Hazard', keywords: ['fallen tree', 'branch broken', 'blocking road', 'tree fallen'] },
      { id: 'hort-2', name: 'Park Maintenance & Cleanliness', keywords: ['park', 'grass cutting', 'broken swing', 'fountain', 'bench broken'] },
      { id: 'hort-3', name: 'Illegal Tree Cutting / Encroachment', keywords: ['tree cutting', 'green belt', 'unauthorized cutting'] },
    ]
  },
  {
    id: 'fire',
    name: 'Fire Safety',
    code: 'FIRE',
    icon: 'Flame',
    color: '#f97316',
    description: 'Fire hazards, safety violations, gas leaks, and emergency risks',
    sla: { critical: 1, high: 4, medium: 24, low: 72 },
    categories: [
      { id: 'fire-1', name: 'Fire Exit Blocked', keywords: ['fire exit', 'blocked exit', 'staircase blocked', 'safety hazard'] },
      { id: 'fire-2', name: 'Gas Leak Smell', keywords: ['gas leak', 'lpg smell', 'cylinder leak', 'gas odor'] },
      { id: 'fire-3', name: 'Fire Safety Equipment Defect', keywords: ['fire extinguisher', 'hydrant', 'alarm not working'] },
    ]
  },
  {
    id: 'medical',
    name: 'Medical Services',
    code: 'MED',
    icon: 'Stethoscope',
    color: '#06b6d4',
    description: 'NDMC dispensaries, hospitals, ambulance, and medical health centers',
    sla: { critical: 2, high: 8, medium: 72, low: 168 },
    categories: [
      { id: 'med-1', name: 'Dispensary & Facility Issue', keywords: ['dispensary', 'hospital closed', 'doctor absent', 'dirty hospital'] },
      { id: 'med-2', name: 'Medicine Availability', keywords: ['medicine out of stock', 'no medicine', 'pharmacy'] },
      { id: 'med-3', name: 'Ambulance Emergency', keywords: ['ambulance delay', 'no ambulance', 'emergency service'] },
    ]
  },
  {
    id: 'ayush',
    name: 'AYUSH Services',
    code: 'AYUSH',
    icon: 'Leaf',
    color: '#10b981',
    description: 'Ayurveda, Homeopathy, Unani dispensaries, and wellness centers',
    sla: { critical: 4, high: 24, medium: 120, low: 360 },
    categories: [
      { id: 'ayush-1', name: 'Ayush Doctor Absence', keywords: ['ayurvedic doctor', 'homeopathy doctor', 'absent'] },
      { id: 'ayush-2', name: 'Ayush Medicine Supply', keywords: ['ayurvedic medicine', 'herbal medicine stock'] },
    ]
  },
  {
    id: 'enforcement',
    name: 'Enforcement',
    code: 'ENF',
    icon: 'Shield',
    color: '#8b5cf6',
    description: 'Illegal encroachments, unauthorized hawkers, and building violations',
    sla: { critical: 8, high: 24, medium: 120, low: 360 },
    categories: [
      { id: 'enf-1', name: 'Illegal Footpath Encroachment', keywords: ['encroachment', 'footpath blocked', 'illegal shop', 'kabza'] },
      { id: 'enf-2', name: 'Unauthorized Hawking', keywords: ['unauthorized vendor', 'hawker zone', 'rehra'] },
      { id: 'enf-3', name: 'Unauthorized Construction', keywords: ['unauthorized building', 'illegal construction', 'no permit'] },
    ]
  },
  {
    id: 'parking',
    name: 'Parking Management',
    code: 'PARK',
    icon: 'Car',
    color: '#3b82f6',
    description: 'Illegal parking, parking meter faults, overcharging, and valets',
    sla: { critical: 8, high: 24, medium: 72, low: 168 },
    categories: [
      { id: 'park-1', name: 'Illegal / Obstruction Parking', keywords: ['illegal parking', 'wrong parking', 'blocking gate', 'no parking area'] },
      { id: 'park-2', name: 'Parking Meter & Overcharging', keywords: ['parking slip', 'overcharging', 'meter broken', 'extra charge'] },
      { id: 'park-3', name: 'Towing Grievance', keywords: ['wrongly towed', 'towing crane', 'car missing'] },
    ]
  },
  {
    id: 'property-tax',
    name: 'Property Tax',
    code: 'PTAX',
    icon: 'Receipt',
    color: '#a855f7',
    description: 'Tax assessment disputes, billing errors, payment issues, and receipts',
    sla: { critical: 48, high: 48, medium: 168, low: 720 },
    categories: [
      { id: 'ptax-1', name: 'Bill Assessment Dispute', keywords: ['property tax bill', 'wrong assessment', 'overbilled'] },
      { id: 'ptax-2', name: 'Payment Receipt / Portal Issue', keywords: ['receipt not generated', 'payment failed', 'double payment'] },
    ]
  },
  {
    id: 'municipal-housing',
    name: 'Municipal Housing',
    code: 'HOUS',
    icon: 'Home',
    color: '#14b8a6',
    description: 'NDMC staff residential colonies, water supply, lifts, and maintenance',
    sla: { critical: 4, high: 24, medium: 120, low: 360 },
    categories: [
      { id: 'hous-1', name: 'Colony Lift / Elevator Defect', keywords: ['lift broken', 'elevator stuck', 'colony lift'] },
      { id: 'hous-2', name: 'Colony Water Supply / Tank', keywords: ['colony water', 'tank leakage', 'no water supply'] },
    ]
  },
  {
    id: 'transport',
    name: 'Transport & Traffic',
    code: 'TRANS',
    icon: 'Bus',
    color: '#0ea5e9',
    description: 'Bus queue shelters, e-rickshaw stands, and public transport amenities',
    sla: { critical: 4, high: 24, medium: 120, low: 240 },
    categories: [
      { id: 'trans-1', name: 'Bus Shelter Damage', keywords: ['bus stop', 'bus shelter', 'bench missing'] },
      { id: 'trans-2', name: 'Traffic Signage Missing', keywords: ['signboard broken', 'traffic sign missing', 'zebra crossing'] },
    ]
  },
  {
    id: 'security',
    name: 'Security & Surveillance',
    code: 'SEC',
    icon: 'ShieldCheck',
    color: '#64748b',
    description: 'Public CCTV cameras, security guards in parks, and public safety',
    sla: { critical: 1, high: 4, medium: 24, low: 120 },
    categories: [
      { id: 'sec-1', name: 'CCTV Camera Defect', keywords: ['cctv camera', 'cctv not working', 'surveillance camera'] },
      { id: 'sec-2', name: 'Unsafe Public Spot / Guard Absent', keywords: ['unsafe area', 'security guard missing', 'dark spot'] },
    ]
  },
  {
    id: 'education',
    name: 'Education & Schools',
    code: 'EDU',
    icon: 'GraduationCap',
    color: '#e11d48',
    description: 'NDMC schools, classroom infrastructure, playgrounds, and sanitation',
    sla: { critical: 8, high: 48, medium: 168, low: 360 },
    categories: [
      { id: 'edu-1', name: 'School Infrastructure Damage', keywords: ['school building', 'desk broken', 'blackboard'] },
      { id: 'edu-2', name: 'School Toilet & Drinking Water', keywords: ['school toilet', 'school water', 'drinking water'] },
    ]
  },
  {
    id: 'welfare',
    name: 'Social Welfare',
    code: 'WELF',
    icon: 'HandHeart',
    color: '#d946ef',
    description: 'Senior citizen schemes, disability support, pensions, and community halls',
    sla: { critical: 48, high: 48, medium: 168, low: 720 },
    categories: [
      { id: 'welf-1', name: 'Pension / Welfare Scheme Delay', keywords: ['pension delay', 'senior citizen scheme', 'welfare payment'] },
      { id: 'welf-2', name: 'Community Center Booking Issue', keywords: ['baraat ghar', 'community hall', 'booking dispute'] },
    ]
  },
  {
    id: 'estate',
    name: 'Estate (I & II)',
    code: 'EST',
    icon: 'Building',
    color: '#78716c',
    description: 'NDMC commercial property allotments, shop leases, and municipal markets',
    sla: { critical: 48, high: 48, medium: 240, low: 720 },
    categories: [
      { id: 'est-1', name: 'Market Shop Lease / Allotment', keywords: ['shop lease', 'market allotment', 'palika bazaar shop'] },
      { id: 'est-2', name: 'Estate Maintenance', keywords: ['estate building', 'market corridor', 'commercial complex'] },
    ]
  }
];