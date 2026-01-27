import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { useAuth } from './AuthContext';

// Application context
const ApplicationContext = createContext();

// Application action types
const ADD_APPLICATION = 'ADD_APPLICATION';
const LOAD_APPLICATIONS = 'LOAD_APPLICATIONS';
const CLEAR_APPLICATIONS = 'CLEAR_APPLICATIONS';

// Application reducer
const applicationReducer = (state, action) => {
  switch (action.type) {
    case ADD_APPLICATION:
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };
    case LOAD_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
      };
    case CLEAR_APPLICATIONS:
      return {
        ...state,
        applications: [],
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  applications: [],
};

// Application provider component
export const ApplicationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load applications when user logs in
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      loadApplications();
    } else {
      // Clear applications when user logs out
      dispatch({ type: CLEAR_APPLICATIONS });
    }
  }, [isAuthenticated, user?.email]);

  // Load applications from localStorage
  const loadApplications = () => {
    if (!user?.email) return;
    
    try {
      const storedApplications = localStorage.getItem(`applications_${user.email}`);
      if (storedApplications) {
        const applications = JSON.parse(storedApplications);
        dispatch({ type: LOAD_APPLICATIONS, payload: applications });
      }
    } catch (error) {
      console.error('Failed to load applications:', error);
    }
  };

  // Save applications to localStorage
  const saveApplications = (applications) => {
    if (!user?.email) return;
    
    try {
      localStorage.setItem(`applications_${user.email}`, JSON.stringify(applications));
    } catch (error) {
      console.error('Failed to save applications:', error);
    }
  };

  // Apply for a job
  const applyForJob = (job) => {
    if (!isAuthenticated || !user?.email) {
      throw new Error('You must be logged in to apply for jobs');
    }

    // Check if already applied
    const isAlreadyApplied = state.applications.some(app => app.jobId === job._id);
    if (isAlreadyApplied) {
      throw new Error('You have already applied for this job');
    }

    const newApplication = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      jobId: job._id,
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      description: job.description,
      appliedAt: new Date().toISOString(),
      status: 'Applied',
      userEmail: user.email,
      userName: user.name
    };

    const updatedApplications = [...state.applications, newApplication];
    dispatch({ type: ADD_APPLICATION, payload: newApplication });
    saveApplications(updatedApplications);

    return newApplication;
  };

  // Check if user has applied for a job
  const hasAppliedForJob = (jobId) => {
    return state.applications.some(app => app.jobId === jobId);
  };

  // Get application by job ID
  const getApplicationByJobId = (jobId) => {
    return state.applications.find(app => app.jobId === jobId);
  };

  // Remove an application
  const removeApplication = (applicationId) => {
    const updatedApplications = state.applications.filter(app => app.id !== applicationId);
    dispatch({ type: LOAD_APPLICATIONS, payload: updatedApplications });
    saveApplications(updatedApplications);
  };

  const value = {
    ...state,
    applyForJob,
    hasAppliedForJob,
    getApplicationByJobId,
    removeApplication,
    loadApplications,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

// Hook to use application context
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};

export default ApplicationContext;
