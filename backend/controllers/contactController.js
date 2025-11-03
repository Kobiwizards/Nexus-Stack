const ContactSubmission = require('../models/ContactSubmission');
const ProjectInquiry = require('../models/ProjectInquiry');
const emailService = require('../utils/emailService');
const { createResponse } = require('../utils/helpers');

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, company, subject, message, phone } = req.body;

    // Create contact submission
    const contactSubmission = new ContactSubmission({
      name,
      email,
      company,
      subject,
      message,
      phone
    });

    await contactSubmission.save();

    // Send confirmation email to user
    await emailService.sendContactConfirmation({ name, email, subject, message });

    // Notify admin
    await emailService.notifyAdminAboutInquiry({ name, email, company, subject, message }, 'Contact Form');

    res.status(201).json(
      createResponse(true, 'Contact form submitted successfully', {
        id: contactSubmission._id,
        name,
        email
      })
    );

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to submit contact form', null, error.message)
    );
  }
};

// Submit project inquiry
const submitProjectInquiry = async (req, res) => {
  try {
    const { name, email, company, service, budget, projectType, details } = req.body;

    // Create project inquiry
    const projectInquiry = new ProjectInquiry({
      name,
      email,
      company,
      service,
      budget,
      projectType,
      details
    });

    await projectInquiry.save();

    // Send confirmation email to user
    await emailService.sendProjectInquiryConfirmation({
      name,
      email,
      service,
      budget,
      projectType,
      details
    });

    // Notify admin
    await emailService.notifyAdminAboutInquiry({
      name,
      email,
      company,
      service,
      budget,
      projectType,
      details
    }, 'Project Inquiry');

    res.status(201).json(
      createResponse(true, 'Project inquiry submitted successfully', {
        id: projectInquiry._id,
        name,
        email,
        service
      })
    );

  } catch (error) {
    console.error('Project inquiry submission error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to submit project inquiry', null, error.message)
    );
  }
};

// Get all contact submissions (admin only)
const getContactSubmissions = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.status = status;

    const submissions = await ContactSubmission.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-replies');

    const total = await ContactSubmission.countDocuments(query);

    res.json(
      createResponse(true, 'Contact submissions retrieved successfully', {
        submissions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      })
    );

  } catch (error) {
    console.error('Get contact submissions error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve contact submissions', null, error.message)
    );
  }
};

// Update contact submission status (admin only)
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const submission = await ContactSubmission.findById(id);
    if (!submission) {
      return res.status(404).json(
        createResponse(false, 'Contact submission not found')
      );
    }

    submission.status = status;
    
    if (note) {
      submission.replies.push({
        message: note,
        repliedBy: req.user.name || 'Admin'
      });
    }

    await submission.save();

    res.json(
      createResponse(true, 'Contact submission status updated successfully', {
        submission
      })
    );

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to update contact submission status', null, error.message)
    );
  }
};

module.exports = {
  submitContact,
  submitProjectInquiry,
  getContactSubmissions,
  updateContactStatus
};