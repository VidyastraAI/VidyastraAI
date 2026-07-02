// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Login from './pages/Login';

// // --- Admin Imports ---
// import AdminHome from './pages/AdminDashboard/AdminHome';
// import CourseManagement from './pages/AdminDashboard/CourseManagement';
// import ContentModeration from './pages/AdminDashboard/ContentModeration';
// import AIManager from './pages/AdminDashboard/AIManager';
// import AnalyticsReports from './pages/AdminDashboard/AnalyticsReports';
// import NotificationsMgt from './pages/AdminDashboard/NotificationsMgt';
// import UserManagement from './pages/AdminDashboard/UserManagement';
// import SystemLogs from './pages/AdminDashboard/SystemLogs';
// import AdminSettings from './pages/AdminDashboard/Settings';

// // --- Faculty Imports ---
// import FacultyHome from './pages/FacultyDashboard/FacultyHome';
// import AIAssistant from './pages/FacultyDashboard/AIAssistant';
// import Analytics from './pages/FacultyDashboard/Analytics';
// import AssignmentAssess from './pages/FacultyDashboard/AssignmentAssess';
// import ContentLibrary from './pages/FacultyDashboard/ContentLibrary';
// import LectureCenter from './pages/FacultyDashboard/LectureCenter';
// import LectureRecorder from './pages/FacultyDashboard/LectureRecorder';
// import LiveClass from './pages/FacultyDashboard/LiveClass';
// import MessagesAnnounce from './pages/FacultyDashboard/MessagesAnnounce';
// import MyCoursesFaculty from './pages/FacultyDashboard/MyCourses';
// import ProfileSettingsFaculty from './pages/FacultyDashboard/ProfileSettings';
// import StudentManagement from './pages/FacultyDashboard/StudentManagement';

// // --- Student Imports ---
// import StudentHome from './pages/StudentDashboard/StudentHome';
// import MyCoursesStudent from './pages/StudentDashboard/MyCourses';
// import LectureLibrary from './pages/StudentDashboard/LectureLibrary';
// import AINotes from './pages/StudentDashboard/AINotes';
// import AIQuiz from './pages/StudentDashboard/AIQuiz';
// import AITutor from './pages/StudentDashboard/AITutor';
// import AssignmentsStudent from './pages/StudentDashboard/Assignments';
// import NotificationsStudent from './pages/StudentDashboard/Notifications';
// import ProfileSettingsStudent from './pages/StudentDashboard/ProfileSettings';
// import ProgressAnalytics from './pages/StudentDashboard/ProgressAnalytics';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login/>}/>

//         {/* Admin Routes (/admin/) */}
//         <Route path="/admin/" element={<AdminHome />} />
//         <Route path="/admin/courses" element={<CourseManagement />} />
//         <Route path="/admin/moderation" element={<ContentModeration />} />
//         <Route path="/admin/ai" element={<AIManager />} />
//         <Route path="/admin/analytics" element={<AnalyticsReports />} />
//         <Route path="/admin/notifications" element={<NotificationsMgt />} />
//         <Route path="/admin/users" element={<UserManagement />} />
//         <Route path="/admin/logs" element={<SystemLogs />} />
//         <Route path="/admin/settings" element={<AdminSettings />} />

//         {/* Faculty Routes (fdashboard/) */}
//         <Route path="/fdashboard/" element={<FacultyHome />} />
//         <Route path="/fdashboard/ai-assistant" element={<AIAssistant />} />
//         <Route path="/fdashboard/analytics" element={<Analytics />} />
//         <Route path="/fdashboard/assessments" element={<AssignmentAssess />} />
//         <Route path="/fdashboard/library" element={<ContentLibrary />} />
//         <Route path="/fdashboard/lecture-center" element={<LectureCenter />} />
//         <Route path="/fdashboard/recorder" element={<LectureRecorder />} />
//         <Route path="/fdashboard/live" element={<LiveClass />} />
//         <Route path="/fdashboard/messages" element={<MessagesAnnounce />} />
//         <Route path="/fdashboard/courses" element={<MyCoursesFaculty />} />
//         <Route path="/fdashboard/settings" element={<ProfileSettingsFaculty />} />
//         <Route path="/fdashboard/students" element={<StudentManagement />} />

