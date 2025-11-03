const mongoose = require('mongoose');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const User = require('../models/User');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database for seeding');

    // Clear existing data
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('Cleared existing data');

    // Seed Projects
    const projects = [
      {
        title: "Quantum Finance Platform",
        category: "Finance",
        description: "Advanced financial analytics dashboard with real-time data visualization, AI-powered insights, and customizable reporting for investment firms.",
        shortDescription: "AI-powered financial analytics platform for investment firms",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        technologies: ["Next.js", "TypeScript", "Python", "PostgreSQL", "AWS"],
        features: ["Real-time analytics", "AI predictions", "Custom reporting", "Secure transactions"],
        budget: 25000,
        duration: "16 weeks",
        liveUrl: "#",
        caseStudyUrl: "#",
        status: "completed",
        featured: true,
        client: {
          name: "Financial Innovations Inc.",
          company: "FinTech Solutions",
          website: "https://fintech-solutions.com"
        }
      },
      {
        title: "Nexus Health Portal",
        category: "Healthcare",
        description: "Comprehensive healthcare management platform for patient records, appointment scheduling, and telemedicine services.",
        shortDescription: "Healthcare management platform with telemedicine capabilities",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Twilio"],
        features: ["Patient portal", "Telemedicine", "E-prescriptions", "Analytics dashboard"],
        budget: 35000,
        duration: "20 weeks",
        liveUrl: "#",
        caseStudyUrl: "#",
        status: "completed",
        featured: true,
        client: {
          name: "HealthFirst Clinic",
          company: "Healthcare Network",
          website: "https://healthfirst.com"
        }
      }
    ];

    await Project.insertMany(projects);
    console.log('Projects seeded successfully');

    // Seed Testimonials
    const testimonials = [
      {
        clientName: "Sarah Chen",
        position: "CTO",
        company: "TechInnovate Inc.",
        rating: 5,
        testimonialText: "Nexus Stack transformed our legacy systems into a modern, scalable platform. Their expertise in AI integration helped us reduce operational costs by 40%.",
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        project: "Enterprise AI System",
        featured: true,
        approved: true,
        verification: {
          verified: true,
          verifiedAt: new Date()
        }
      },
      {
        clientName: "Marcus Johnson",
        position: "Product Director",
        company: "FinFlow Solutions",
        rating: 5,
        testimonialText: "The mobile app developed by Nexus Stack exceeded our expectations. User engagement increased by 300% in the first quarter post-launch.",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        project: "Financial Mobile App",
        featured: true,
        approved: true,
        verification: {
          verified: true,
          verifiedAt: new Date()
        }
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Testimonials seeded successfully');

    // Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@nexusstack.com' });
    if (!adminExists) {
      const adminUser = new User({
        name: "Davis Kobira",
        email: "kobiwizards@gmail.com",
        password: "admin123", // Will be hashed automatically
        position: "Founder & CEO",
        role: "admin",
        bio: "Founder of Nexus Stack with over 5 years of experience in software development and business strategy.",
        skills: ["Leadership", "Full-Stack Development", "AI/ML", "Business Strategy"],
        socialLinks: {
          linkedin: "https://linkedin.com/in/daviskobira",
          github: "https://github.com/daviskobira"
        }
      });

      await adminUser.save();
      console.log('Admin user created successfully');
    }

    console.log('Database seeding completed successfully');
    process.exit(0);

  } catch (error) {
    console.error('Database seeding error:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;