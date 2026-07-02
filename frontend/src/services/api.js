/**
 * Centralized API client for Vidyastra AI.
 * 
 * To integrate with your backend:
 * 1. Define 'VITE_API_URL' in your .env configuration (e.g., VITE_API_URL=http://localhost:5000/api)
 * 2. Set 'VITE_USE_MOCK=false' in your .env file.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to handle standard HTTP requests to the backend
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}
const api = {
  // --- AUTHENTICATION ENDPOINTS ---
  login: async (username, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', response.user.username);
      localStorage.setItem('currentUserRole', response.user.role);
      localStorage.setItem('currentUserName', response.user.name);
    }
    return response;
  },

  forgotPassword: async (input) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ input })
    });
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error on server', e);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserRole');
      localStorage.removeItem('currentUserName');
    }
    return { success: true };
  },

  // --- STUDENT DASHBOARD ENDPOINTS ---
  getStudentProfile: async () => {
    return apiRequest('/student/profile');
  },

  getStudentRecentActivity: async () => {
    return apiRequest('/student/activity');
  },

  // --- TEACHER DASHBOARD ENDPOINTS ---
  getTeacherProfile: async () => {
    return apiRequest('/teacher/profile');
  },

  uploadLecture: async (courseCode, title, type, url) => {
    return apiRequest(`/teacher/courses/${courseCode}/lectures`, {
      method: 'POST',
      body: JSON.stringify({ title, type, url })
    });
  },

  getSubmissions: async () => {
    return apiRequest('/teacher/submissions');
  },

  gradeSubmission: async (submissionId, marks, feedback) => {
    return apiRequest(`/teacher/submissions/${submissionId}/grade`, {
      method: 'POST',
      body: JSON.stringify({ marks, feedback })
    });
  },

  createAnnouncement: async (title, content, courseCode) => {
    return apiRequest('/teacher/announcements', {
      method: 'POST',
      body: JSON.stringify({ title, content, courseCode })
    });
  },

  getAnnouncements: async () => {
    return apiRequest('/teacher/announcements');
  },

  // --- ADMIN DASHBOARD ENDPOINTS ---
  getOverviewStats: async () => {
    return apiRequest('/admin/stats');
  },

  getSystemHealth: async () => {
    return apiRequest('/admin/health');
  },

  getUsers: async () => {
    return apiRequest('/admin/users');
  },

  addUser: async (user) => {
    return apiRequest('/admin/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },

  editUser: async (userId, updatedData) => {
    return apiRequest(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData)
    });
  },

  deleteUser: async (userId) => {
    return apiRequest(`/admin/users/${userId}`, {
      method: 'DELETE'
    });
  },

  toggleUserStatus: async (userId, newStatus) => {
    return apiRequest(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus })
    });
  },

  getCourses: async () => {
    return apiRequest('/admin/courses');
  },

  addCourse: async (course) => {
    return apiRequest('/admin/courses', {
      method: 'POST',
      body: JSON.stringify(course)
    });
  },

  getAISettings: async () => {
    return apiRequest('/admin/settings/ai');
  },

  updateAISettings: async (settings) => {
    return apiRequest('/admin/settings/ai', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  },

  testAIConnection: async (provider) => {
    return apiRequest('/admin/settings/ai/test', {
      method: 'POST',
      body: JSON.stringify({ provider })
    });
  },

  getAuditLogs: async () => {
    return apiRequest('/admin/logs');
  },

  // --- CONTENT MODERATION ENDPOINTS ---
  getModerationQueue: async () => {
    return apiRequest('/admin/content-moderation/queue');
  },

  approveResource: async (id) => {
    return apiRequest(`/admin/content-moderation/approve/${id}`, {
      method: 'POST'
    });
  },

  rejectResource: async (id) => {
    return apiRequest(`/admin/content-moderation/reject/${id}`, {
      method: 'POST'
    });
  },

  // --- PLATFORM PERFORMANCE ANALYTICS ENDPOINTS ---
  getDailySessions: async () => {
    return apiRequest('/admin/analytics/sessions');
  },

  getModelRatios: async () => {
    return apiRequest('/admin/analytics/model-ratios');
  },

  // --- AI INTEGRATION / RAG ENDPOINTS ---
  askAI: async (question) => {
    return apiRequest('/ai/ask', {
      method: 'POST',
      body: JSON.stringify({ question })
    });
  },

  getAINotes: async () => {
    return apiRequest('/ai/notes');
  },

  getAIQuiz: async () => {
    return apiRequest('/ai/quiz');
  },

  getAIAssignment: async () => {
    return apiRequest('/ai/assignment');
  },

  getAIFlashcards: async () => {
    return apiRequest('/ai/flashcards');
  },

  processLectureVideo: async (videoPath) => {
    return apiRequest('/ai/process-video', {
      method: 'POST',
      body: JSON.stringify({ video_path: videoPath })
    });
  }
};

export default api;