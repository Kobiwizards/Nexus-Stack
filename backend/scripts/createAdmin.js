require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminData = {
      name: "Davis Kobira",
      email: "kobiwizards@gmail.com",
      password: "Admin123!", // Will be hashed automatically
      position: "Founder & CEO",
      role: "admin",
      bio: "Founder of Nexus Stack with expertise in software development and business strategy.",
      skills: ["Leadership", "Full-Stack Development", "AI/ML", "Business Strategy"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/daviskobira",
        github: "https://github.com/daviskobira"
      }
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = new User(adminData);
    await admin.save();
    
    console.log('Admin user created successfully:');
    console.log(`Email: ${adminData.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log('Please change the password after first login.');
    
    process.exit(0);

  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();