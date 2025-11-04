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
        title: "Boston Proper",
        category: "E-commerce",
        description: "Premium women's fashion e-commerce platform with sophisticated product browsing and personalized shopping experiences.",
        shortDescription: "Premium fashion e-commerce platform delivering exceptional digital shopping experiences.",
        image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&h=600&fit=crop",
        technologies: ["Next.js", "TypeScript", "Shopify", "Algolia", "AWS"],
        features: [
          "Advanced product browsing & filtering",
          "Personalized recommendations engine", 
          "Seamless checkout experience",
          "Mobile-first responsive design",
          "Integrated inventory management"
        ],
        results: [
          "Enhanced user engagement and conversion rates",
          "Streamlined inventory and order processing",
          "Improved site performance and load times"
        ],
        liveUrl: "https://www.bostonproper.com/",
        duration: "6 months",
        status: "completed",
        featured: true
      },
      {
        title: "Customer Experience Platform",
        category: "SaaS",
        description: "Enterprise SaaS platform for comprehensive customer feedback collection, real-time analytics, and actionable insights across all customer touchpoints.",
        shortDescription: "Advanced customer experience analytics platform with real-time insights.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js", "WebSocket"],
        features: [
          "Real-time feedback collection",
          "Advanced analytics dashboard",
          "Multi-channel integration",
          "Automated reporting system",
          "Team collaboration tools"
        ],
        results: [
          "Improved customer satisfaction scores",
          "Reduced response time to feedback",
          "Enhanced data-driven decision making"
        ],
        liveUrl: "#",
        duration: "8 months",
        status: "completed",
        featured: true
      },
      {
        title: "Encompass Financial Platform",
        category: "Finance",
        description: "Comprehensive financial analytics dashboard providing real-time data visualization, customizable reporting, and advanced portfolio management tools for financial institutions.",
        shortDescription: "Advanced financial analytics platform with real-time portfolio management.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
        technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "AWS"],
        features: [
          "Real-time financial data visualization",
          "Customizable reporting dashboards",
          "Advanced portfolio analytics",
          "Risk assessment tools",
          "Regulatory compliance features"
        ],
        results: [
          "Enhanced investment decision capabilities",
          "Improved regulatory compliance",
          "Streamlined financial reporting processes"
        ],
        liveUrl: "https://encompass.io/",
        duration: "9 months",
        status: "completed",
        featured: true
      },
      {
        title: "LeafWorks Healthcare Platform",
        category: "Healthcare",
        description: "Cutting-edge botanical genomics platform providing advanced scientific tools and commercial services for natural products research in the healthcare industry.",
        shortDescription: "Botanical genomics platform for advanced healthcare research.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        technologies: ["Vue.js", "Laravel", "MySQL", "Python", "Docker"],
        features: [
          "Genomic data analysis tools",
          "Research collaboration platform",
          "Scientific data visualization",
          "Regulatory compliance tracking",
          "Commercial services integration"
        ],
        results: [
          "Accelerated research and development cycles",
          "Enhanced collaboration capabilities",
          "Improved regulatory compliance tracking"
        ],
        liveUrl: "https://leafworks.com/",
        duration: "7 months",
        status: "completed",
        featured: false
      },
      {
        title: "Northeastern University Portal",
        category: "Education",
        description: "Comprehensive educational institution platform featuring advanced student management, course registration systems, and celebration features for academic milestones.",
        shortDescription: "University management platform with comprehensive student services.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
        technologies: ["React", "Express", "MongoDB", "Socket.io", "Azure"],
        features: [
          "Student information management",
          "Course registration system",
          "Academic milestone tracking",
          "Real-time notifications",
          "Faculty collaboration tools"
        ],
        results: [
          "Streamlined administrative processes",
          "Enhanced student engagement",
          "Improved academic tracking and reporting"
        ],
        liveUrl: "https://www.northeastern.edu/",
        duration: "10 months",
        status: "completed",
        featured: false
      },
      {
        title: "National Fitness Campaign App",
        category: "Health & Fitness",
        description: "Mobile fitness tracking application featuring comprehensive challenge systems, progress monitoring, and social sharing features to promote healthy lifestyle habits nationwide.",
        shortDescription: "Mobile fitness platform promoting healthy lifestyle habits.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        technologies: ["React Native", "Node.js", "MongoDB", "HealthKit", "Firebase"],
        features: [
          "Fitness challenge systems",
          "Progress tracking and analytics",
          "Social sharing capabilities",
          "Health data integration",
          "Community engagement features"
        ],
        results: [
          "Increased user engagement and retention",
          "Enhanced community participation",
          "Improved health outcome tracking"
        ],
        liveUrl: "https://www.nationalfitnesscampaign.com/",
        duration: "6 months",
        status: "completed",
        featured: false
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