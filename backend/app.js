import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import connectDatabase from './config/dbConnect.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';
import errorMiddleware from "./middlewares/errors.js";

// Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

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
app.use(cookieParser());

// Connect to the database
connectDatabase().then(() => {
  // Import all routes
  app.use('/api/v1', productRoutes);
  app.use('/api/v1', authRoutes);
  app.use('/api/v1', orderRoutes);

  // Using error middleware
  app.use(errorMiddleware);

  const PORT = process.env.PORT || 5001;
  const server = app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`);
  });
}).catch(error => {
  console.error('Failed to start the server due to database connection error:', error);
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
