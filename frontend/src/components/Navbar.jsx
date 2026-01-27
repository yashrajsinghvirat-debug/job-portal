import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, User, Briefcase, LogOut, Settings, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 shadow-lg dark:shadow-gray-800/50 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              JobPortal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/') ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/jobs') ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              Jobs
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 group-hover:rotate-12 transition-transform duration-500" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                {user?.role === 'recruiter' && (
                  <>
                    <Link
                      to="/post-job"
                      className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive('/post-job') ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      Post Job
                    </Link>
                    <Link
                      to="/my-jobs"
                      className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive('/my-jobs') ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      My Jobs
                    </Link>
                  </>
                )}
                {user?.role === 'jobseeker' && (
                  <Link
                    to="/applications"
                    className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive('/applications') ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    My Applications
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive('/admin') ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    Admin
                  </Link>
                )}

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg dark:shadow-gray-900/50 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive('/') ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive('/jobs') ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>

              {isAuthenticated ? (
                <>
                  {user?.role === 'recruiter' && (
                    <>
                      <Link
                        to="/post-job"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActive('/post-job') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Post Job
                      </Link>
                      <Link
                        to="/my-jobs"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActive('/my-jobs') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Jobs
                      </Link>
                    </>
                  )}
                  {user?.role === 'jobseeker' && (
                    <Link
                      to="/applications"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive('/applications') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Applications
                    </Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive('/admin') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/profile') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
