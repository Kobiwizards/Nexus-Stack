// Generate unique project IDs
const generateProjectId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `NXS-${timestamp}-${random}`.toUpperCase();
};

// Format currency
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Calculate project timeline
const calculateTimeline = (serviceType, complexity) => {
  const timelines = {
    'Custom Software Development': { low: '8-12 weeks', medium: '12-16 weeks', high: '16-20 weeks' },
    'Mobile App Development': { low: '10-14 weeks', medium: '14-18 weeks', high: '18-24 weeks' },
    'AI Automation Solutions': { low: '12-16 weeks', medium: '16-20 weeks', high: '20-26 weeks' },
    'Cloud & DevOps Solutions': { low: '6-8 weeks', medium: '8-12 weeks', high: '12-16 weeks' },
    'UI/UX Design & Branding': { low: '4-6 weeks', medium: '6-8 weeks', high: '8-10 weeks' }
  };

  return timelines[serviceType]?.[complexity] || '8-12 weeks';
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input data
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Generate response structure
const createResponse = (success, message, data = null, error = null) => {
  return {
    success,
    message,
    data,
    error,
    timestamp: new Date().toISOString()
  };
};

// Calculate budget range
const getBudgetRange = (budgetString) => {
  const ranges = {
    '$1k - $5k': { min: 1000, max: 5000 },
    '$5k - $10k': { min: 5000, max: 10000 },
    '$10k - $25k': { min: 10000, max: 25000 },
    '$25k - $50k': { min: 25000, max: 50000 },
    '$50k+': { min: 50000, max: null }
  };
  
  return ranges[budgetString] || { min: 1000, max: 5000 };
};

module.exports = {
  generateProjectId,
  formatCurrency,
  calculateTimeline,
  isValidEmail,
  sanitizeInput,
  createResponse,
  getBudgetRange
};