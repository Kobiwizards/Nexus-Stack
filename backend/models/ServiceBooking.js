const mongoose = require('mongoose');

const serviceBookingSchema = new mongoose.Schema({
  clientInfo: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    company: String,
    phone: String
  },
  serviceType: {
    type: String,
    required: true,
    enum: [
      'Custom Software Development',
      'Mobile App Development', 
      'AI Automation Solutions',
      'Cloud & DevOps Solutions',
      'UI/UX Design & Branding'
    ]
  },
  package: {
    type: String,
    required: true,
    enum: ['starter', 'professional', 'enterprise', 'custom']
  },
  projectDetails: {
    title: String,
    description: String,
    timeline: String,
    technologies: [String],
    specificRequirements: String
  },
  payment: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    stripePaymentId: String,
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    invoiceUrl: String
  },
  status: {
    type: String,
    enum: ['inquiry', 'quoted', 'approved', 'in_progress', 'completed', 'cancelled'],
    default: 'inquiry'
  },
  assignedTeam: [{
    role: String,
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  milestones: [{
    title: String,
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'delayed'],
      default: 'pending'
    },
    completedAt: Date
  }],
  communications: [{
    type: {
      type: String,
      enum: ['email', 'call', 'meeting', 'note']
    },
    summary: String,
    details: String,
    date: {
      type: Date,
      default: Date.now
    },
    participants: [String]
  }]
}, {
  timestamps: true
});

// Index for better query performance
serviceBookingSchema.index({ 'clientInfo.email': 1 });
serviceBookingSchema.index({ status: 1, createdAt: -1 });
serviceBookingSchema.index({ 'payment.status': 1 });

module.exports = mongoose.model('ServiceBooking', serviceBookingSchema);