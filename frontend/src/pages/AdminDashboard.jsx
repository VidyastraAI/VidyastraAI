import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  BarChart2, 
  Bell, 
  Server, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Plus, 
  Activity, 
  Database,
  Sparkles,
  Terminal,
  RefreshCw,
  HardDrive
} from 'lucide-react';

const AdminDashboard = ({ user, onLogout }) => {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Users Directory State
  const [usersList, setUsersList] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Add User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Student',
    password: '',
    dept: 'CSE',
    roll: ''
  });

  // Course Catalog State
  const [coursesList, setCoursesList] = useState([]);
  const [courseSearch, setCourseSearch] = useState('');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    semester: '4th Semester',
    department: 'Computer Science',
    instructor: '',
    schedule: '',
    enrollments: 0
  });

  // Content Moderation Queue State
  const [moderationQueue, setModerationQueue] = useState([]);

  // Notifications State
  const [notifications, setNotifications] = useState([]);

  // AI Inference & Latency State
  const [aiSettings, setAiSettings] = useState(null);

  // Database-backed Admin States
  const [overviewStats, setOverviewStats] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [dailySessions, setDailySessions] = useState([]);
  const [modelRatios, setModelRatios] = useState(null);

  // System Logs & Backups Console State
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isBackupRunning, setIsBackupRunning] = useState(false);

  // Settings Fields
  const [settingsForm, setSettingsForm] = useState({
    siteTitle: '',
    adminEmail: '',
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPass: '',
    notifyOnNewUsers: false,
    requireEmailVerification: false,
    moderationAlerts: false
  });

  // Scroll to bottom of terminal console
  const terminalEndRef = useRef(null);
  useEffect(() => {
    if (activeTab === 'system' && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, activeTab]);

  // Toast Helper
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ----------------------------------------------------
  // DATA FETCHING & API EFFECTS FOR ADMIN MODULES
  // ----------------------------------------------------

  // 1. Fetch Overview Stats & System Health (Dashboard Module)
  const fetchOverviewStats = async () => {
    try {
      const stats = await api.getOverviewStats();
      setOverviewStats(stats);
    } catch (err) {
      console.error("Failed to fetch dashboard overview metrics:", err);
    }
  };

  const fetchSystemHealth = async () => {
    try {
      const health = await api.getSystemHealth();
      setSystemHealth(health);
    } catch (err) {
      console.error("Failed to fetch system health status:", err);
    }
  };

  useEffect(() => {
    fetchOverviewStats();
    fetchSystemHealth();

    // Poll system health every 15 seconds to keep dashboard alive
    const interval = setInterval(fetchSystemHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // 2. Fetch Course Catalog (Course Management Module)
  const fetchCourses = async () => {
    try {
      const data = await api.getCourses();
      const mapped = data.map(c => ({
        ...c,
        id: c._id || c.id,
        category: c.department || c.semester || '',
        instructor: c.instructor || '',
      }));
      setCoursesList(mapped);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'courses' || activeTab === 'dashboard') {
      fetchCourses();
    }
  }, [activeTab]);

  // Fetch Users (User Management Module)
  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      const roleMap = { student: 'Student', teacher: 'Faculty', admin: 'Admin' };
      const mapped = data.map(u => ({
        ...u,
        id: u._id || u.id,
        role: roleMap[u.role?.toLowerCase()] || u.role || 'Student',
        dept: u.department || u.dept || '',
        roll: u.details?.rollNo || u.roll || '',
        status: u.status || 'Active',
      }));
      setUsersList(mapped);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'users' || activeTab === 'dashboard') {
      fetchUsers();
    }
  }, [activeTab]);

  // 3. Fetch Moderation Queue (Content Moderation Module)
  const fetchModerationQueue = async () => {
    try {
      const queue = await api.getModerationQueue();
      setModerationQueue(queue);
    } catch (err) {
      console.error("Failed to load moderation queue:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'moderation' || activeTab === 'dashboard') {
      fetchModerationQueue();
    }
  }, [activeTab]);

  // 4. Fetch AI Engine Settings (AI Management Module)
  const fetchAISettings = async () => {
    try {
      const settings = await api.getAISettings();
      setAiSettings(settings);
    } catch (err) {
      console.error("Failed to load AI engine settings:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'ai') {
      fetchAISettings();
    }
  }, [activeTab]);

  // 5. Fetch Performance Analytics (Analytics Module)
  const fetchAnalytics = async () => {
    try {
      const [sessions, ratios] = await Promise.all([
        api.getDailySessions(),
        api.getModelRatios()
      ]);
      setDailySessions(sessions);
      setModelRatios(ratios);
    } catch (err) {
      console.error("Failed to load analytics charts metrics:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'analytics') {
      fetchAnalytics();
    }
  }, [activeTab]);

  // System logs — backend module not configured yet
  // When SystemManagement backend is implemented, replace with API polling:
  // useEffect(() => { if (activeTab === 'system') fetchSystemLogs(); }, [activeTab]);

  // Actions handlers
  const handleApproveResource = async (id, title) => {
    try {
      const res = await api.approveResource(id);
      if (res.success) {
        setModerationQueue(prev => prev.filter(item => item._id !== id && item.id !== id));
        triggerToast(`"${title}" approved and published to classroom library!`);
      } else {
        triggerToast("Failed to approve resource", "error");
      }
    } catch (err) {
      console.error(err);
      triggerToast(err.message || "Failed to approve resource", "error");
    }
  };

  const handleRejectResource = async (id, title) => {
    try {
      const res = await api.rejectResource(id);
      if (res.success) {
        setModerationQueue(prev => prev.filter(item => item._id !== id && item.id !== id));
        triggerToast(`"${title}" rejected. Notification sent to instructor.`, 'info');
      } else {
        triggerToast("Failed to reject resource", "error");
      }
    } catch (err) {
      console.error(err);
      triggerToast(err.message || "Failed to reject resource", "error");
    }
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      triggerToast("Please provide user name and email", "info");
      return;
    }

    try {
      const res = await api.addUser({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        password: newUser.password || 'password123',
        dept: newUser.dept,
        roll: newUser.roll
      });
      const roleMap = { student: 'Student', teacher: 'Faculty', admin: 'Admin' };
      const mappedUser = { ...res, id: res._id || res.id, role: roleMap[res.role?.toLowerCase()] || newUser.role, dept: res.department || newUser.dept, roll: res.details?.rollNo || newUser.roll, status: res.status || 'Active' };
      setUsersList(prev => [mappedUser, ...prev]);
      setShowAddUserModal(false);
      triggerToast(`User "${newUser.name}" successfully registered as ${newUser.role}!`);
      // Reset form
      setNewUser({
        name: '',
        email: '',
        role: 'Student',
        password: '',
        dept: 'CSE',
        roll: ''
      });
    } catch (err) {
      triggerToast(err.message || "Failed to add user", "error");
    }
  };

  const handleAddCourseSubmit = async (e) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.name) {
      triggerToast("Course code and name are required.", "info");
      return;
    }

    try {
      const res = await api.addCourse(newCourse);
      if (res.success) {
        const mappedCourse = { ...res.course, id: res.course._id || res.course.id, category: res.course.department || '', instructor: res.course.instructor || '' };
        setCoursesList(prev => [...prev, mappedCourse]);
        setShowAddCourseModal(false);
        triggerToast(`Course "${newCourse.name}" registered successfully!`);
        // Reset form
        setNewCourse({
          code: '',
          name: '',
          semester: '4th Semester',
          department: 'Computer Science',
          instructor: '',
          schedule: '',
          enrollments: 0
        });
      }
    } catch (err) {
      console.error(err);
      triggerToast(err.message || "Failed to create course", "error");
    }
  };

  const handleToggleAISetting = async (field) => {
    if (!aiSettings) return;
    const updated = {
      ...aiSettings,
      [field]: !aiSettings[field]
    };
    try {
      setAiSettings(updated);
      await api.updateAISettings(updated);
      triggerToast(`AI configuration updated successfully!`);
    } catch (err) {
      console.error(err);
      triggerToast("Failed to update AI configuration", "error");
    }
  };

  const triggerManualBackup = () => {
    if (isBackupRunning) return;
    setIsBackupRunning(true);
    triggerToast("System management backend is not configured yet.", "info");
    setIsBackupRunning(false);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    triggerToast("Settings backend is not configured yet.", "info");
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    triggerToast("All notifications marked as read!");
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Calculations for Metrics & Lists
  const totalUsers = usersList.length;
  const facultyCount = usersList.filter(u => u.role === 'Faculty').length;
  const studentCount = usersList.filter(u => u.role === 'Student').length;
  const activeCourses = coursesList.length;
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // SVG Chart path calculation for daily sessions
  const sessionsPointsList = dailySessions.map((m, idx) => {
    const x = 40 + idx * 73;
    const y = 170 - (m.activeSessions / 250) * 150; // Max scale of 250 for 150px height
    return `${x},${y}`;
  });

  const dashboardLinePath = sessionsPointsList.length > 0
    ? `M${sessionsPointsList.join(' L')}`
    : '';

  const dashboardAreaPath = sessionsPointsList.length > 0
    ? `M40,170 L${sessionsPointsList.join(' L')} L478,170 Z`
    : '';

  const geminiPercent = modelRatios?.ratios?.gemini || 0;
  const whisperPercent = modelRatios?.ratios?.whisper || 0;
  const summarizerPercent = modelRatios?.ratios?.summarizer || 0;

  // Filtered lists
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'All' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredCourses = coursesList.filter(c => {
    const search = courseSearch.toLowerCase();
    return (c.name || '').toLowerCase().includes(search) || 
           (c.code || '').toLowerCase().includes(search) ||
           (c.instructor || '').toLowerCase().includes(search);
  });

  return (
    <div className="vidyastra-container">
      {/* Global CSS Embedded Styles */}
      <style>{`
        /* Reset and Base container */
        .vidyastra-container {
          display: flex;
          min-height: 100vh;
          font-family: var(--sans-font);
          background-color: var(--bg);
          color: var(--text);
          position: relative;
          width: 100%;
        }

        /* Sidebar Styling */
        .sidebar {
          width: 260px;
          background: #0F172A;
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 1000;
          transition: transform 0.3s ease;
          border-right: 1px solid rgba(255,255,255,0.08);
          box-shadow: 4px 0 20px rgba(15, 23, 42, 0.15);
        }

        .sidebar-brand {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .brand-logo-circle {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--primary) 0%, #6366F1 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .brand-name {
          font-family: var(--heading-font);
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(to right, #FFFFFF, #E2E8F0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.5px;
        }

        .sidebar-menu {
          flex: 1;
          padding: 24px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          border-radius: 8px;
          color: #94A3B8;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }

        .menu-item:hover {
          color: white;
          background-color: rgba(255,255,255,0.04);
        }

        .menu-item.active {
          color: white;
          background: var(--primary);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
        }

        .sidebar-footer {
          padding: 20px 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          color: #EF4444;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          width: 100%;
          background: transparent;
          border: none;
        }

        .logout-btn:hover {
          background-color: rgba(239, 68, 68, 0.08);
        }

        /* Main Workspace View */
        .main-workspace {
          flex: 1;
          margin-left: 260px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg);
          transition: margin-left 0.3s ease;
          overflow-x: hidden;
        }

        /* Top Header Navigation */
        .workspace-header {
          height: 70px;
          background-color: white;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 900;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 4px;
        }

        .header-title {
          font-family: var(--heading-font);
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .bell-trigger {
          position: relative;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background-color var(--transition-fast);
          border: none;
          background: none;
          color: var(--text-muted);
        }

        .bell-trigger:hover {
          background-color: #F1F5F9;
          color: var(--text);
        }

        .bell-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background-color: var(--danger);
          color: white;
          font-size: 10px;
          font-weight: bold;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        .user-avatar-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .avatar-circle-sm {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary) 0%, #818CF8 100%);
          color: white;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);
        }

        .user-meta-header {
          display: flex;
          flex-direction: column;
        }

        .user-name-txt {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
        }

        .user-role-txt {
          font-size: 11px;
          color: var(--text-muted);
        }

        /* Workspace Content Scrollable Area */
        .workspace-content {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-260px);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-workspace {
            margin-left: 0;
          }
          .mobile-menu-toggle {
            display: block;
          }
          .workspace-header {
            padding: 0 16px;
          }
          .workspace-content {
            padding: 20px 16px;
          }
        }

        /* Styled Premium Cards */
        .gorgeous-card {
          background-color: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          padding: 24px;
          transition: all var(--transition-normal);
        }

        .gorgeous-card:hover {
          box-shadow: var(--shadow-md);
        }

        .gradient-banner {
          background: linear-gradient(135deg, #4F46E5 0%, #312E81 100%);
          border-radius: var(--radius-md);
          padding: 24px 32px;
          color: white;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .gradient-banner-bg-sparks {
          position: absolute;
          right: -10px;
          bottom: -20px;
          opacity: 0.15;
          width: 240px;
          height: auto;
          color: white;
        }

        /* Metric Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .metric-card-styled {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }

        .metric-card-styled:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .metric-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .metric-value {
          font-family: var(--heading-font);
          font-size: 22px;
          font-weight: 700;
          color: var(--text);
        }

        .metric-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Subview Specific layouts */
        .dashboard-main-grid {
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .dashboard-main-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Section Headings */
        .section-header-title {
          font-family: var(--heading-font);
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Custom Float Toast Alert */
        .vidyastra-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background-color: #0F172A;
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          z-index: 2000;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          border-left: 4px solid var(--primary);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .vidyastra-toast.info {
          border-left-color: var(--info);
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Tables & Lists */
        .premium-table-container {
          width: 100%;
          overflow-x: auto;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background-color: white;
        }

        .premium-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .premium-table th {
          background-color: #F8FAFC;
          padding: 16px;
          font-weight: 600;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .premium-table td {
          padding: 16px;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }

        .premium-table tr:last-child td {
          border-bottom: none;
        }

        .badge-role {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .badge-role.admin {
          background-color: #F3E8FF;
          color: #7E22CE;
        }

        .badge-role.faculty {
          background-color: #DBEAFE;
          color: #1D4ED8;
        }

        .badge-role.student {
          background-color: #D1FAE5;
          color: #065F46;
        }

        .badge-status {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .badge-status.active {
          background-color: #ECFDF5;
          color: #10B981;
        }

        .badge-status.inactive {
          background-color: #FEF2F2;
          color: #EF4444;
        }

        .btn-action-small {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          padding: 6px;
          border-radius: 4px;
          transition: all var(--transition-fast);
        }

        .btn-action-small:hover {
          background-color: #F1F5F9;
          color: var(--text);
        }

        .btn-action-danger:hover {
          background-color: #FEF2F2;
          color: var(--danger);
        }

        /* Filter Controls */
        .controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
          max-width: 380px;
        }

        .search-icon-inside {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input-field {
          width: 100%;
          height: 40px;
          border-radius: 8px;
          border: 1px solid var(--border);
          padding: 0 16px 0 40px;
          font-size: 14px;
          outline: none;
          color: var(--text);
          background-color: white;
        }

        .search-input-field:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
        }

        .filter-buttons-row {
          display: flex;
          gap: 8px;
        }

        .btn-filter-pill {
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid var(--border);
          background-color: white;
          color: var(--text-muted);
          transition: all var(--transition-fast);
        }

        .btn-filter-pill:hover {
          background-color: #F8FAFC;
          color: var(--text);
        }

        .btn-filter-pill.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .btn-primary-rect {
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: opacity var(--transition-fast);
        }

        .btn-primary-rect:hover {
          opacity: 0.9;
        }

        /* Modal popup */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .modal-box {
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 480px;
          overflow: hidden;
          animation: scaleUpCustom 0.2s ease-out forwards;
        }

        @keyframes scaleUpCustom {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-family: var(--heading-font);
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
        }

        .modal-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
        }

        .modal-close-btn:hover {
          background-color: #F1F5F9;
        }

        .modal-body {
          padding: 24px;
        }

        .form-group-control {
          margin-bottom: 16px;
        }

        .form-label-styled {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 6px;
        }

        .form-input-text {
          width: 100%;
          height: 40px;
          border-radius: 8px;
          border: 1px solid var(--border);
          padding: 0 12px;
          font-size: 14px;
          outline: none;
          color: var(--text);
        }

        .form-input-text:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
        }

        .form-select-styled {
          width: 100%;
          height: 40px;
          border-radius: 8px;
          border: 1px solid var(--border);
          padding: 0 12px;
          font-size: 14px;
          outline: none;
          color: var(--text);
          background-color: white;
        }

        .form-select-styled:focus {
          border-color: var(--primary);
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background-color: #F8FAFC;
        }

        .btn-cancel {
          background-color: white;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-cancel:hover {
          background-color: #F1F5F9;
        }

        /* System Health States */
        .health-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }

        .health-item-row:last-child {
          border-bottom: none;
        }

        .health-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .health-status-indicator {
          font-size: 12px;
          font-weight: 700;
          color: var(--success);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Token and storage progress */
        .progress-bar-fancy-container {
          background-color: #F1F5F9;
          height: 12px;
          border-radius: 6px;
          overflow: hidden;
          width: 100%;
          margin-top: 8px;
          position: relative;
        }

        .progress-bar-fancy-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary) 0%, #818CF8 100%);
          border-radius: 6px;
          transition: width 0.5s ease-in-out;
        }

        /* Terminal Console */
        .terminal-container {
          background-color: #0F172A;
          border-radius: var(--radius-md);
          border: 1px solid #1E293B;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        .terminal-header {
          background-color: #1E293B;
          padding: 10px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #334155;
        }

        .terminal-header-title {
          font-family: monospace;
          font-size: 13px;
          color: #94A3B8;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .terminal-dot.red { background-color: #EF4444; }
        .terminal-dot.yellow { background-color: #F59E0B; }
        .terminal-dot.green { background-color: #10B981; }

        .terminal-body {
          padding: 16px;
          height: 250px;
          overflow-y: auto;
          font-family: monospace;
          font-size: 13px;
          color: #38BDF8;
          line-height: 1.6;
          text-align: left;
        }

        .terminal-log-line {
          margin-bottom: 4px;
          white-space: pre-wrap;
          word-break: break-all;
        }

        /* Settings grid split */
        .settings-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 24px;
        }

        @media (max-width: 900px) {
          .settings-layout {
            grid-template-columns: 1fr;
          }
        }

        .settings-nav-sidebar {
          background-color: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: fit-content;
        }

        .settings-nav-link {
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .settings-nav-link:hover {
          background-color: #F8FAFC;
          color: var(--text);
        }

        .settings-nav-link.active {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        /* Toggle switches */
        .toggle-switch-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }

        .toggle-switch-row:last-child {
          border-bottom: none;
        }

        .toggle-switch-btn {
          width: 44px;
          height: 22px;
          border-radius: 9999px;
          background-color: #CBD5E1;
          position: relative;
          cursor: pointer;
          transition: background-color var(--transition-fast);
          border: none;
          outline: none;
        }

        .toggle-switch-btn.active {
          background-color: var(--primary);
        }

        .toggle-switch-handle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: white;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform var(--transition-fast);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        .toggle-switch-btn.active .toggle-switch-handle {
          transform: translateX(22px);
        }
      `}</style>

      {/* Persistent Left-Aligned Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-logo-circle">
            <GraduationCap className="text-white h-5 w-5" style={{ color: 'white' }} />
          </div>
          <span className="brand-name">Vidyastra AI</span>
        </div>

        <nav className="sidebar-menu">
          <button className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}>
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          
          <button className={`menu-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => { setActiveTab('users'); setSidebarOpen(false); }}>
            <Users className="h-4 w-4" />
            <span>User Management</span>
          </button>

          <button className={`menu-item ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => { setActiveTab('courses'); setSidebarOpen(false); }}>
            <BookOpen className="h-4 w-4" />
            <span>Course Management</span>
          </button>

          <button className={`menu-item ${activeTab === 'moderation' ? 'active' : ''}`} onClick={() => { setActiveTab('moderation'); setSidebarOpen(false); }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldCheck className="h-4 w-4" />
                <span>Content Moderation</span>
              </span>
              {moderationQueue.length > 0 && (
                <span style={{ backgroundColor: '#EF4444', color: 'white', fontSize: '10px', padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                  {moderationQueue.length}
                </span>
              )}
            </span>
          </button>

          <button className={`menu-item ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => { setActiveTab('ai'); setSidebarOpen(false); }}>
            <Cpu className="h-4 w-4" />
            <span>AI Management</span>
          </button>

          <button className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}>
            <BarChart2 className="h-4 w-4" />
            <span>Analytics</span>
          </button>

          <button className={`menu-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => { setActiveTab('notifications'); setSidebarOpen(false); }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </span>
              {unreadNotificationsCount > 0 && (
                <span style={{ backgroundColor: '#EF4444', color: 'white', fontSize: '10px', padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                  {unreadNotificationsCount}
                </span>
              )}
            </span>
          </button>

          <button className={`menu-item ${activeTab === 'system' ? 'active' : ''}`} onClick={() => { setActiveTab('system'); setSidebarOpen(false); }}>
            <Server className="h-4 w-4" />
            <span>System Management</span>
          </button>

          <button className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}>
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="main-workspace">
        {/* Top Header Navigation */}
        <header className="workspace-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="mobile-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="header-title">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'courses' && 'Course Catalog'}
              {activeTab === 'moderation' && 'Resource Moderation Queue'}
              {activeTab === 'ai' && 'Vidyastra AI Engine Control'}
              {activeTab === 'analytics' && 'Platform Performance Analytics'}
              {activeTab === 'notifications' && 'System Notifications Feed'}
              {activeTab === 'system' && 'Infrastructure Console'}
              {activeTab === 'settings' && 'System Configuration Settings'}
            </h1>
          </div>

          <div className="header-actions">
            <button className="bell-trigger" onClick={() => setActiveTab('notifications')}>
              <Bell className="h-5 w-5" />
              {unreadNotificationsCount > 0 && (
                <span className="bell-badge">{unreadNotificationsCount}</span>
              )}
            </button>

            <div className="user-avatar-profile" onClick={() => setActiveTab('settings')}>
              <div className="avatar-circle-sm">AD</div>
              <div className="user-meta-header">
                <span className="user-name-txt">{user?.name || 'Admin User'}</span>
                <span className="user-role-txt">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Content Scrollable Area */}
        <div className="workspace-content">
          
          {/* A. DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              {/* Premium Gradient Banner */}
              <div className="gradient-banner">
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px 0', fontFamily: 'var(--heading-font)' }}>
                    Welcome back, {user?.name || 'Administrator'}! ✦
                  </h2>
                  <p style={{ margin: 0, opacity: 0.9, fontSize: '14px', maxWidth: '600px', lineHeight: '1.5' }}>
                    Access infrastructure logs, audit course curriculum moderation, provision student/faculty credentials, and track model tokens consumption.
                  </p>
                </div>
                <Sparkles className="gradient-banner-bg-sparks" size={72} />
              </div>

              {/* Metrics Grid */}
              <div className="metrics-grid">
                <div className="metric-card-styled" onClick={() => { setActiveTab('users'); setUserRoleFilter('All'); }}>
                  <div className="metric-icon-box" style={{ backgroundColor: '#EEF2FF', color: 'var(--primary)' }}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="metric-value">{overviewStats ? (overviewStats.totalStudents + overviewStats.totalFaculty) : totalUsers}</div>
                    <div className="metric-label">Total Users</div>
                  </div>
                </div>

                <div className="metric-card-styled" onClick={() => { setActiveTab('users'); setUserRoleFilter('Student'); }}>
                  <div className="metric-icon-box" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="metric-value">{overviewStats ? overviewStats.totalStudents : studentCount}</div>
                    <div className="metric-label">Enrolled Students</div>
                  </div>
                </div>

                <div className="metric-card-styled" onClick={() => { setActiveTab('users'); setUserRoleFilter('Faculty'); }}>
                  <div className="metric-icon-box" style={{ backgroundColor: '#FFF7ED', color: '#F97316' }}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="metric-value">{overviewStats ? overviewStats.totalFaculty : facultyCount}</div>
                    <div className="metric-label">Active Faculty</div>
                  </div>
                </div>

                <div className="metric-card-styled" onClick={() => setActiveTab('courses')}>
                  <div className="metric-icon-box" style={{ backgroundColor: '#F3E8FF', color: '#A855F7' }}>
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="metric-value">{overviewStats ? overviewStats.totalCourses : activeCourses}</div>
                    <div className="metric-label">Active Courses</div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid split (Charts vs System status checklist) */}
              <div className="dashboard-main-grid">
                {/* Column 1: AI Usage stats */}
                <div className="gorgeous-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 className="section-header-title" style={{ margin: 0 }}>
                      <Activity className="h-5 w-5 text-indigo-600" style={{ color: 'var(--primary)' }} />
                      <span>Platform AI Activity Analytics</span>
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>LAST 7 DAYS</span>
                  </div>

                  {/* SVG Line Chart for AI calls */}
                  <div style={{ width: '100%', height: '200px', margin: '10px 0' }}>
                    {dailySessions.length > 0 ? (
                      <svg viewBox="0 0 500 200" width="100%" height="100%" style={{ overflow: 'visible' }}>
                        {/* Grid Lines */}
                        <line x1="40" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
                        <line x1="40" y1="70" x2="480" y2="70" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
                        <line x1="40" y1="120" x2="480" y2="120" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
                        <line x1="40" y1="170" x2="480" y2="170" stroke="#CBD5E1" strokeWidth="1.5" />

                        {/* X-axis labels */}
                        {dailySessions.map((m, idx) => {
                          const x = 40 + idx * 73;
                          const dateObj = new Date(m.date);
                          const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                          return (
                            <text key={idx} x={x} y="188" fill="#64748B" fontSize="10" textAnchor="middle" fontWeight="bold">
                              {dayName}
                            </text>
                          );
                        })}

                        {/* Y-axis labels */}
                        <text x="30" y="24" fill="#64748B" fontSize="10" textAnchor="end" fontWeight="bold">250</text>
                        <text x="30" y="74" fill="#64748B" fontSize="10" textAnchor="end" fontWeight="bold">166</text>
                        <text x="30" y="124" fill="#64748B" fontSize="10" textAnchor="end" fontWeight="bold">83</text>
                        <text x="30" y="174" fill="#64748B" fontSize="10" textAnchor="end" fontWeight="bold">0</text>

                        {/* Gradient definition for fill */}
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Chart Area Fill */}
                        <path
                          d={dashboardAreaPath}
                          fill="url(#chartGradient)"
                        />

                        {/* Line Path */}
                        <path
                          d={dashboardLinePath}
                          fill="none"
                          stroke="#4F46E5"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Data Dots */}
                        {dailySessions.map((m, idx) => {
                          const x = 40 + idx * 73;
                          const y = 170 - (m.activeSessions / 250) * 150;
                          return <circle key={idx} cx={x} cy={y} r="4.5" fill="#4F46E5" stroke="white" strokeWidth="2" />;
                        })}
                      </svg>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                        Loading platform activity analytics...
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px', fontSize: '13px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                      <strong style={{ color: 'var(--text)' }}>AI Summaries & Chat Queries Count</strong>
                    </span>
                  </div>
                </div>

                {/* Column 2: System Health Checklist */}
                <div className="gorgeous-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 className="section-header-title" style={{ margin: 0 }}>
                      <Server className="h-5 w-5 text-emerald-500" style={{ color: '#10B981' }} />
                      <span>System Services Status</span>
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div className="health-item-row">
                      <span className="health-label">Web Application Server</span>
                      <span className="health-status-indicator">
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: systemHealth ? '#10B981' : '#EF4444' }} />
                        {systemHealth ? 'Operational' : 'Unreachable'}
                      </span>
                    </div>

                    <div className="health-item-row">
                      <span className="health-label">MongoDB Database</span>
                      <span className="health-status-indicator">
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: systemHealth?.dbConnection === 'Healthy' ? '#10B981' : '#EF4444' }} />
                        {systemHealth?.dbConnection || 'Offline'}
                      </span>
                    </div>

                    <div className="health-item-row">
                      <span className="health-label">Gemini AI Engine</span>
                      <span className="health-status-indicator">
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: systemHealth?.llmEndpoint === 'Operational' ? '#10B981' : '#EF4444' }} />
                        {systemHealth?.llmEndpoint || 'Offline'}
                      </span>
                    </div>

                    <div className="health-item-row">
                      <span className="health-label">S3 Cloud Storage</span>
                      <span className="health-status-indicator">
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#94A3B8' }} />
                        Not Monitored
                      </span>
                    </div>

                    <div className="health-item-row">
                      <span className="health-label">SMTP Mail Gateway</span>
                      <span className="health-status-indicator">
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#94A3B8' }} />
                        Not Monitored
                      </span>
                    </div>
                  </div>

                  <button 
                    className="btn-primary-rect" 
                    style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}
                    onClick={async () => {
                      triggerToast("Running system health diagnostics...");
                      await fetchSystemHealth();
                      triggerToast("Diagnostics completed. Dashboard refreshed!", "success");
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Run Diagnostics Audit</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* B. USER MANAGEMENT VIEW */}
          {activeTab === 'users' && (
            <div className="animate-fade-in">
              {/* Controls block */}
              <div className="controls-row">
                <div className="search-input-wrapper">
                  <Search className="search-icon-inside h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search users by name or email..." 
                    className="search-input-field"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>

                <div className="filter-buttons-row">
                  {['All', 'Admin', 'Faculty', 'Student'].map((role) => (
                    <button 
                      key={role} 
                      className={`btn-filter-pill ${userRoleFilter === role ? 'active' : ''}`}
                      onClick={() => setUserRoleFilter(role)}
                    >
                      {role}s
                    </button>
                  ))}
                </div>

                <button className="btn-primary-rect" onClick={() => setShowAddUserModal(true)}>
                  <Plus className="h-4 w-4" />
                  <span>Register User</span>
                </button>
              </div>

              {/* Roster Table */}
              <div className="premium-table-container">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>System Role</th>
                      <th>Identifier Info</th>
                      <th>Roster Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                          No profiles matching search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong style={{ color: 'var(--text)' }}>{item.name}</strong>
                          </td>
                          <td style={{ color: '#475569' }}>{item.email}</td>
                          <td>
                            <span className={`badge-role ${item.role.toLowerCase()}`}>
                              {item.role}
                            </span>
                          </td>
                          <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                            {item.role === 'Student' && `Roll: ${item.roll}`}
                            {item.role === 'Faculty' && `Dept: ${item.dept}`}
                            {item.role === 'Admin' && 'System Access'}
                          </td>
                          <td>
                            <span className={`badge-status ${item.status.toLowerCase()}`}>
                              {item.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              className="btn-action-small"
                              title="Edit user details"
                              onClick={() => triggerToast(`Edit details for ${item.name} — coming soon.`, 'info')}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn-action-small btn-action-danger"
                              style={{ color: 'var(--danger)', marginLeft: '8px' }}
                              onClick={async () => {
                                const newStatus = item.status === 'Active' ? 'Inactive' : 'Active';
                                try {
                                  await api.toggleUserStatus(item._id || item.id, newStatus);
                                  setUsersList(prev => prev.map(u => (u._id || u.id) === (item._id || item.id) ? { ...u, status: newStatus } : u));
                                  triggerToast(`${item.name} status updated to ${newStatus}!`);
                                } catch (err) {
                                  console.error(err);
                                  triggerToast(err.message || "Failed to update user status", "error");
                                }
                              }}
                            >
                              {item.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* C. COURSE CATALOG VIEW */}
          {activeTab === 'courses' && (
            <div className="animate-fade-in">
              <div className="controls-row">
                <div className="search-input-wrapper">
                  <Search className="search-icon-inside h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search courses catalog by name, code or faculty..." 
                    className="search-input-field"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                  />
                </div>
                
                <button 
                  className="btn-primary-rect" 
                  onClick={() => setShowAddCourseModal(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Course</span>
                </button>
              </div>

              <div className="premium-table-container">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Curriculum Category</th>
                      <th>Faculty Assigned</th>
                      <th>Students Enrolled</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                          No matching courses configured.
                        </td>
                      </tr>
                    ) : (
                      filteredCourses.map((c) => (
                        <tr key={c.code}>
                          <td><strong style={{ color: 'var(--primary)' }}>{c.code}</strong></td>
                          <td><strong style={{ color: 'var(--text)' }}>{c.name}</strong></td>
                          <td>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#475569' }}>
                              {c.category}
                            </span>
                          </td>
                          <td>{c.instructor}</td>
                          <td>
                            <strong style={{ color: '#0F172A' }}>{c.enrollments}</strong> students
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              className="btn-action-small"
                              onClick={() => triggerToast(`Course management panel for ${c.code} — coming soon.`, 'info')}
                            >
                              Manage Syllabus
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* D. CONTENT MODERATION VIEW */}
          {activeTab === 'moderation' && (
            <div className="animate-fade-in">
              <div className="section-header-title">
                <ShieldCheck className="h-5 w-5 text-indigo-600" />
                <span>Pending Syllabus Material Moderation</span>
              </div>

              <div className="premium-table-container">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Material Resource Name</th>
                      <th>Resource Type</th>
                      <th>Course Target</th>
                      <th>Uploaded By</th>
                      <th>Date Submitted</th>
                      <th>File Size</th>
                      <th style={{ textAlign: 'right' }}>Moderation Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moderationQueue.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '48px' }}>
                          <div style={{ color: '#10B981', fontSize: '24px', marginBottom: '8px' }}>✓</div>
                          <strong style={{ color: 'var(--text)' }}>All materials approved!</strong>
                          <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                            No classroom syllabus materials are waiting in the staging queue.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      moderationQueue.map((item) => (
                        <tr key={item._id || item.id}>
                          <td>
                            <strong style={{ color: 'var(--text)' }}>{item.title}</strong>
                          </td>
                          <td>
                            <span style={{ fontSize: '12px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#F8FAFC', border: '1px solid var(--border)' }}>
                              {item.type}
                            </span>
                          </td>
                          <td><strong style={{ color: 'var(--primary)' }}>{item.course}</strong></td>
                          <td>{item.submittedBy}</td>
                          <td>{item.date ? new Date(item.date).toLocaleDateString() : ''}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{item.size}</td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              className="btn-primary-rect" 
                              style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#10B981' }}
                              onClick={() => handleApproveResource(item._id || item.id, item.title)}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn-primary-rect" 
                              style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#EF4444', marginLeft: '8px' }}
                              onClick={() => handleRejectResource(item._id || item.id, item.title)}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* E. AI MANAGEMENT VIEW */}
          {activeTab === 'ai' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {!aiSettings ? (
                <div className="gorgeous-card" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                  Loading AI Engine settings...
                </div>
              ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="settings-layout">
                {/* Latency & Token utilization panel */}
                <div className="gorgeous-card">
                  <h3 className="section-header-title">
                    <Cpu className="h-5 w-5 text-indigo-600" />
                    <span>Inference Consumption Meter</span>
                  </h3>

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Monthly Token Allocation Usage</span>
                      <span style={{ color: 'var(--text)' }}>
                        {aiSettings.tokensUsed?.toLocaleString() || 0} / {aiSettings.maxTokenLimit?.toLocaleString() || 0} ({aiSettings.maxTokenLimit > 0 ? Math.round((aiSettings.tokensUsed / aiSettings.maxTokenLimit) * 100) : 0}%)
                      </span>
                    </div>

                    <div className="progress-bar-fancy-container">
                      <div className="progress-bar-fancy-fill" style={{ width: `${aiSettings.maxTokenLimit > 0 ? Math.round((aiSettings.tokensUsed / aiSettings.maxTokenLimit) * 100) : 0}%` }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                      <span>Billing cycle resets: {(() => { const now = new Date(); return new Date(now.getFullYear(), now.getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); })()}</span>
                      <span>Estimated charge: ${(aiSettings.tokensUsed ? (aiSettings.tokensUsed / 100000).toFixed(2) : '0.00')} USD</span>
                    </div>
                  </div>

                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
                    Model API Endpoints Latency (24h Average)
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                    <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', textTransform: 'uppercase' }}>Gemini 1.5 Flash</span>
                        <strong style={{ fontSize: '20px', color: 'var(--text)', display: 'block', margin: '4px 0' }}>{aiSettings.avgLatency || '—'} ms</strong>
                        <span style={{ fontSize: '11px', color: aiSettings.geminiStatus === 'Operational' ? '#10B981' : '#EF4444', fontWeight: 'bold' }}>
                          {aiSettings.geminiStatus === 'Operational' ? '✓ Normal' : '✗ Offline'}
                        </span>
                      </div>
                      <button 
                        className="btn-action-small" 
                        style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                        onClick={async () => {
                          triggerToast("Testing connection to Gemini 1.5 Flash...");
                          try {
                            const res = await api.testAIConnection('gemini');
                            if (res.success) {
                              triggerToast(`Gemini: ${res.status || 'Connected'} (${res.latencyMs || 0}ms)`, 'success');
                            } else {
                              triggerToast("Gemini connection test failed", 'error');
                            }
                          } catch (err) {
                            triggerToast("Gemini connection test failed", 'error');
                          }
                        }}
                      >
                        Test Connection
                      </button>
                    </div>

                    <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', textTransform: 'uppercase' }}>Whisper Voice ASR</span>
                        <strong style={{ fontSize: '20px', color: 'var(--text)', display: 'block', margin: '4px 0' }}>{aiSettings.whisperLatency || aiSettings.avgLatency || '—'} ms</strong>
                        <span style={{ fontSize: '11px', color: aiSettings.whisperStatus === 'Operational' ? '#10B981' : '#EF4444', fontWeight: 'bold' }}>
                          {aiSettings.whisperStatus === 'Operational' ? '✓ Operational' : '✗ Offline'}
                        </span>
                      </div>
                      <button 
                        className="btn-action-small" 
                        style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                        onClick={async () => {
                          triggerToast("Testing connection to Whisper ASR...");
                          try {
                            const res = await api.testAIConnection('whisper');
                            if (res.success) {
                              triggerToast(`Whisper: ${res.status || 'Connected'} (${res.latencyMs || 0}ms)`, 'success');
                            } else {
                              triggerToast("Whisper connection test failed", 'error');
                            }
                          } catch (err) {
                            triggerToast("Whisper connection test failed", 'error');
                          }
                        }}
                      >
                        Test Connection
                      </button>
                    </div>

                    <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', textTransform: 'uppercase' }}>Syllabus Summarizer</span>
                        <strong style={{ fontSize: '20px', color: 'var(--text)', display: 'block', margin: '4px 0' }}>{aiSettings.summarizerLatency || aiSettings.avgLatency || '—'} ms</strong>
                        <span style={{ fontSize: '11px', color: aiSettings.summarizerStatus === 'Operational' ? '#10B981' : '#EF4444', fontWeight: 'bold' }}>
                          {aiSettings.summarizerStatus === 'Operational' ? '✓ Excellent' : '✗ Offline'}
                        </span>
                      </div>
                      <button 
                        className="btn-action-small" 
                        style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                        onClick={async () => {
                          triggerToast("Testing connection to Summarizer...");
                          try {
                            const res = await api.testAIConnection('summarizer');
                            if (res.success) {
                              triggerToast(`Summarizer: ${res.status || 'Connected'} (${res.latencyMs || 0}ms)`, 'success');
                            } else {
                              triggerToast("Summarizer connection test failed", 'error');
                            }
                          } catch (err) {
                            triggerToast("Summarizer connection test failed", 'error');
                          }
                        }}
                      >
                        Test Connection
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Tuning Settings */}
                <div className="gorgeous-card">
                  <h3 className="section-header-title">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    <span>AI Model Switching Controls</span>
                  </h3>

                  <div className="toggle-switch-row">
                    <div>
                      <strong style={{ fontSize: '14px', color: 'var(--text)', display: 'block' }}>Fallback to Gemini Pro</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Use Gemini 1.5 Pro if Flash rate limits trigger</span>
                    </div>
                    <button 
                      className={`toggle-switch-btn ${aiSettings.fallbackToPro ? 'active' : ''}`}
                      onClick={() => handleToggleAISetting('fallbackToPro')}
                    >
                      <div className="toggle-switch-handle" />
                    </button>
                  </div>

                  <div className="toggle-switch-row">
                    <div>
                      <strong style={{ fontSize: '14px', color: 'var(--text)', display: 'block' }}>Semantic Query Cache</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cache student queries to minimize API cost</span>
                    </div>
                    <button 
                      className={`toggle-switch-btn ${aiSettings.cacheResponses ? 'active' : ''}`}
                      onClick={() => handleToggleAISetting('cacheResponses')}
                    >
                      <div className="toggle-switch-handle" />
                    </button>
                  </div>

                  <button 
                    className="btn-primary-rect" 
                    style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}
                    onClick={() => {
                      triggerToast("Cache flush is not available — backend not configured.", "info");
                    }}
                  >
                    <span>Flush Cache Memory</span>
                  </button>
                </div>
              </div>
              )}
            </div>
          )}

          {/* F. ANALYTICS VIEW */}
          {activeTab === 'analytics' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="settings-layout">
                {/* Chart 1: Daily Active Users */}
                <div className="gorgeous-card">
                  <h3 className="section-header-title">
                    <Users className="h-5 w-5 text-indigo-600" />
                    <span>Daily Active Sessions</span>
                  </h3>
                  <div style={{ width: '100%', height: '220px', margin: '20px 0' }}>
                    {dailySessions.length > 0 ? (
                      <svg viewBox="0 0 500 220" width="100%" height="100%">
                        <line x1="40" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeWidth="1" />
                        <line x1="40" y1="70" x2="480" y2="70" stroke="#E2E8F0" strokeWidth="1" />
                        <line x1="40" y1="120" x2="480" y2="120" stroke="#E2E8F0" strokeWidth="1" />
                        <line x1="40" y1="170" x2="480" y2="170" stroke="#E2E8F0" strokeWidth="1" />

                        <polyline
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={sessionsPointsList.join(' ')}
                        />
                        {dailySessions.map((m, idx) => {
                          const x = 40 + idx * 73;
                          const y = 170 - (m.activeSessions / 250) * 150;
                          return <circle key={idx} cx={x} cy={y} r="4" fill="#10B981" />;
                        })}
                        {dailySessions.map((m, idx) => {
                          const x = 40 + idx * 73;
                          const dateObj = new Date(m.date);
                          const formattedDate = dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
                          return (
                            <text key={idx} x={x} y="195" fill="#64748B" fontSize="9" textAnchor="middle">
                              {formattedDate}
                            </text>
                          );
                        })}
                      </svg>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                        Loading platform activity analytics...
                      </div>
                    )}
                  </div>
                </div>

                {/* Chart 2: API Calls Count */}
                <div className="gorgeous-card">
                  <h3 className="section-header-title">
                    <Cpu className="h-5 w-5 text-indigo-600" />
                    <span>AI Model API Call Ratios</span>
                  </h3>
                  <div style={{ width: '100%', height: '220px', margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {modelRatios ? (
                      <>
                        <svg viewBox="0 0 200 200" width="160" height="160">
                          {/* Pie segments (Circle Dasharray math) */}
                          {/* Segment 1: Gemini */}
                          <circle cx="100" cy="100" r="70" fill="none" stroke="#4F46E5" strokeWidth="30" strokeDasharray="439.8" strokeDashoffset="0" transform="rotate(-90 100 100)" />
                          {/* Segment 2: Whisper */}
                          <circle cx="100" cy="100" r="70" fill="none" stroke="#10B981" strokeWidth="30" strokeDasharray="439.8" strokeDashoffset={- (geminiPercent / 100) * 439.8} transform="rotate(-90 100 100)" />
                          {/* Segment 3: Summarizer */}
                          <circle cx="100" cy="100" r="70" fill="none" stroke="#F59E0B" strokeWidth="30" strokeDasharray="439.8" strokeDashoffset={- ((geminiPercent + whisperPercent) / 100) * 439.8} transform="rotate(-90 100 100)" />
                        </svg>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginLeft: '24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4F46E5' }} />
                            <span>Gemini Flash ({geminiPercent}%)</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                            <span>Whisper ASR ({whisperPercent}%)</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                            <span>Summarizer ({summarizerPercent}%)</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div style={{ color: 'var(--text-muted)' }}>
                        Loading model API ratio metrics...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* G. NOTIFICATIONS VIEW */}
          {activeTab === 'notifications' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div className="section-header-title" style={{ margin: 0 }}>
                  <Bell className="h-5 w-5 text-indigo-600" />
                  <span>Admin Alerts & Event Feed</span>
                </div>
                {unreadNotificationsCount > 0 && (
                  <button className="btn-primary-rect" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={markAllNotificationsAsRead}>
                    Mark All As Read
                  </button>
                )}
              </div>

              <div className="gorgeous-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No alerts currently logged in feed.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '16px', 
                        borderRadius: '8px', 
                        border: '1px solid var(--border)',
                        backgroundColor: n.read ? 'white' : 'var(--primary-light)',
                        borderLeft: n.read ? '1px solid var(--border)' : '4px solid var(--primary)'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: n.read ? '500' : '700', color: 'var(--text)' }}>
                          {n.text}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.time}</span>
                      </div>

                      <button 
                        className="btn-action-small btn-action-danger"
                        style={{ color: 'var(--danger)' }}
                        onClick={() => deleteNotification(n.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* H. SYSTEM MANAGEMENT VIEW */}
          {activeTab === 'system' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Database and terminal stdout grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="settings-layout">
                {/* Console card */}
                <div className="terminal-container">
                  <div className="terminal-header">
                    <span className="terminal-header-title">
                      <Terminal className="h-4 w-4" />
                      <span>vidyastra-server-logs-stdout</span>
                    </span>
                    <div className="terminal-dots">
                      <span className="terminal-dot red" />
                      <span className="terminal-dot yellow" />
                      <span className="terminal-dot green" />
                    </div>
                  </div>

                  <div className="terminal-body">
                    {terminalLogs.map((log, index) => (
                      <div key={index} className="terminal-log-line">{log}</div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>
                </div>

                {/* Storage and backup trigger */}
                <div className="gorgeous-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 className="section-header-title" style={{ marginBottom: '16px' }}>
                      <HardDrive className="h-5 w-5 text-indigo-600" />
                      <span>Storage Allocation Ratios</span>
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Disk Usage</span>
                      <span style={{ color: 'var(--text)' }}>— / — (N/A)</span>
                    </div>

                    <div className="progress-bar-fancy-container" style={{ margin: '8px 0 16px 0' }}>
                      <div className="progress-bar-fancy-fill" style={{ width: '0%', background: 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Video Archives:</span>
                        <strong style={{ color: 'var(--text)' }}>N/A</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Database Snapshots:</span>
                        <strong style={{ color: 'var(--text)' }}>N/A</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Logs & Diagnostics:</span>
                        <strong style={{ color: 'var(--text)' }}>N/A</strong>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="btn-primary-rect" 
                    style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}
                    onClick={triggerManualBackup}
                    disabled={isBackupRunning}
                  >
                    <Database className="h-4 w-4" />
                    <span>{isBackupRunning ? 'Creating Backup...' : 'Create Backup Snapshot'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* I. SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div className="animate-fade-in">
              <div className="settings-layout">
                {/* Left side nav links */}
                <div className="settings-nav-sidebar">
                  <span className="settings-nav-link active">General Platform</span>
                  <span className="settings-nav-link" onClick={() => triggerToast("SMTP Configuration loaded", "info")}>SMTP Relay Setup</span>
                  <span className="settings-nav-link" onClick={() => triggerToast("Authentication audit policies loaded", "info")}>Auth Credentials Policies</span>
                  <span className="settings-nav-link" onClick={() => triggerToast("Data Retention logs audit loaded", "info")}>Log Retention Policies</span>
                </div>

                {/* Settings Input Form */}
                <div className="gorgeous-card">
                  <h3 className="section-header-title">
                    <Settings className="h-5 w-5 text-indigo-600" />
                    <span>System Parameters Configuration</span>
                  </h3>

                  <form onSubmit={handleSaveSettings}>
                    <div className="form-group-control">
                      <label className="form-label-styled">Academic Site Title</label>
                      <input 
                        type="text" 
                        className="form-input-text" 
                        value={settingsForm.siteTitle}
                        onChange={(e) => setSettingsForm({...settingsForm, siteTitle: e.target.value})}
                      />
                    </div>

                    <div className="form-group-control">
                      <label className="form-label-styled">System Notification Email Address</label>
                      <input 
                        type="email" 
                        className="form-input-text" 
                        value={settingsForm.adminEmail}
                        onChange={(e) => setSettingsForm({...settingsForm, adminEmail: e.target.value})}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                      <div className="form-group-control">
                        <label className="form-label-styled">SMTP Relay Hostname</label>
                        <input 
                          type="text" 
                          className="form-input-text" 
                          value={settingsForm.smtpHost}
                          onChange={(e) => setSettingsForm({...settingsForm, smtpHost: e.target.value})}
                        />
                      </div>
                      <div className="form-group-control">
                        <label className="form-label-styled">SMTP Port</label>
                        <input 
                          type="text" 
                          className="form-input-text" 
                          value={settingsForm.smtpPort}
                          onChange={(e) => setSettingsForm({...settingsForm, smtpPort: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="form-group-control">
                      <label className="form-label-styled">SMTP Username</label>
                      <input 
                        type="text" 
                        className="form-input-text" 
                        value={settingsForm.smtpUser}
                        onChange={(e) => setSettingsForm({...settingsForm, smtpUser: e.target.value})}
                      />
                    </div>

                    <div className="form-group-control">
                      <label className="form-label-styled">SMTP Password / API Key</label>
                      <input 
                        type="password" 
                        className="form-input-text" 
                        value={settingsForm.smtpPass}
                        onChange={(e) => setSettingsForm({...settingsForm, smtpPass: e.target.value})}
                      />
                    </div>

                    <div style={{ margin: '20px 0' }}>
                      <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
                        Automated Trigger Alerts
                      </h4>

                      <div className="toggle-switch-row">
                        <div>
                          <strong style={{ fontSize: '13px', color: 'var(--text)' }}>Notify on New Users Registration</strong>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Email admins when new students register</span>
                        </div>
                        <button 
                          type="button"
                          className={`toggle-switch-btn ${settingsForm.notifyOnNewUsers ? 'active' : ''}`}
                          onClick={() => setSettingsForm({...settingsForm, notifyOnNewUsers: !settingsForm.notifyOnNewUsers})}
                        >
                          <div className="toggle-switch-handle" />
                        </button>
                      </div>

                      <div className="toggle-switch-row">
                        <div>
                          <strong style={{ fontSize: '13px', color: 'var(--text)' }}>Enforce Student Verification</strong>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Require email verification link response</span>
                        </div>
                        <button 
                          type="button"
                          className={`toggle-switch-btn ${settingsForm.requireEmailVerification ? 'active' : ''}`}
                          onClick={() => setSettingsForm({...settingsForm, requireEmailVerification: !settingsForm.requireEmailVerification})}
                        >
                          <div className="toggle-switch-handle" />
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="btn-primary-rect" style={{ width: '100%', justifyContent: 'center' }}>
                      Save System Configurations
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Register User Modal (rendered conditionally) */}
      {showAddUserModal && (
        <div className="modal-overlay" onClick={() => setShowAddUserModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Register New User Credentials</h3>
              <button className="modal-close-btn" onClick={() => setShowAddUserModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit}>
              <div className="modal-body">
                <div className="form-group-control">
                  <label className="form-label-styled">Full Profile Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter user first & last name" 
                    className="form-input-text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>

                <div className="form-group-control">
                  <label className="form-label-styled">Active Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@vidyastra.ai" 
                    className="form-input-text"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>

                <div className="form-group-control">
                  <label className="form-label-styled">Initial Password</label>
                  <input 
                    type="password" 
                    placeholder="Create user login password" 
                    className="form-input-text"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  />
                </div>

                <div className="form-group-control">
                  <label className="form-label-styled">System Permission Role</label>
                  <select 
                    className="form-select-styled"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {newUser.role === 'Faculty' && (
                  <div className="form-group-control">
                    <label className="form-label-styled">Faculty Assigned Department</label>
                    <select 
                      className="form-select-styled"
                      value={newUser.dept}
                      onChange={(e) => setNewUser({...newUser, dept: e.target.value})}
                    >
                      <option value="CSE">Computer Science & Engg.</option>
                      <option value="IT">Information Technology</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="ME">Mechanical Engineering</option>
                    </select>
                  </div>
                )}

                {newUser.role === 'Student' && (
                  <div className="form-group-control">
                    <label className="form-label-styled">Student Roll Number (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 24103015" 
                      className="form-input-text"
                      value={newUser.roll}
                      onChange={(e) => setNewUser({...newUser, roll: e.target.value})}
                    />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAddUserModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-rect">
                  Provision Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {showAddCourseModal && (
        <div className="modal-overlay" onClick={() => setShowAddCourseModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Course Profile</h3>
              <button className="modal-close-btn" onClick={() => setShowAddCourseModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCourseSubmit}>
              <div className="modal-body">
                <div className="form-group-control">
                  <label className="form-label-styled">Course Code</label>
                  <input 
                    type="text" 
                    placeholder="e.g. CS201" 
                    className="form-input-text"
                    required
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                  />
                </div>

                <div className="form-group-control">
                  <label className="form-label-styled">Course Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Data Structures & Algorithms" 
                    className="form-input-text"
                    required
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  />
                </div>

                <div className="form-group-control">
                  <label className="form-label-styled">Academic Semester</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 4th Semester" 
                    className="form-input-text"
                    required
                    value={newCourse.semester}
                    onChange={(e) => setNewCourse({...newCourse, semester: e.target.value})}
                  />
                </div>

                <div className="form-group-control">
                  <label className="form-label-styled">Curriculum Department</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Computer Science" 
                    className="form-input-text"
                    required
                    value={newCourse.department}
                    onChange={(e) => setNewCourse({...newCourse, department: e.target.value})}
                  />
                </div>

                <div className="form-group-control">
                  <label className="form-label-styled">Instructor Assigned</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dr. Urvashi" 
                    className="form-input-text"
                    required
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                  />
                </div>

                <div className="form-group-control">
                  <label className="form-label-styled">Weekly Schedule</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mon, Wed, Fri (10:00 AM)" 
                    className="form-input-text"
                    value={newCourse.schedule}
                    onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                  />
                </div>

                <div className="form-group-control">
                  <label className="form-label-styled">Initial Enrollments Count</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="form-input-text"
                    value={newCourse.enrollments}
                    onChange={(e) => setNewCourse({...newCourse, enrollments: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAddCourseModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-rect">
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating System Toast */}
      {toast && (
        <div className={`vidyastra-toast ${toast.type === 'info' ? 'info' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '18px', 
              height: '18px', 
              borderRadius: '50%', 
              backgroundColor: toast.type === 'info' ? 'var(--info)' : 'var(--success)', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              ✓
            </div>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
