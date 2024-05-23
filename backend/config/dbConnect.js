import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load environment variables
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      bufferCommands: false, // Disable buffer commands
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });

    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error(`Error connecting to the database. \n${error}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDatabase;