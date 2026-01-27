import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { validationResult } from 'express-validator';

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private/JobSeeker
export const applyForJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobId } = req.body;

    // Check if job exists and is active
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (!job.isActive) {
      return res.status(400).json({ message: 'Job is no longer active' });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      jobId,
      userId: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create application
    const application = await Application.create({
      jobId,
      userId: req.user.id
    });

    // Populate related fields
    await application.populate([
      { path: 'jobId', select: 'title company location salary' },
      { path: 'userId', select: 'name email' }
    ]);

    res.status(201).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get applications for current user (JobSeeker)
// @route   GET /api/applications/my-applications
// @access  Private/JobSeeker
export const getMyApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find({ userId: req.user.id })
      .populate('jobId', 'title company location salary')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments({ userId: req.user.id });

    res.json({
      success: true,
      count: applications.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get applicants for a job (Recruiter)
// @route   GET /api/applications/job/:jobId
// @access  Private/Recruiter
export const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists and belongs to the recruiter
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view applicants for this job' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find({ jobId })
      .populate('userId', 'name email')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments({ jobId });

    res.json({
      success: true,
      count: applications.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update application status (Recruiter)
// @route   PUT /api/applications/:id/status
// @access  Private/Recruiter
export const updateApplicationStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('jobId');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the job belongs to the recruiter
    if (application.jobId.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    await application.populate([
      { path: 'jobId', select: 'title company' },
      { path: 'userId', select: 'name email' }
    ]);

    res.json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all applications (Admin)
// @route   GET /api/applications
// @access  Private/Admin
export const getAllApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find({})
      .populate('jobId', 'title company')
      .populate('userId', 'name email')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments();

    res.json({
      success: true,
      count: applications.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
