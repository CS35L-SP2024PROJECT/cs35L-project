import Product from '../models/product.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFilters from '../utils/apiFilters.js';


// Get all products => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const resPerPage = 4;
    console.log('Fetching products with query:', req.query);

   
    const apiFilters = new APIFilters(Product.find(), req.query).search().filter();

    apiFilters.pagination(resPerPage);

    // Log the intermediate state of the query
    console.log('APIFilters query:', apiFilters.query);

    let products = await apiFilters.query.clone();
    let filteredProductsCount = products.length;

    console.log('Products fetched successfully:', products);
    res.status(200).json({
      resPerPage,
      filteredProductsCount,
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
    req.body.user = req.user._id;

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



 //Create/Update product review => /api/v1/reviews
 export const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;


    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
  
    if(!product){
      return next(new ErrorHandler("Product not found", 404));
    }


    const isReviewed = product?.reviews?.find(
        (r) => r.user.toString() === req?.user?._id.toString()
    );

    if(isReviewed) {
        product.reviews.forEach((review) => {
            if(review?.user?.toString() === req?.user?._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
  
    product.ratings = 
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    
    await product.save({ validateBeforeSave: false});
  
    res.status(200).json({
        success: true,
    });
  });


  //Get product review => /api/v1/reviews
 export const getProductReviews = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        reviews: product.reviews,
    })
 });




 //Delete product review => /api/v1/admin/reviews
 export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.query.productId);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product?.reviews?.filter (
        (review) => review._id.toString() !== req?.query?.id.toString()
    );

    const numOfReviews = reviews.length;

    const ratings = 
        numOfReviews === 0
        ? 0
        : product.reviews.reduce((acc, item) => item.rating + acc, 0) / 
          numOfReviews;

    product = await Product.findByIdAndUpdate(
        req.query.productId,
        { reviews, numOfReviews, ratings},
        {new: true }
    );
  
    res.status(200).json({
        success: true,
        product,
    });
  });
  







