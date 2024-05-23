import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDatabase from './config/dbConnect.js';
import productRoutes from './routes/products.js';

// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load environment variables
dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

console.log('NODE_ENV:', process.env.NODE_ENV); // Verify NODE_ENV
console.log('DB_URI:', process.env.DB_URI); // Verify if DB_URI is loaded

// Mongoose debug mode
mongoose.set('debug', true);

const app = express();
app.use(express.json());

// Connect to the database
connectDatabase().then(() => {
  // Import all routes
  app.use('/api/v1', productRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`);
  });
}).catch(error => {
  console.error('Failed to start the server due to database connection error:', error);
});