import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    activity: {
      type: String,
      required: [true, 'Please specify an activity name'],
      trim: true,
    },
    points: {
      type: Number,
      required: true,
      min: [1, 'Points must be at least 1'],
    },
    description: {
      type: String,
      required: [true, 'Please provide an activity description'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