//         {/* Student Routes (sdashboard/) */}
//         <Route path="/sdashboard/" element={<StudentHome />} />
//         <Route path="/sdashboard/courses" element={<MyCoursesStudent />} />
//         <Route path="/sdashboard/library" element={<LectureLibrary />} />
//         <Route path="/sdashboard/notes" element={<AINotes />} />
//         <Route path="/sdashboard/quiz" element={<AIQuiz />} />
//         <Route path="/sdashboard/tutor" element={<AITutor />} />
//         <Route path="/sdashboard/assignments" element={<AssignmentsStudent />} />
//         <Route path="/sdashboard/notifications" element={<NotificationsStudent />} />
//         <Route path="/sdashboard/settings" element={<ProfileSettingsStudent />} />
//         <Route path="/sdashboard/progress" element={<ProgressAnalytics />} />

//         {/* Default fallback */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { useState } from 'react';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import LecturesArchive from './pages/LecturesArchive';

function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);

  const [lectures, setLectures] = useState([
    {
      id: 101, topic: 'Introduction to React Hooks', date: '2026-06-08', duration: '45:12',
      transcript: [
        { time: '10:05 AM', text: "Good morning, let's get started with React Hooks." },
        { time: '10:12 AM', text: 'Hooks were introduced in React 16.8 for state in functions.' },
        { time: '10:25 AM', text: 'useState allows functional components to have local state.' },
        { time: '10:38 AM', text: 'useEffect handles side effects like API calls.' },
        { time: '10:48 AM', text: 'Always follow the rules of hooks.' },
      ],
      quizzes: [{ question: 'Which Hook handles side-effects?', correctIndex: 1 }],
    },
    {
      id: 102, topic: 'Web Application Security (JWT & CSRF)', date: '2026-06-09', duration: '52:40',
      transcript: [
        { time: '02:02 PM', text: 'Welcome to our web security session.' },
        { time: '02:10 PM', text: 'JWT is useful for stateless authentication.' },
        { time: '02:22 PM', text: 'CSRF occurs when bad sites use your active cookies.' },
        { time: '02:35 PM', text: 'Anti-CSRF tokens validate request origin.' },
        { time: '02:48 PM', text: 'HttpOnly cookies block JavaScript token theft.' },
      ],
      quizzes: [{ question: 'What are the three parts of a JWT?', correctIndex: 1 }],
    },
  ]);

  const handleLogin = (role, name) => { setUser({ role, name }); setView('dashboard'); };
  const handleLogout = () => { setUser(null); setView('login'); };
  const handleNavigate = (v) => setView(v);

  return (
    <div className="app-container">
      {view === 'login' && <Login onLogin={handleLogin} onNavigate={handleNavigate} />}
      {view === 'forgot' && <ForgotPassword onNavigate={handleNavigate} />}

      {view === 'dashboard' && user?.role === 'admin' && (
        <AdminDashboard user={user} onLogout={handleLogout} onNavigate={handleNavigate} lectures={lectures} />
      )}
      {view === 'dashboard' && user?.role === 'teacher' && (
        <TeacherDashboard user={user} onLogout={handleLogout} onNavigate={handleNavigate} lectures={lectures} setLectures={setLectures} />
      )}
      {view === 'dashboard' && user?.role === 'student' && (
        <StudentDashboard user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}

      {view === 'archive' && (
        <LecturesArchive user={user} onLogout={handleLogout} onNavigate={handleNavigate} lectures={lectures} />
      )}
    </div>
  );
}

export default App;