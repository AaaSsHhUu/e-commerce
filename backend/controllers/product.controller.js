const Product = require("../models/product.model");
const ApiFeatures = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// Create Product --Admin
exports.createProduct = async (req, res, next) => {
    let product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

// Get all Products
exports.getAllProducts = async (req, res) => {
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter();
    let products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products
    });
}

// Get a single product details
exports.getProductDetail = async (req,res,next) => {
        let product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler(400,"Product not found"))
        }
        res.status(200).json({success : true, product})
}

// Update product -- Admin
exports.updateProduct = async (req, res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(400,"Product not found"))
    }

    try{
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            success: true,
            product
        })
    }catch(err){
        res.status(500).json({success : false, error : err})
    }
}

//  Delete Produce --Admin
exports.deleteProduct = async (req,res,next)=>{
    const product = await Product.findByIdAndDelete(req.params.id,{new : true});

    if(!product){
        return res.status(400).json({success : false, msg : "Product not found"})
    }
    res.status(200).json({success : true, msg : "Product Removed Successfully", product});
}