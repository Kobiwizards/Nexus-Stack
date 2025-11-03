const nodemailer = require('nodemailer');

const emailConfig = {
  // Gmail configuration (you can change this to other providers)
  gmail: {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  },
  
  // SendGrid configuration (alternative)
  sendgrid: {
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  },
  
  // Mailgun configuration (alternative)
  mailgun: {
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_SMTP_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD
    }
  }
};

const createTransporter = (provider = 'gmail') => {
  const config = emailConfig[provider];
  if (!config) {
    throw new Error(`Email provider '${provider}' not configured`);
  }
  
  return nodemailer.createTransporter(config);
};

module.exports = {
  createTransporter,
  emailConfig
};