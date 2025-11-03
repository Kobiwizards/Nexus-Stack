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
    enum: ['Finance', 'Healthcare', 'E-commerce', 'Education', 'Logistics', 'Health & Fitness']
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
  budget: {
    type: Number,
    required: [true, 'Budget is required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  liveUrl: {
    type: String,
    default: '#'
  },
  caseStudyUrl: {
    type: String,
    default: '#'
  },
  githubUrl: String,
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'completed', 'maintenance', 'archived'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  client: {
    name: String,
    company: String,
    website: String
  },
  team: [{
    role: String,
    member: String
  }],
  challenges: [String],
  solutions: [String],
  results: {
    description: String,
    metrics: [{
      metric: String,
      value: String,
      improvement: String
    }]
  },
  gallery: [{
    image: String,
    caption: String,
    type: {
      type: String,
      enum: ['screenshot', 'design', 'demo']
    }
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
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