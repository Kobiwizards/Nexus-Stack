const { createResponse } = require('../utils/helpers');

// Get all projects with filtering and pagination
const getProjects = async (req, res) => {
  try {
    // Return empty data since we're using static data in frontend
    res.json(
      createResponse(true, 'Projects retrieved successfully', {
        projects: [],
        pagination: {
          page: 1,
          limit: 12,
          total: 0,
          pages: 0
        }
      })
    );

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve projects', null, error.message)
    );
  }
};

// Get featured projects for homepage
const getFeaturedProjects = async (req, res) => {
  try {
    // Return empty featured projects
    res.json(
      createResponse(true, 'Featured projects retrieved successfully', {
        projects: []
      })
    );

  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve featured projects', null, error.message)
    );
  }
};

// Get single project by slug
const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Return project not found since we're using static data
    return res.status(404).json(
      createResponse(false, 'Project not found - using static data in frontend')
    );

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve project', null, error.message)
    );
  }
};

// Get project categories
const getProjectCategories = async (req, res) => {
  try {
    // Return empty categories array
    res.json(
      createResponse(true, 'Project categories retrieved successfully', {
        categories: ['All'] // Just return 'All' since we have no projects in DB
      })
    );

  } catch (error) {
    console.error('Get project categories error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve project categories', null, error.message)
    );
  }
};

// Create new project (admin only) - Keep for future use
const createProject = async (req, res) => {
  try {
    // Return message that projects are using static data
    res.status(201).json(
      createResponse(true, 'Project creation disabled - using static data in frontend', {
        project: null
      })
    );

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to create project', null, error.message)
    );
  }
};

// Update project (admin only) - Keep for future use
const updateProject = async (req, res) => {
  try {
    // Return message that projects are using static data
    res.json(
      createResponse(true, 'Project update disabled - using static data in frontend', {
        project: null
      })
    );

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to update project', null, error.message)
    );
  }
};

module.exports = {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectCategories,
  createProject,
  updateProject
};