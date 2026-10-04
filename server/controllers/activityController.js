import Activity from '../models/Activity.js';
import User from '../models/User.js';

// Predefined Eco Activities and official server-controlled points mapping
export const ECO_ACTIVITY_POINTS = {
  'Planted a Tree': 20,
  'Recycled Plastic': 10,
  'Cycled to College': 15,
  'Used Public Transport': 10,
  'Used Reusable Bottle': 5,
  'Saved Electricity': 5,
  'Avoided Single-Use Plastic': 10,
};

// @desc    Get all activities for logged in user
// @route   GET /api/activities
// @access  Private
export const getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    const user = await User.findById(req.user._id);

    return res.status(200).json({
      success: true,
      count: activities.length,
      ecoPoints: user ? user.ecoPoints : 0,
      activities,
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return res.status(500).json({
      message: 'Failed to retrieve activities.',
      error: error.message,
    });
  }
};

// @desc    Get activities for specific user ID
// @route   GET /api/activities/:userId
// @access  Private
export const getActivitiesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await Activity.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    console.error('Error fetching user activities:', error);
    return res.status(500).json({
      message: 'Failed to retrieve user activities.',
      error: error.message,
    });
  }
};

// @desc    Add a new eco activity (supports optional image upload)
// @route   POST /api/activities
// @access  Private
export const addActivity = async (req, res) => {
  try {
    const { activity, description } = req.body;

    if (!activity || !description) {
      return res.status(400).json({
        message: 'Please provide both activity title and description.',
      });
    }

    // Verify activity is valid and calculate points securely on the server
    const pointsAwarded = ECO_ACTIVITY_POINTS[activity];
    if (!pointsAwarded) {
      return res.status(400).json({
        message: 'Invalid activity type selected.',
      });
    }

    // Process uploaded image file if present
    const imagePath = req.file ? `/uploads/${req.file.filename}` : (req.body.image || '');

    // 1. Create activity record
    const newActivity = await Activity.create({
      userId: req.user._id,
      activity,
      points: pointsAwarded,
      description: description.trim(),
      image: imagePath,
    });

    // 2. Increment user's ecoPoints
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.ecoPoints = (user.ecoPoints || 0) + pointsAwarded;
    await user.save();

    return res.status(201).json({
      message: `Activity recorded successfully! You earned +${pointsAwarded} Eco Points.`,
      activity: newActivity,
      totalEcoPoints: user.ecoPoints,
    });
  } catch (error) {
    console.error('Error adding activity:', error);
    return res.status(500).json({
      message: 'Failed to record activity.',
      error: error.message,
    });
  }
};

// @desc    Delete an activity
// @route   DELETE /api/activities/:id
// @access  Private
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found.' });
    }

    // Verify ownership
    if (activity.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'You are not authorized to delete this activity.',
      });
    }

    // Deduct points from user
    const pointsToDeduct = activity.points || 0;
    const user = await User.findById(req.user._id);
    if (user) {
      user.ecoPoints = Math.max(0, (user.ecoPoints || 0) - pointsToDeduct);
      await user.save();
    }

    await Activity.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Activity removed and Eco Points updated.',
      totalEcoPoints: user ? user.ecoPoints : 0,
    });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return res.status(500).json({
      message: 'Failed to delete activity.',
      error: error.message,
    });
  }
};
