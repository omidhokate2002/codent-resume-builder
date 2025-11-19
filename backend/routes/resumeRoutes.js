import express from 'express';
import {
  getUserResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  getPublicResumes
} from '../controllers/resumeController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/public', optionalAuth, getPublicResumes);

// Protected routes
router.use(protect); // Apply auth middleware to all routes below

router.route('/')
  .get(getUserResumes)
  .post(createResume);

router.route('/:id')
  .get(getResume)
  .put(updateResume)
  .delete(deleteResume);

router.post('/:id/duplicate', duplicateResume);

export default router;

