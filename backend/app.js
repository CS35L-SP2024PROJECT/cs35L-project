import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load environment variables
dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

console.log('NODE_ENV:', process.env.NODE_ENV); // Verify NODE_ENV
console.log('DB_URI:', process.env.DB_URI); // Verify if DB_URI is loaded

import connectDatabase from './config/dbConnect.js'; // Import after loading env

const app = express();
import productRoutes from './routes/products.js';
// Connect to the database
connectDatabase().then(client => {
  // Keep the MongoDB client for further use if needed
  app.locals.dbClient = client;

  // Import all routes
 
  app.use('/api/v1', productRoutes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`);
  });
}).catch(error => {
  console.error('Failed to start the server due to database connection error:', error);
});
