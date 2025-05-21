import dotenv from 'dotenv'
import connectDB from './database/index.js';
import { app } from './app.js';

dotenv.config({
    path: './env'
})

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
