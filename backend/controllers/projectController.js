const Project = require('../models/Project');
const { createResponse } = require('../utils/helpers');

// Get all projects with filtering and pagination
const getProjects = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      featured, 
      status = 'completed',
      search 
    } = req.query;

    const skip = (page - 1) * limit;
    
    let query = { status };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'technologies': { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-challenges -solutions -results -gallery -seo -team');

    const total = await Project.countDocuments(query);

    res.json(
      createResponse(true, 'Projects retrieved successfully', {
        projects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
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
    const projects = await Project.find({ 
      featured: true, 
      status: 'completed' 
    })
    .sort({ createdAt: -1 })
    .limit(6)
    .select('title category description image technologies budget duration liveUrl caseStudyUrl');

    res.json(
      createResponse(true, 'Featured projects retrieved successfully', {
        projects
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

    const project = await Project.findOne({ slug });
    
    if (!project) {
      return res.status(404).json(
        createResponse(false, 'Project not found')
      );
    }

    res.json(
      createResponse(true, 'Project retrieved successfully', {
        project
      })
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
    const categories = await Project.distinct('category', { status: 'completed' });
    
    res.json(
      createResponse(true, 'Project categories retrieved successfully', {
        categories: ['All', ...categories]
      })
    );

  } catch (error) {
    console.error('Get project categories error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve project categories', null, error.message)
    );
  }
};

// Update project URLs (admin only)
const updateProjectUrls = async (req, res) => {
  try {
    const { id } = req.params;
    const { liveUrl, caseStudyUrl, githubUrl } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json(
        createResponse(false, 'Project not found')
      );
    }

    if (liveUrl) project.liveUrl = liveUrl;
    if (caseStudyUrl) project.caseStudyUrl = caseStudyUrl;
    if (githubUrl) project.githubUrl = githubUrl;

    await project.save();

    res.json(
      createResponse(true, 'Project URLs updated successfully', {
        project: {
          id: project._id,
          title: project.title,
          liveUrl: project.liveUrl,
          caseStudyUrl: project.caseStudyUrl,
          githubUrl: project.githubUrl
        }
      })
    );

  } catch (error) {
    console.error('Update project URLs error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to update project URLs', null, error.message)
    );
  }
};

// Create new project (admin only)
const createProject = async (req, res) => {
  try {
    const projectData = req.body;

    const project = new Project(projectData);
    await project.save();

    res.status(201).json(
      createResponse(true, 'Project created successfully', {
        project
      })
    );

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to create project', null, error.message)
    );
  }
};

module.exports = {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectCategories,
  updateProjectUrls,
  createProject
};