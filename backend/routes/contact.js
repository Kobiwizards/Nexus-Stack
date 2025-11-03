const express = require('express');
const router = express.Router();
const {
  submitContact,
  submitProjectInquiry,
  getContactSubmissions,
  updateContactStatus
} = require('../controllers/contactController');
const {
  validateContactSubmission,
  validateProjectInquiry,
  handleValidationErrors
} = require('../middleware/validation');
const { auth, adminAuth } = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimit');

// Public routes
router.post('/contact', formLimiter, validateContactSubmission, handleValidationErrors, submitContact);
router.post('/project-inquiry', formLimiter, validateProjectInquiry, handleValidationErrors, submitProjectInquiry);

// Admin routes
router.get('/submissions', auth, adminAuth, getContactSubmissions);
router.patch('/submissions/:id/status', auth, adminAuth, updateContactStatus);

module.exports = router;