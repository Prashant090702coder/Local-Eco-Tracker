import mongoose from 'mongoose';

const wasteReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true,
    },
    wasteType: {
      type: String,
      required: [true, 'Please select a waste type'],
      enum: [
        'Plastic',
        'Garbage',
        'E-Waste',
        'Glass',
        'Construction Waste',
        'Other',
      ],
    },
    location: {
      type: String,
      required: [true, 'Please specify the location of the waste problem'],
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide details or a description of the issue'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
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

const WasteReport = mongoose.model('WasteReport', wasteReportSchema);

export default WasteReport;
