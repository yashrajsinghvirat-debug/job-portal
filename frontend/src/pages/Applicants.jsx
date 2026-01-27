import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobApplicants, updateApplicationStatus } from '../services/applicationService';
import { User, Mail, Calendar, CheckCircle, XCircle, Clock, Briefcase, ArrowLeft } from 'lucide-react';

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, [jobId, currentPage]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await getJobApplicants(jobId, { page: currentPage, limit: 10 });
      setApplicants(response.applications);
      setJob(response.applications[0]?.jobId || null);
      setTotalPages(response.pages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applicants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    setUpdatingStatus(applicationId);
    try {
      await updateApplicationStatus(applicationId, newStatus);
      fetchApplicants(); // Refresh the list
    } catch (err) {
      setError('Failed to update application status. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
      default:
        return <Clock className="h-4 w-4" />;
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
      <div className="mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Job Applicants</h1>
        {job && (
          <div className="mt-2">
            <p className="text-gray-600">Applicants for: {job.title}</p>
            <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Applicants List */}
      {applicants.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants yet</h3>
          <p className="text-gray-600">When people apply for this job, they'll appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicants.map((application) => (
            <div
              key={application._id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.userId?.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-1" />
                        {application.userId?.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Applied {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="ml-1 capitalize">{application.status}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <span className="mr-4">Application ID: {application._id.slice(-8)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {application.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(application._id, 'accepted')}
                        disabled={updatingStatus === application._id}
                        className="inline-flex items-center px-3 py-1 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 disabled:opacity-50"
                      >
                        {updatingStatus === application._id ? (
                          <div className="spinner h-4 w-4 mr-1"></div>
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        )}
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(application._id, 'rejected')}
                        disabled={updatingStatus === application._id}
                        className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-50"
                      >
                        {updatingStatus === application._id ? (
                          <div className="spinner h-4 w-4 mr-1"></div>
                        ) : (
                          <XCircle className="h-4 w-4 mr-1" />
                        )}
                        Reject
                      </button>
                    </>
                  )}
                  {application.status !== 'pending' && (
                    <span className="text-sm text-gray-500">
                      Decision has been made
                    </span>
                  )}
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

      {/* Stats Summary */}
      {applicants.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{applicants.length}</div>
              <div className="text-sm text-gray-600">Total Applicants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {applicants.filter(app => app.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {applicants.filter(app => app.status === 'accepted').length}
              </div>
              <div className="text-sm text-gray-600">Accepted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {applicants.filter(app => app.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicants;
