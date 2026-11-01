
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import wasteRoutes from './routes/wasteRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://local-eco-tracker.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB connection lost');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected successfully');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error.message);
});

// Database connection
const connectDB = async () => {
  if (
    !MONGO_URI ||
    MONGO_URI.includes('YOUR_MONGODB') ||
    MONGO_URI.includes('user:password')
  ) {
    throw new Error('MONGO_URI is missing or contains placeholder credentials');
  }

  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`✅ MongoDB Atlas Connected: ${mongoose.connection.host}`);
};

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/waste', wasteRoutes);

// Root verification route
app.get('/', (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1
      ? 'Connected'
      : 'Disconnected / Pending Configuration';

  res.json({
    status: 'success',
    message: '🌱 Local Eco Tracker API is running',
    database: dbStatus,
    version: '1.1.0',
    features: [
      'Authentication',
      'Eco Activities',
      'Points Engine',
      'Waste Reports',
      'Image Uploads via Multer',
    ],
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStates = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  res.json({
    status: 'healthy',
    databaseState:
      dbStates[mongoose.connection.readyState] || 'Unknown',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route Not Found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server only once, after MongoDB connects
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log('===============================================');
      console.log(`🌱 Local Eco Tracker Server is running on port ${PORT}`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`📁 Static uploads served at http://localhost:${PORT}/uploads/`);
      console.log('===============================================');
    });

    server.on('error', (error) => {
      console.error('❌ Server error:', error.message);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
