require('dotenv').config();
const mongoose = require('mongoose');

const cleanupDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Clean up old contact submissions
    const contactResult = await mongoose.connection.db.collection('contactsubmissions').deleteMany({
      status: 'resolved',
      createdAt: { $lt: thirtyDaysAgo }
    });
    console.log(`Deleted ${contactResult.deletedCount} old contact submissions`);

    // Clean up old project inquiries
    const inquiryResult = await mongoose.connection.db.collection('projectinquiries').deleteMany({
      status: 'completed',
      createdAt: { $lt: thirtyDaysAgo }
    });
    console.log(`Deleted ${inquiryResult.deletedCount} old project inquiries`);

    console.log('Database cleanup completed');
    process.exit(0);

  } catch (error) {
    console.error('Database cleanup error:', error);
    process.exit(1);
  }
};

cleanupDatabase();