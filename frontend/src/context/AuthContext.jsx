import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { login, register, getCurrentUser } from '../services/authService';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Action types
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILURE = 'AUTH_FAILURE';
const LOGOUT = 'LOGOUT';
const SET_LOADING = 'SET_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_USER = 'LOAD_USER';

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from token
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const demoMode = localStorage.getItem('demoMode');
      
      if (token && user) {
        // Check if this is a demo mode user
        if (demoMode === 'true' && (token.startsWith('demo-token-') || token.startsWith('session-token-'))) {
          // Load demo user from localStorage
          try {
            const userData = JSON.parse(user);
            dispatch({ type: LOAD_USER, payload: userData });
          } catch (error) {
            console.error('Failed to parse demo user data:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('demoMode');
            dispatch({ type: SET_LOADING, payload: false });
          }
        } else {
          // Try to load user from backend
          try {
            const response = await getCurrentUser();
            dispatch({ type: LOAD_USER, payload: response.user });
          } catch (error) {
            dispatch({ type: AUTH_FAILURE, payload: error.response?.data?.message || 'Failed to load user' });
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } else {
        dispatch({ type: SET_LOADING, payload: false });
      }
    };

    loadUser();
  }, []);

  // Login user
  const loginUser = async (credentials) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      // First try backend login
      const response = await login(credentials);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch({
        type: AUTH_SUCCESS,
        payload: { user: response.user, token: response.token },
      });
      
      return response;
    } catch (error) {
      console.log('Backend login failed, trying frontend validation:', error);
      
      // Frontend validation against registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(u => 
        u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        // Create session token for demo user
        const demoToken = `session-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Remove password from user object for storage
        const { password, ...userWithoutPassword } = user;
        
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('demoMode', 'true');
        
        dispatch({
          type: AUTH_SUCCESS,
          payload: { user: userWithoutPassword, token: demoToken },
        });
        
        return { success: true, user: userWithoutPassword, token: demoToken, demoMode: true };
      } else {
        dispatch({
          type: AUTH_FAILURE,
          payload: 'User not registered or invalid credentials.',
        });
        throw new Error('User not registered or invalid credentials.');
      }
    }
  };

  // Register user
  const registerUser = async (userData) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await register(userData);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch({
        type: AUTH_SUCCESS,
        payload: { user: response.user, token: response.token },
      });
      
      return response;
    } catch (error) {
      console.log('Backend registration failed, falling back to demo mode:', error);
      
      // Check for duplicate email in registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = registeredUsers.find(u => u.email === userData.email);
      
      if (existingUser) {
        dispatch({
          type: AUTH_FAILURE,
          payload: 'Email already registered. Please use a different email.',
        });
        throw new Error('Email already registered. Please use a different email.');
      }
      
      // Create new user for demo mode
      const newUser = {
        _id: `demo-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        password: userData.password, // Store password for demo validation
        role: userData.role || 'jobseeker',
        isBlocked: false,
        createdAt: new Date().toISOString()
      };
      
      // Add to registered users array
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      // Create session token
      const demoToken = `demo-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Remove password from user object for storage
      const { password, ...userWithoutPassword } = newUser;
      
      // Save to localStorage
      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('demoMode', 'true');
      
      dispatch({
        type: AUTH_SUCCESS,
        payload: { user: userWithoutPassword, token: demoToken },
      });
      
      // Return demo response
      return {
        success: true,
        user: userWithoutPassword,
        token: demoToken,
        demoMode: true
      };
    }
  };

  // Logout user
  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('demoMode');
    dispatch({ type: LOGOUT });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  const value = {
    ...state,
    loginUser,
    registerUser,
    logoutUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
