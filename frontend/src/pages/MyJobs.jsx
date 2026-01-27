import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyJobs, deleteJob } from '../services/jobService';
import { Briefcase, MapPin, DollarSign, Calendar, Edit, Trash2, Eye, Users } from 'lucide-react';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getMyJobs({ page: currentPage, limit: 10 });
      setJobs(response.jobs);
      setTotalPages(response.pages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch your jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      try {
        await deleteJob(jobId);
        fetchJobs(); // Refresh the list
      } catch (err) {
        setError('Failed to delete job. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Posted Jobs</h1>
          <p className="text-gray-600 mt-2">Manage and track all your job postings</p>
        </div>
        <Link
          to="/post-job"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Post New Job
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
          <p className="text-gray-600 mb-4">Start by posting your first job opening</p>
          <Link
            to="/post-job"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    job.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 line-clamp-2 mb-4">
                {job.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-500 text-sm"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                  <Link
                    to={`/applicants/${job._id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-500 text-sm"
                  >
                    <Users className="h-4 w-4 mr-1" />
                    View Applicants
                  </Link>
                  <Link
                    to={`/edit-job/${job._id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-500 text-sm"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="inline-flex items-center text-red-600 hover:text-red-500 text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
