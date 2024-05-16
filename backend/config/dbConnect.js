import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load environment variables
dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

const connectDatabase = async () => {
  try {
    let DB_URI = '';

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      DB_URI = process.env.DB_LOCAL_URI;
    } else if (process.env.NODE_ENV === 'PRODUCTION') {
      DB_URI = process.env.DB_URI;
    }

    if (!DB_URI) {
      throw new Error('Database connection URI is not defined.');
    }

    const client = new MongoClient(DB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    // Keep the connection open for further operations
    return client;
  } catch (error) {
    console.error(`Error connecting to the database. \n${error}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDatabase;
