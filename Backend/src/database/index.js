import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGODB_URI); // <-- TEMP debug line

    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('MONGODB connection FAILED', error);
    process.exit(1);
  }
};


export default connectDB;

