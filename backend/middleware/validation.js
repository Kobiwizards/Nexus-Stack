const { body, validationResult } = require('express-validator');

// Validation rules for project inquiries
const validateProjectInquiry = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('service')
    .notEmpty()
    .withMessage('Service selection is required'),
  body('budget')
    .notEmpty()
    .withMessage('Budget selection is required'),
  body('projectType')
    .isArray({ min: 1 })
    .withMessage('At least one project type must be selected'),
  body('details')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Project details must be between 10 and 2000 characters')
];

// Validation rules for contact submissions
const validateContactSubmission = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters')
];

// Validation rules for testimonials
const validateTestimonial = [
  body('clientName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Client name must be between 2 and 50 characters'),
  body('position')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Position must be between 2 and 100 characters'),
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company must be between 2 and 100 characters'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('testimonialText')
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage('Testimonial must be between 50 and 1000 characters'),
  body('project')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Project name must be between 2 and 100 characters')
];

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = {
  validateProjectInquiry,
  validateContactSubmission,
  validateTestimonial,
  handleValidationErrors
};