import catchAsynErrors from '../middlewares/catchAsynErrors.js';
import Product from '../models/product.js';
import ErrorHandler from '../utils/errorHandler.js';

// Get all products => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  try {
    console.log('Fetching products...');
    const products = await Product.find();
    console.log('Products fetched successfully:', products);
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create new Product => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  try {
    console.log('Creating a new product with data:', req.body);
    const product = new Product(req.body);
    await product.save();
    console.log('Product created successfully:', product);
    res.status(200).json({
      product,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});


// Get single Product => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req?.params?.id)

    if(!product){
      return next(new ErrorHandler("Product not found", 404));
    }


    res.status(200).json({
        product,
    });

    
    // try {
    //   console.log('Creating a new product with data:', req.body);
    //   const product = new Product(req.body);
    //   await product.save();
    //   console.log('Product created successfully:', product);
    //   res.status(200).json({
    //     product,
    //   });
    // } catch (error) {
    //   console.error('Error creating product:', error);
    //   res.status(500).json({ error: 'Failed to create product' });
    // }
  });

//Update product details => /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req?.params?.id)

    if(!product){
      return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    });

    res.status(200).json({
        product,
    });
  });


  //Delete product => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req?.params?.id)

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
      message: "Product Deleted",
  });
});





