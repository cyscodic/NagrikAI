import { DEPARTMENTS } from './departments';

const LIVE_AI_BASE_URL = 'https://nagrikai-ahtq.onrender.com';

/**
 * Live Cloud AI Classifier API Call
 * Connects to live microservice at https://nagrikai-ahtq.onrender.com/api/ai/classify
 * Falls back to local taxonomy matcher if offline or loading.
 */
export async function classifyComplaintAsync(text, wardNumber = 4) {
  if (!text || text.trim().length < 5) return null;

  try {
    const response = await fetch(`${LIVE_AI_BASE_URL}/api/ai/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        complaint_text: text,
        ward_number: parseInt(wardNumber) || 4
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && (data.success || data.department_id)) {
        const foundDept = DEPARTMENTS.find(d => d.id === data.department_id) || DEPARTMENTS[0];
        return {
          departmentId: data.department_id || foundDept.id,
          departmentName: data.department_name || foundDept.name,
          departmentCode: data.department_code || foundDept.code,
          categoryId: 'ai-cat-1',
          categoryName: data.category_name || foundDept.categories[0]?.name || 'General Grievance',
          priority: data.priority || 'medium',
          confidence: data.confidence_score || 0.98,
          isAiClassified: true,
          isLiveCloudAi: true,
          parsedKeywords: data.parsed_keywords || []
        };
      }
    }
  } catch (error) {
    console.warn('Live Cloud AI API unavailable, fallback to local NLP engine:', error);
  }

  // Local fallback engine
  return classifyComplaint(text);
}

export function classifyComplaint(text) {
  if (!text || text.trim().length < 5) {
    return null;
  }

  const lowerText = text.toLowerCase();
  
  const criticalKeywords = [
    'live wire', 'sparking', 'fire', 'gas leak', 'explosion', 'electrocution',
    'sewage overflow', 'open drain', 'manhole open', 'building collapse',
    'fallen tree', 'blocking emergency', 'accident risk'
  ];

  const highKeywords = [
    'pothole', 'flooding', 'waterlogging', 'garbage', 'kachra', '3 days',
    'no power', 'outage', 'illegal encroachment', 'dengue', 'mosquito'
  ];

  let detectedPriority = 'medium';
  if (criticalKeywords.some(kw => lowerText.includes(kw))) {
    detectedPriority = 'critical';
  } else if (highKeywords.some(kw => lowerText.includes(kw))) {
    detectedPriority = 'high';
  }

  let bestDept = DEPARTMENTS[1];
  let bestCategory = bestDept.categories[0];
  let maxScore = 0;

  DEPARTMENTS.forEach(dept => {
    dept.categories.forEach(cat => {
      let score = 0;
      cat.keywords.forEach(kw => {
        if (lowerText.includes(kw)) {
          score += 2;
        }
      });
      if (score > maxScore) {
        maxScore = score;
        bestDept = dept;
        bestCategory = cat;
      }
    });
  });

  const confidence = maxScore > 0 ? Math.min(0.96, 0.75 + maxScore * 0.05) : 0.72;

  return {
    departmentId: bestDept.id,
    departmentName: bestDept.name,
    departmentCode: bestDept.code,
    categoryId: bestCategory.id,
    categoryName: bestCategory.name,
    priority: detectedPriority,
    confidence: Math.round(confidence * 100) / 100,
    isAiClassified: true,
    isLiveCloudAi: false
  };
}

/**
 * Live Cloud AI Duplicate Detector API Call
 * Connects to https://nagrikai-ahtq.onrender.com/api/ai/check-duplicate
 */
export async function checkDuplicateComplaintsAsync(text, wardNumber, departmentId = 'electricity') {
  try {
    const response = await fetch(`${LIVE_AI_BASE_URL}/api/ai/check-duplicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        complaint_text: text,
        ward_number: parseInt(wardNumber) || 4,
        department_id: departmentId
      })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn('Live Cloud AI duplicate check error:', error);
  }
  return null;
}

export function checkDuplicateComplaints(text, wardNumber, existingComplaints) {
  if (!text || !existingComplaints) return [];

  const lowerText = text.toLowerCase();
  
  return existingComplaints.filter(c => {
    if (c.wardNumber !== wardNumber) return false;
    
    const words = lowerText.split(/\s+/).filter(w => w.length > 3);
    const existingWords = c.description.toLowerCase().split(/\s+/);
    
    const overlap = words.filter(w => existingWords.includes(w));
    return (overlap.length / words.length) > 0.4;
  });
}

/**
 * Live Cloud AI Chatbot Assistant API Call
 * Connects to https://nagrikai-ahtq.onrender.com/api/ai/chat
 */
export async function getChatbotResponseAsync(userMessage, conversationId = 'session-123') {
  try {
    const response = await fetch(`${LIVE_AI_BASE_URL}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        conversation_id: conversationId
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.reply) {
        return {
          reply: data.reply,
          action: data.intent_detected || 'chat_reply',
          isLiveCloudAi: true
        };
      }
    }
  } catch (error) {
    console.warn('Live Cloud AI chatbot error, fallback to local bot:', error);
  }

  return getChatbotResponse(userMessage);
}

export function getChatbotResponse(userMessage) {
  const lower = userMessage.toLowerCase();

  if (lower.includes('status') || lower.includes('track') || lower.includes('ndmc-2026')) {
    return {
      reply: "You can track your complaint in real-time on our **Track Complaint** page by entering your unique Complaint ID (e.g., NDMC-2026-ELEC-0001). Would you like me to check a specific ID for you?",
      action: 'track_prompt'
    };
  }

  if (lower.includes('parking') || lower.includes('meter')) {
    return {
      reply: "For minor parking issues or broken meters in Palika Bazaar / CP, our automated system recommends using the **NDMC Smart Parking App** to find nearby active meters. If you wish to file a formal complaint, I can pre-fill the Parking Management form for you!",
      action: 'file_parking'
    };
  }

  if (lower.includes('garbage') || lower.includes('kachra') || lower.includes('clean')) {
    return {
      reply: "Public Health sanitation trucks run daily from 7:00 AM to 11:00 AM across all NDMC wards. If waste has not been collected in your area for over 2 days, I can auto-classify this as a High Priority complaint for Public Health.",
      action: 'file_ph'
    };
  }

  if (lower.includes('timing') || lower.includes('office') || lower.includes('contact')) {
    return {
      reply: "NDMC Main Headquarters (Palika Kendra, Sansad Marg) working hours are **9:30 AM to 6:00 PM, Monday to Friday**. Emergency control room operates 24/7 at **011-23362222**.",
      action: 'info'
    };
  }

  return {
    reply: "I am Nagrik AI Assistant. I can auto-detect your complaint department, check SLA deadlines, or guide you through filing a new grievance. How can I assist you today?",
    action: 'general'
  };
}