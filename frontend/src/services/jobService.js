import api from './api';

// Get all jobs with filters
export const getJobs = async (params = {}) => {
  const response = await api.get('/jobs', { params });
  return response.data;
};

// Get job by ID
export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};

// Create new job
export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

// Update job
export const updateJob = async (jobId, jobData) => {
  const response = await api.put(`/jobs/${jobId}`, jobData);
  return response.data;
};

// Delete job
export const deleteJob = async (jobId) => {
  const response = await api.delete(`/jobs/${jobId}`);
  return response.data;
};

// Get my posted jobs
export const getMyJobs = async (params = {}) => {
  const response = await api.get('/jobs/my-jobs', { params });
  return response.data;
};
