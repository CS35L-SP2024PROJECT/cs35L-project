import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly specify the path to the config.env file
dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_URI:', process.env.DB_URI);
