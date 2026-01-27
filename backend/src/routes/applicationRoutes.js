import express from 'express';
import { body } from 'express-validator';
import {
  applyForJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
  getAllApplications
} from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const applyValidation = [
  body('jobId').isMongoId().withMessage('Valid job ID is required')
];

const statusValidation = [
  body('status').isIn(['pending', 'accepted', 'rejected']).withMessage('Status must be pending, accepted, or rejected')
];

// Protected routes
router.post('/', protect, authorize('jobseeker'), applyValidation, applyForJob);
router.get('/my-applications', protect, authorize('jobseeker'), getMyApplications);
router.get('/job/:jobId', protect, authorize('recruiter'), getJobApplicants);
router.put('/:id/status', protect, authorize('recruiter'), statusValidation, updateApplicationStatus);

// Admin routes
router.get('/', protect, authorize('admin'), getAllApplications);

export default router;
