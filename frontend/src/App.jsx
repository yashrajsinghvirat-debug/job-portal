import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ApplicationProvider } from './context/ApplicationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Blog from './pages/Blog';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PostJob from './pages/PostJob';
import MyJobs from './pages/MyJobs';
import Applications from './pages/Applications';
import Applicants from './pages/Applicants';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ApplicationProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Navbar />
              <main className="flex-grow">
                <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/help" element={<Help />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/about" element={<About />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Recruiter routes */}
              <Route path="/post-job" element={
                <ProtectedRoute requiredRole="recruiter">
                  <PostJob />
                </ProtectedRoute>
              } />
              <Route path="/my-jobs" element={
                <ProtectedRoute requiredRole="recruiter">
                  <MyJobs />
                </ProtectedRoute>
              } />
              <Route path="/applicants/:jobId" element={
                <ProtectedRoute requiredRole="recruiter">
                  <Applicants />
                </ProtectedRoute>
              } />

              {/* Job Seeker routes */}
              <Route path="/applications" element={
                <ProtectedRoute requiredRole="jobseeker">
                  <Applications />
                </ProtectedRoute>
              } />

              {/* Admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApplicationProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
