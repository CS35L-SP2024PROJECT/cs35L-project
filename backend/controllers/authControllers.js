import catchAsyncErrors from '../middlewares/catchAsyncErrors.js'
import User from "../models/user.js";
import ErrorHandler from '../utils/errorHandler.js';


// Register user => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, 
        email, 
        password
    });

    sendToken(user, 201, res);
});


// Login user => /api/v1/register
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //Find user in the database
    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next (new ErrorHandler('Invalid email or password', 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 200, res);

});

//logout user => /api/v1/logoout
export const logout = catchAsyncErrors(async (req, res, next) => {
    
});