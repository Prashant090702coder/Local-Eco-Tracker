import express from 'express';
import WasteReport from '../models/WasteReport.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// @desc    Submit a new community waste report (supports optional image)
// @route   POST /api/waste
// @access  Public (or with optional token)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { wasteType, location, description, userId } = req.body;

    if (!wasteType || !location || !description) {
      return res.status(400).json({
        message: 'Please provide waste type, location, and description.',
      });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : (req.body.image || '');

    const report = await WasteReport.create({
      wasteType,
      location: location.trim(),
      description: description.trim(),
      userId: userId || null,
      image: imagePath,
    });

    return res.status(201).json({
      message: 'Waste report submitted successfully to the community registry.',
      report,
    });
  } catch (error) {
    console.error('Error submitting waste report:', error);
    return res.status(500).json({
      message: 'Failed to submit waste report.',
      error: error.message,
    });
  }
});

// @desc    Get all community waste reports
// @route   GET /api/waste
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reports = await WasteReport.find().sort({ createdAt: -1 }).limit(50);
    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error('Error fetching waste reports:', error);
    return res.status(500).json({
      message: 'Failed to retrieve waste reports.',
      error: error.message,
    });
  }
});

export default router;
