const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['E-commerce', 'SaaS', 'Finance', 'Healthcare', 'Education', 'Health & Fitness']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  image: {
    type: String,
    required: [true, 'Project image is required']
  },
  technologies: [{
    type: String,
    required: true
  }],
  features: [{
    type: String,
    required: true
  }],
  results: [{
    type: String,
    required: true
  }],
  liveUrl: {
    type: String,
    required: [true, 'Live URL is required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'completed', 'maintenance', 'archived'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ slug: 1 });
projectSchema.index({ category: 1, featured: -1 });
projectSchema.index({ status: 1, createdAt: -1 });

// Pre-save middleware to generate slug
projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);