const mongoose = require('mongoose');

const projectInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  company: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Service is required']
  },
  budget: {
    type: String,
    required: [true, 'Budget range is required']
  },
  projectType: [{
    type: String,
    required: true
  }],
  details: {
    type: String,
    required: [true, 'Project details are required']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in_progress', 'completed', 'cancelled'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'website'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: [{
    note: String,
    addedBy: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
projectInquirySchema.index({ email: 1, createdAt: -1 });
projectInquirySchema.index({ status: 1 });

module.exports = mongoose.model('ProjectInquiry', projectInquirySchema);