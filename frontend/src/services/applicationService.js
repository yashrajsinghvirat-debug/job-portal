import api from './api';

// Apply for a job
export const applyForJob = async (jobId) => {
  const response = await api.post('/applications', { jobId });
  return response.data;
};

// Get my applications
export const getMyApplications = async (params = {}) => {
  const response = await api.get('/applications/my-applications', { params });
  return response.data;
};

// Get applicants for a job
export const getJobApplicants = async (jobId, params = {}) => {
  const response = await api.get(`/applications/job/${jobId}`, { params });
  return response.data;
};

// Update application status
export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.put(`/applications/${applicationId}/status`, { status });
  return response.data;
};

// Get all applications (admin)
export const getAllApplications = async (params = {}) => {
  const response = await api.get('/applications', { params });
  return response.data;
};
