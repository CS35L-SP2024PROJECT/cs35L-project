import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create new Order  =>  /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  console.log('Creating a new order with request body:', req.body);
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  try {
    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxAmount,
      shippingAmount,
      totalAmount,
      paymentMethod,
      paymentInfo,
      user: req.user._id,
    });

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return next(new ErrorHandler('Failed to create order', 500));
  }
});

// Get current user orders  =>  /api/v1/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  console.log('Fetching orders for user:', req.user._id);
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return next(new ErrorHandler('Failed to fetch user orders', 500));
  }
});

// Get order details  =>  /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  console.log('Fetching order details for order ID:', req.params.id);
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    return next(new ErrorHandler('Failed to fetch order details', 500));
  }
});

// Get all orders - ADMIN  =>  /api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  console.log('Fetching all orders');
  try {
    const orders = await Order.find();

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return next(new ErrorHandler('Failed to fetch all orders', 500));
  }
});

// Update Order - ADMIN  =>  /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  console.log('Updating order ID:', req.params.id);
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }

    let productNotFound = false;

    // Update products stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product.toString());
      if (!product) {
        productNotFound = true;
        break;
      }
      product.stock = product.stock - item.quantity;
      await product.save({ validateBeforeSave: false });
    }

    if (productNotFound) {
      return next(
        new ErrorHandler("No Product found with one or more IDs.", 404)
      );
    }

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return next(new ErrorHandler('Failed to update order', 500));
  }
});

// Delete order  =>  /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  console.log('Deleting order ID:', req.params.id);
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    return next(new ErrorHandler('Failed to delete order', 500));
  }
});

async function getSalesData(startDate, endDate) {
  console.log(`Fetching sales data from ${startDate} to ${endDate}`);
  try {
    const salesData = await Order.aggregate([
      {
        // Stage 1 - Filter results
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        // Stage 2 - Group Data
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          },
          totalSales: { $sum: "$totalAmount" },
          numOrders: { $sum: 1 }, // count the number of orders
        },
      },
    ]);

    // Create a Map to store sales data and num of order by data
    const salesMap = new Map();
    let totalSales = 0;
    let totalNumOrders = 0;

    salesData.forEach((entry) => {
      const date = entry._id.date;
      const sales = entry.totalSales;
      const numOrders = entry.numOrders;

      salesMap.set(date, { sales, numOrders });
      totalSales += sales;
      totalNumOrders += numOrders;
    });

    // Generate an array of dates between start & end Date
    const datesBetween = getDatesBetween(startDate, endDate);

    // Create final sales data array with 0 for dates without sales
    const finalSalesData = datesBetween.map((date) => ({
      date,
      sales: (salesMap.get(date) || { sales: 0 }).sales,
      numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders,
    }));

    return { salesData: finalSalesData, totalSales, totalNumOrders };
  } catch (error) {
    console.error('Error fetching sales data:', error);
    throw new ErrorHandler('Failed to fetch sales data', 500);
  }
}

function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

// Get Sales Data  =>  /api/v1/admin/get_sales
export const getSales = catchAsyncErrors(async (req, res, next) => {
  console.log('Fetching sales data for period:', req.query.startDate, req.query.endDate);
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const { salesData, totalSales, totalNumOrders } = await getSalesData(
      startDate,
      endDate
    );

    res.status(200).json({
      totalSales,
      totalNumOrders,
      sales: salesData,
    });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return next(new ErrorHandler('Failed to fetch sales data', 500));
  }
});
