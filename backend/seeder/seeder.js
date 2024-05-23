import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product.js';
import products from './data.js'; // Adjust the import path based on your structure

dotenv.config({ path: 'backend/config/config.env' });

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    await connectDatabase();
    await Product.deleteMany();
    console.log('Products deleted');

    await Product.insertMany(products);
    console.log('All products added');

    process.exit();
  } catch (error) {
    console.error('Error with seeder:', error);
    process.exit(1);
  }
};

seedProducts();