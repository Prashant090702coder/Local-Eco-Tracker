import express from 'express';
import {
  getMyActivities,
  getActivitiesByUserId,
  addActivity,
  deleteActivity,
} from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// All activity routes require authentication
router.use(protect);

router.route('/')
  .get(getMyActivities)
  .post(upload.single('image'), addActivity);

router.route('/:id')
  .delete(deleteActivity);

router.route('/user/:userId')
  .get(getActivitiesByUserId);

export default router;
