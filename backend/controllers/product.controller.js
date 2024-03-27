const Product = require("../models/product.model");

exports.createProduct = async (req,res,next) => {
    let product = await Product.create(req.body);
    res.status(201).json({
        success : true,
        product
    })
}

exports.getAllProducts = (req,res) => {
    res.status(200).json({msg : "Root is working fine"});
}

