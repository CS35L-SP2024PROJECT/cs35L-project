import mongoose from 'mongoose';

const DB_URI = 'mongodb+srv://mohammedhnshaik:hameed123@cs35lproject.jog0ngu.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=cs35LProject';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  ratings: Number,
  images: Array,
  category: String,
  seller: String,
  stock: Number,
  numOfReviews: Number
});

const Product = mongoose.model('Product', productSchema);

mongoose.set('debug', true);

mongoose.connect(DB_URI, {
  bufferCommands: false,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
  .then(async () => {
    console.log('MongoDB connected');

    try {
      const product = new Product({
        name: 'SanDisk Ultra 128GB SDXC UHS-I Memory Card up to 80MB/s',
        price: 45.89,
        description: 'Ultra-fast cards (2) to take better pictures and Full HD videos (1) with your compact to mid-range point-and-shoot cameras and camcorders. With SanDisk Ultra SDXC UHS-I cards you’ll benefit from faster downloads, high capacity, and better performance to capture and store 128GB (5) of high quality pictures and Full HD video (1). Take advantage of ultra-fast read speeds of up to 80MB/s (3) to save time moving photos and videos from the card to your computer. From a leader in flash memory storage, SanDisk Ultra SDXC UHS-I cards are compatible with SDHC and SDXC digital devices, and come with a 10-year limited warranty (6).',
        ratings: 4.5,
        images: [],
        category: 'Electronics',
        seller: 'Ebay',
        stock: 50,
        numOfReviews: 32
      });

      await product.save();
      console.log('Product inserted successfully');
    } catch (error) {
      console.error('Error inserting product:', error);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });