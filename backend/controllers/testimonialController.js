const Testimonial = require('../models/Testimonial');
const { createResponse } = require('../utils/helpers');

// Get all testimonials
const getTestimonials = async (req, res) => {
  try {
    const { featured, approved = true } = req.query;

    let query = { approved };
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    const testimonials = await Testimonial.find(query)
      .sort({ featured: -1, rating: -1, createdAt: -1 });

    res.json(
      createResponse(true, 'Testimonials retrieved successfully', {
        testimonials
      })
    );

  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve testimonials', null, error.message)
    );
  }
};

// Get featured testimonials for homepage
const getFeaturedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ 
      featured: true, 
      approved: true 
    })
    .sort({ rating: -1, createdAt: -1 })
    .limit(4);

    res.json(
      createResponse(true, 'Featured testimonials retrieved successfully', {
        testimonials
      })
    );

  } catch (error) {
    console.error('Get featured testimonials error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve featured testimonials', null, error.message)
    );
  }
};

// Submit new testimonial
const submitTestimonial = async (req, res) => {
  try {
    const { clientName, position, company, rating, testimonialText, project, socialLinks } = req.body;

    const testimonial = new Testimonial({
      clientName,
      position,
      company,
      rating,
      testimonialText,
      project,
      socialLinks,
      approved: false // Requires admin approval
    });

    await testimonial.save();

    res.status(201).json(
      createResponse(true, 'Testimonial submitted successfully and awaiting approval', {
        id: testimonial._id
      })
    );

  } catch (error) {
    console.error('Submit testimonial error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to submit testimonial', null, error.message)
    );
  }
};

// Approve testimonial (admin only)
const approveTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json(
        createResponse(false, 'Testimonial not found')
      );
    }

    testimonial.approved = true;
    testimonial.verification.verified = true;
    testimonial.verification.verifiedBy = req.user.id;
    testimonial.verification.verifiedAt = new Date();

    await testimonial.save();

    res.json(
      createResponse(true, 'Testimonial approved successfully', {
        testimonial
      })
    );

  } catch (error) {
    console.error('Approve testimonial error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to approve testimonial', null, error.message)
    );
  }
};

// Toggle testimonial featured status (admin only)
const toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json(
        createResponse(false, 'Testimonial not found')
      );
    }

    testimonial.featured = !testimonial.featured;
    await testimonial.save();

    res.json(
      createResponse(true, `Testimonial ${testimonial.featured ? 'featured' : 'unfeatured'} successfully`, {
        testimonial: {
          id: testimonial._id,
          featured: testimonial.featured
        }
      })
    );

  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to toggle featured status', null, error.message)
    );
  }
};

module.exports = {
  getTestimonials,
  getFeaturedTestimonials,
  submitTestimonial,
  approveTestimonial,
  toggleFeatured
};