const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  getFeaturedTestimonials,
  submitTestimonial,
  approveTestimonial,
  toggleFeatured
} = require('../controllers/testimonialController');
const { validateTestimonial, handleValidationErrors } = require('../middleware/validation');
const { auth, adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', getTestimonials);
router.get('/featured', getFeaturedTestimonials);
router.post('/', validateTestimonial, handleValidationErrors, submitTestimonial);

// Admin routes
router.patch('/:id/approve', auth, adminAuth, approveTestimonial);
router.patch('/:id/feature', auth, adminAuth, toggleFeatured);

module.exports = router;