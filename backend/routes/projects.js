const express = require('express');
const router = express.Router();
const {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectCategories,
  createProject
  // updateProjectUrls temporarily removed until needed
} = require('../controllers/projectController');
const { auth, adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/categories', getProjectCategories);
router.get('/:slug', getProjectBySlug);

// Admin routes
router.post('/', auth, adminAuth, createProject);
// router.patch('/:id/urls', auth, adminAuth, updateProjectUrls); // Temporarily removed

module.exports = router;