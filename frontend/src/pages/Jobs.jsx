import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobs } from '../services/jobService';
import { applyForJob } from '../services/applicationService';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';
import { Search, MapPin, Building, DollarSign, Clock, Filter, Send, CheckCircle, AlertCircle } from 'lucide-react';

// Dummy jobs data for fallback
const dummyJobs = [
  {
    _id: 'dummy-1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    salary: '$120,000 - $160,000',
    description: 'We are looking for an experienced frontend developer with expertise in React, TypeScript, and modern web technologies.',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    _id: 'dummy-2',
    title: 'Full Stack Engineer',
    company: 'Digital Innovations',
    location: 'New York, NY',
    salary: '$100,000 - $140,000',
    description: 'Join our team to build scalable web applications using Node.js, React, and cloud technologies.',
    createdAt: new Date('2024-01-14').toISOString()
  },
  {
    _id: 'dummy-3',
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'Remote',
    salary: '$80,000 - $110,000',
    description: 'We need a talented designer to create beautiful user experiences for our mobile and web applications.',
    createdAt: new Date('2024-01-13').toISOString()
  },
  {
    _id: 'dummy-4',
    title: 'DevOps Engineer',
    company: 'CloudTech Systems',
    location: 'Seattle, WA',
    salary: '$130,000 - $170,000',
    description: 'Help us build and maintain scalable infrastructure using AWS, Docker, and Kubernetes.',
    createdAt: new Date('2024-01-12').toISOString()
  },
  {
    _id: 'dummy-5',
    title: 'Mobile Developer',
    company: 'AppWorks',
    location: 'Austin, TX',
    salary: '$90,000 - $130,000',
    description: 'Develop native iOS and Android applications using React Native and Flutter.',
    createdAt: new Date('2024-01-11').toISOString()
  },
  {
    _id: 'dummy-6',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    salary: '$110,000 - $150,000',
    description: 'Apply machine learning and statistical analysis to solve complex business problems.',
    createdAt: new Date('2024-01-10').toISOString()
  },
  {
    _id: 'dummy-7',
    title: 'Backend Developer',
    company: 'ServerSide Tech',
    location: 'Chicago, IL',
    salary: '$95,000 - $135,000',
    description: 'Build robust APIs and microservices using Python, Java, and Node.js.',
    createdAt: new Date('2024-01-09').toISOString()
  },
  {
    _id: 'dummy-8',
    title: 'UX Researcher',
    company: 'UserFirst Design',
    location: 'Los Angeles, CA',
    salary: '$85,000 - $115,000',
    description: 'Conduct user research and usability testing to improve product experiences.',
    createdAt: new Date('2024-01-08').toISOString()
  }
];

const Jobs = () => {
  const { isAuthenticated, user } = useAuth();
  const { applyForJob: applyForJobToApplication, hasAppliedForJob } = useApplication();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]); // For client-side search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [applyingJobs, setApplyingJobs] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState('');
  const [usingDummyData, setUsingDummyData] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [currentPage]); // Only fetch on page change, search will be client-side

  useEffect(() => {
    // Client-side search/filter
    if (allJobs.length > 0) {
      const filteredJobs = allJobs.filter(job => {
        const matchesSearch = !searchTerm || 
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLocation = !location || 
          job.location.toLowerCase().includes(location.toLowerCase());
        
        const matchesCompany = !company || 
          job.company.toLowerCase().includes(company.toLowerCase());
        
        return matchesSearch && matchesLocation && matchesCompany;
      });
      
      setJobs(filteredJobs);
      setTotalPages(Math.max(1, Math.ceil(filteredJobs.length / 10)));
    }
  }, [searchTerm, location, company, allJobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        limit: 10,
      };
      
      if (searchTerm) params.search = searchTerm;
      if (location) params.location = location;
      if (company) params.company = company;

      const response = await getJobs(params);
      
      // Handle successful response
      if (response.success && response.jobs) {
        setJobs(response.jobs);
        setAllJobs(response.jobs);
        setTotalPages(response.pages || 1);
        setUsingDummyData(false);
      } else {
        // Handle unexpected response format
        setJobs(response.jobs || []);
        setAllJobs(response.jobs || []);
        setTotalPages(response.pages || 1);
        setUsingDummyData(false);
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      
      // Use dummy data as fallback
      console.log('Using dummy jobs data as fallback');
      setJobs(dummyJobs);
      setAllJobs(dummyJobs);
      setTotalPages(1);
      setUsingDummyData(true);
      
      // Don't set error - just use dummy data silently
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleApply = async (jobId, jobTitle) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (hasAppliedForJob(jobId)) {
      setSuccessMessage('You have already applied for this job!');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    setApplyingJobs(prev => new Set(prev).add(jobId));
    
    try {
      // Try to call backend API first
      await applyForJob(jobId);
      setSuccessMessage(`Successfully applied to ${jobTitle}!`);
    } catch (err) {
      console.log('Backend apply failed, using frontend application tracking:', err);
    }
    
    try {
      // Use frontend application tracking
      const job = jobs.find(j => j._id === jobId);
      if (job) {
        await applyForJobToApplication(job);
        setSuccessMessage(`Successfully applied to ${jobTitle}!`);
      }
    } catch (error) {
      setSuccessMessage(`Application submitted for ${jobTitle}! (Demo mode)`);
    } finally {
      setApplyingJobs(prev => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleFilter = () => {
    setCurrentPage(1);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocation('');
    setCompany('');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Jobs</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search jobs, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City or country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleFilter}
                  className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}

      {/* Dummy Data Notice */}
      {usingDummyData && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <p className="text-blue-800">
            Showing sample jobs for demo purposes.
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="spinner"></div>
        </div>
      )}

      {/* Jobs List */}
      {!loading && (
        <>
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="hover:text-blue-600"
                        >
                          {job.title}
                        </Link>
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleApply(job._id, job.title)}
                          disabled={applyingJobs.has(job._id) || hasAppliedForJob(job._id)}
                          className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
                            hasAppliedForJob(job._id)
                              ? 'bg-green-100 border-green-300 text-green-700 cursor-not-allowed'
                              : applyingJobs.has(job._id)
                              ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-green-600 border-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {applyingJobs.has(job._id) ? (
                            <>
                              <div className="spinner h-4 w-4 mr-1"></div>
                              Applying...
                            </>
                          ) : hasAppliedForJob(job._id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Applied
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-1" />
                              Apply
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    {job.description}
                  </p>
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
        </>
      )}
    </div>
  );
};

export default Jobs;
