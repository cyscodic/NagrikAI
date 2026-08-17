const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchAllComplaintsApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/complaints`);
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.warn('Backend REST API unavailable, using local store:', error);
    return null;
  }
}

export async function fetchComplaintByIdApi(idOrPhone) {
  try {
    const res = await fetch(`${API_BASE_URL}/complaints/${idOrPhone}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.warn('Backend REST API lookup unavailable:', error);
    return null;
  }
}

export async function createComplaintApi(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('Backend REST API create failed:', error);
    return null;
  }
}

export async function updateComplaintStatusApi(id, status, note, officerName) {
  try {
    const res = await fetch(`${API_BASE_URL}/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note, officerName })
    });
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('Backend REST API update status failed:', error);
    return null;
  }
}

export async function fetchAnalyticsStatsApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/analytics`);
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('Backend REST API analytics failed:', error);
    return null;
  }
}
