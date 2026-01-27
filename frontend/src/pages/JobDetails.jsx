import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import { applyForJob } from '../services/applicationService';
import { useAuth } from '../context/AuthContext';
import { Building, MapPin, DollarSign, Clock, User, Send, ArrowLeft, Briefcase } from 'lucide-react';

// Dummy job data for fallback
const dummyJobs = {
  'dummy-1': {
    _id: 'dummy-1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    salary: '$120,000 - $160,000',
    description: 'We are looking for an experienced frontend developer with expertise in React, TypeScript, and modern web technologies. You will be responsible for building responsive web applications, collaborating with cross-functional teams, and implementing best practices in frontend development.\n\nKey Responsibilities:\n• Develop and maintain responsive web applications using React and TypeScript\n• Collaborate with UX designers and backend developers\n• Implement modern frontend best practices and design patterns\n• Optimize applications for maximum speed and scalability\n• Participate in code reviews and mentor junior developers\n\nRequirements:\n• 5+ years of experience in frontend development\n• Strong proficiency in React, TypeScript, and modern JavaScript\n• Experience with state management libraries (Redux, Zustand, etc.)\n• Knowledge of responsive design and cross-browser compatibility\n• Excellent problem-solving and communication skills',
    createdAt: new Date('2024-01-15').toISOString()
  },
  'dummy-2': {
    _id: 'dummy-2',
    title: 'Full Stack Engineer',
    company: 'Digital Innovations',
    location: 'New York, NY',
    salary: '$100,000 - $140,000',
    description: 'Join our team to build scalable web applications using Node.js, React, and cloud technologies. You will work on full-stack development projects, from database design to frontend implementation.\n\nKey Responsibilities:\n• Design and develop scalable web applications\n• Work with both frontend and backend technologies\n• Collaborate with product managers and designers\n• Implement RESTful APIs and database schemas\n• Deploy and maintain applications on cloud platforms\n\nRequirements:\n• 3+ years of full-stack development experience\n• Proficiency in Node.js, React, and modern databases\n• Experience with cloud platforms (AWS, Azure, GCP)\n• Strong understanding of software architecture\n• Excellent teamwork and communication skills',
    createdAt: new Date('2024-01-14').toISOString()
  },
  'dummy-3': {
    _id: 'dummy-3',
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'Remote',
    salary: '$80,000 - $110,000',
    description: 'We need a talented designer to create beautiful user experiences for our mobile and web applications. You will be responsible for the entire design process, from concept to implementation.\n\nKey Responsibilities:\n• Create wireframes, mockups, and prototypes\n• Design user interfaces for web and mobile applications\n• Conduct user research and usability testing\n• Collaborate with developers to ensure design implementation\n• Maintain and evolve our design system\n\nRequirements:\n• 3+ years of UX/UI design experience\n• Proficiency in design tools (Figma, Sketch, Adobe XD)\n• Strong portfolio demonstrating design skills\n• Understanding of user-centered design principles\n• Experience with responsive design and accessibility',
    createdAt: new Date('2024-01-13').toISOString()
  }
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getJobById(id);
      setJob(response.job);
    } catch (err) {
      console.error('Failed to fetch job details:', err);
      
      // Try to use dummy data as fallback
      if (dummyJobs[id]) {
        console.log('Using dummy job data for job details');
        setJob(dummyJobs[id]);
      } else {
        setError('Job not found or has been removed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'jobseeker') {
      setError('Only job seekers can apply for jobs.');
      return;
    }

    setApplying(true);
    try {
      await applyForJob(id);
      setApplicationSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply for job');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
          <Link
            to="/jobs"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/jobs"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Jobs
      </Link>

      {job && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Job Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-blue-100">
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
              </div>
              <div className="text-right">
                <div className="flex items-center text-blue-100 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </div>
                {isAuthenticated && user?.role === 'jobseeker' && (
                  <button
                    onClick={handleApply}
                    disabled={applying || applicationSuccess}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {applying ? (
                      <div className="spinner h-5 w-5 mr-2"></div>
                    ) : applicationSuccess ? (
                      'Applied ✓'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Apply Now
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Job Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                  <div className="prose max-w-none text-gray-600 whitespace-pre-wrap">
                    {job.description}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Company Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Company</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{job.company}</h4>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="font-medium text-gray-900">Salary:</span>
                      <span className="ml-2 text-gray-600">{job.salary}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="font-medium text-gray-900">Location:</span>
                      <span className="ml-2 text-gray-600">{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="font-medium text-gray-900">Posted:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recruiter Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Posted by</h3>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{job.createdBy?.name}</p>
                      <p className="text-sm text-gray-600">{job.createdBy?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {applicationSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 max-w-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="h-5 w-5 rounded-full bg-green-400 flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Application submitted successfully!
              </p>
              <p className="text-sm text-green-700 mt-1">
                You can track your application status in your dashboard.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
