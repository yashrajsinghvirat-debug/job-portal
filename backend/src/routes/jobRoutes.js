import express from 'express';
import { body } from 'express-validator';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs
} from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const createJobValidation = [
  body('title').trim().isLength({ min: 2, max: 100 }).withMessage('Title must be 2-100 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be 10-2000 characters'),
  body('location').trim().isLength({ min: 2, max: 100 }).withMessage('Location must be 2-100 characters'),
  body('salary').trim().isLength({ min: 1, max: 50 }).withMessage('Salary information is required'),
  body('company').trim().isLength({ min: 2, max: 100 }).withMessage('Company must be 2-100 characters')
];

const updateJobValidation = [
  body('title').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Title must be 2-100 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be 10-2000 characters'),
  body('location').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Location must be 2-100 characters'),
  body('salary').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Salary information is required'),
  body('company').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Company must be 2-100 characters')
];

// Public routes
router.get('/', getJobs);

// Special routes - Must come before parameterized routes to avoid conflicts
router.get('/my-jobs', protect, authorize('recruiter'), getMyJobs);

// Parameterized routes
router.get('/:id', getJobById);

// Protected routes - Recruiter only
router.post('/', protect, authorize('recruiter'), createJobValidation, createJob);
router.put('/:id', protect, authorize('recruiter'), updateJobValidation, updateJob);
router.delete('/:id', protect, authorize('recruiter'), deleteJob);

export default router;
