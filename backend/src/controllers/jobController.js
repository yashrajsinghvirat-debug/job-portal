import Job from '../models/Job.js';
import Application from '../models/Application.js';
import { body, validationResult } from 'express-validator';

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private/Recruiter
export const createJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, location, salary, company } = req.body;

    const job = await Job.create({
      title,
      description,
      location,
      salary,
      company,
      createdBy: req.user.id
    });

    // Populate the created by field
    await job.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all jobs with pagination, search, and filters
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = { isActive: true };

    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Location filter
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }

    // Company filter
    if (req.query.company) {
      query.company = { $regex: req.query.company, $options: 'i' };
    }

    // Salary filter
    if (req.query.salary) {
      query.salary = { $regex: req.query.salary, $options: 'i' };
    }

    // Get jobs
    const jobs = await Job.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      count: jobs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (!job.isActive) {
      return res.status(404).json({ message: 'Job is no longer active' });
    }

    res.json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Recruiter
export const updateJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job creator
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const { title, description, location, salary, company } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { title, description, location, salary, company },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    res.json({
      success: true,
      job: updatedJob
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private/Recruiter
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job creator
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    // Soft delete by setting isActive to false
    job.isActive = false;
    await job.save();

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get jobs posted by current user (Recruiter)
// @route   GET /api/jobs/my-jobs
// @access  Private/Recruiter
export const getMyJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Job.countDocuments({ createdBy: req.user.id });

    res.json({
      success: true,
      count: jobs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
