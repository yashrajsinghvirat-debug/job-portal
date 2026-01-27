import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if MongoDB URI is provided
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is missing. Please set MONGODB_URI in your .env file');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    
    // Exit process with failure if database connection fails
    if (error.message.includes('MongoDB URI is missing')) {
      console.error('Please create a .env file with MONGODB_URI variable');
      console.error('Example: MONGODB_URI=mongodb://localhost:27017/job-portal');
    }
    
    process.exit(1);
  }
};

export default connectDB;
