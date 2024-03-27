const Product = require("../models/product.model");

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
    let products = await Product.find({});
    res.status(200).json({
        success: true,
        products
    });
}

// Update product -- Admin
exports.updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            msg: "Product not found"
        })
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
