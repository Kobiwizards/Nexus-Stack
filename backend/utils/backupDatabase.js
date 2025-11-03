const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const backupDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const models = {
      Project: require('../models/Project'),
      Testimonial: require('../models/Testimonial'),
      ContactSubmission: require('../models/ContactSubmission'),
      ProjectInquiry: require('../models/ProjectInquiry'),
      ServiceBooking: require('../models/ServiceBooking'),
      User: require('../models/User')
    };

    const backupData = {};
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    for (const [modelName, Model] of Object.entries(models)) {
      const data = await Model.find({});
      backupData[modelName] = data;
    }

    const backupDir = path.join(__dirname, '../../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupFile = path.join(backupDir, `backup-${timestamp}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));

    console.log(`Database backup created: ${backupFile}`);
    process.exit(0);

  } catch (error) {
    console.error('Backup error:', error);
    process.exit(1);
  }
};

module.exports = backupDatabase;