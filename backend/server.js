const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimit');

// Route imports
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const testimonialRoutes = require('./routes/testimonials');
const serviceRoutes = require('./routes/services');

const app = express();

// Connect to database
connectDB();

// CORS configuration for production
const corsOptions = {
  origin: [
    'https://nexus-stack.onrender.com',
    'https://nexus-stack-frontend.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api/', apiLimiter);

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Nexus Stack Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    version: '1.0.0'
  });
});

// Root route - ADDED THIS
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Nexus Stack Backend API is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      projects: '/api/projects',
      testimonials: '/api/testimonials',
      services: '/api/services'
    },
    documentation: 'See /api/health for detailed API status'
  });
});

// 404 handler - MUST BE AFTER ALL ROUTES
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'GET /api/projects',
      'GET /api/testimonials',
      'POST /api/contact',
      'POST /api/services/bookings'
    ]
  });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Nexus Stack Backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});

module.exports = app;