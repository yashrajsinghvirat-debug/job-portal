import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import connectDB from './config/database.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

// Load environment variables BEFORE any other code
dotenv.config();

// Initialize Express app
const app = express();

// Database connection - Connect AFTER loading env vars
connectDB();

// Middleware configuration - Order is important!
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// API Routes - All routes are registered under /api prefix
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Global API health check route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Detailed health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Job Portal API is running',
    status: 'healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Handle 404 errors - Must be registered AFTER all routes
app.use(notFound);

// Global error handler - Must be registered LAST
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
