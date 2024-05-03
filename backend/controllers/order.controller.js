const Order = require("../models/order.model");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/product.model");

exports.newOrder = asyncHandler(async(req,res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt : Date.now(),
        user : req.user._id
    })

    if(!order){
        return next(new ErrorHandler(500,"Some Error Occured,Please Try again!!!"))
    }

    res.status(200).json({
        success : true,
        order
    })
})



exports.getMyOrders = asyncHandler(async (req,res,next) => {
    const order = await Order.find({user : req.user._id});
    
    if(!order){
        return next(new ErrorHandler(404,"No Order found"));
    }
    
    res.status(200).json({
        success : true,
        order
    })
})

// Admin Controllers
exports.getSingleOrder = asyncHandler(async (req,res,next) => {
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler(404,"No Order found with this Id"));
    }

    res.status(200).json({
        success : true,
        order
    })
})

exports.getAllOrders = asyncHandler(async (req,res,next) => {
    const orders = await Order.find();

    if(!orders){
        return next(new ErrorHandler(404, "No Orders Found"));
    }

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success : true,
        totalAmount,
        orders
    })
})

exports.updateOrder = asyncHandler(async(req,res,next) => {
    const order = await Order.find(req.params.id);

    if(!order){
        return next(new ErrorHandler(404, "No Orders Found"));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler(400, "Order already Delivered"));
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.Product, order.quantity);
    })

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;

    product.save({validateBeforeSave : false})
}

// Delete Order
exports.deleteOrder = asyncHandler( async (req,res,next) => {
    let id = req.params.id;

    const order = await Order.findById(id);

    if(!order){
        return next(new ErrorHandler(404, "Order not found with this id"));
    }

    await order.remove();

    res.status(200).json({
        success : true
    })
})