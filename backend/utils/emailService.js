const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // nexusstackcompanyltd@gmail.com
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send project inquiry confirmation
  async sendProjectInquiryConfirmation(inquiryData) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: inquiryData.email,
      subject: 'Thank You for Your Project Inquiry - Nexus Stack',
      html: this.generateProjectInquiryTemplate(inquiryData)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Project inquiry confirmation email sent');
    } catch (error) {
      console.error('Error sending project inquiry email:', error);
      throw error;
    }
  }

  // Send contact form confirmation
  async sendContactConfirmation(contactData) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: 'Thank You for Contacting Nexus Stack',
      html: this.generateContactTemplate(contactData)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Contact confirmation email sent');
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw error;
    }
  }

  // Notify admin about new inquiry
  async notifyAdminAboutInquiry(inquiryData, type) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'nexusstackcompanyltd@gmail.com', // Default to new email
      subject: `New ${type} Submission - Nexus Stack`,
      html: this.generateAdminNotificationTemplate(inquiryData, type)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Admin notification email sent');
    } catch (error) {
      console.error('Error sending admin notification email:', error);
      throw error;
    }
  }

  // Email templates
  generateProjectInquiryTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .footer { background: #333; color: white; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nexus Stack</h1>
            <p>Thank You for Your Project Inquiry</p>
          </div>
          <div class="content">
            <h2>Hello ${data.name},</h2>
            <p>We've received your project inquiry and our team will review it within 2 hours.</p>
            <h3>Project Details:</h3>
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Budget:</strong> ${data.budget}</p>
            <p><strong>Project Type:</strong> ${data.projectType?.join(', ') || 'Not specified'}</p>
            <p><strong>Message:</strong> ${data.details}</p>
            <p>We'll be in touch soon to discuss your project in more detail.</p>
            <p>Best regards,<br>The Nexus Stack Team</p>
          </div>
          <div class="footer">
            <p>Nexus Stack &copy; ${new Date().getFullYear()}</p>
            <p>Email: nexusstackcompanyltd@gmail.com | Phone: +1 (980) 419-2691</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateContactTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .footer { background: #333; color: white; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nexus Stack</h1>
            <p>Thank You for Contacting Us</p>
          </div>
          <div class="content">
            <h2>Hello ${data.name},</h2>
            <p>We've received your message and will get back to you within 2 hours.</p>
            <h3>Your Message:</h3>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong> ${data.message}</p>
            <p>We look forward to helping you with your project!</p>
            <p>Best regards,<br>The Nexus Stack Team</p>
          </div>
          <div class="footer">
            <p>Nexus Stack &copy; ${new Date().getFullYear()}</p>
            <p>Email: nexusstackcompanyltd@gmail.com | Phone: +1 (980) 419-2691</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateAdminNotificationTemplate(data, type) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .urgent { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New ${type} Submission</h1>
            <p>Action Required</p>
          </div>
          <div class="content">
            <div class="urgent">
              <strong>URGENT:</strong> New ${type} requires attention within 2 hours.
            </div>
            <h3>Submission Details:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
            ${type === 'Project Inquiry' ? `
              <p><strong>Service:</strong> ${data.service}</p>
              <p><strong>Budget:</strong> ${data.budget}</p>
              <p><strong>Project Type:</strong> ${data.projectType?.join(', ') || 'Not specified'}</p>
            ` : `
              <p><strong>Subject:</strong> ${data.subject}</p>
            `}
            <p><strong>Message:</strong> ${data.details || data.message}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p>Please respond within 2 hours as promised on our website.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();