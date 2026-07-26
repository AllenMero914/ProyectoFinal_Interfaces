// Usa la URL del backend en producción (Render) o localhost en desarrollo
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

function authHeaders() {
  const token = localStorage.getItem('profact_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  get: (path) =>
    fetch(`${API_BASE}${path}`, { headers: authHeaders() }).then(handleResponse),

  post: (path, body) =>
    fetch(`${API_BASE}${path}`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify(body),
    }).then(handleResponse),

  put: (path, body) =>
    fetch(`${API_BASE}${path}`, {
      method: 'PUT', headers: authHeaders(), body: JSON.stringify(body),
    }).then(handleResponse),

  patch: (path, body) =>
    fetch(`${API_BASE}${path}`, {
      method: 'PATCH', headers: authHeaders(), body: body ? JSON.stringify(body) : undefined,
    }).then(handleResponse),

  del: (path) =>
    fetch(`${API_BASE}${path}`, {
      method: 'DELETE', headers: authHeaders(),
    }).then(handleResponse),
};
