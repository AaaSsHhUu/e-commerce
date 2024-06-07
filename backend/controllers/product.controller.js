const Product = require("../models/product.model");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// Create Product --Admin
exports.createProduct = async (req, res, next) => {
    req.body.madeBy = req.user._id;
    let product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

// Get all Products
exports.getAllProducts = async (req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    let products = await apiFeature.query;
    console.log("products : ",products);
    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage
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

// create new review and update review
exports.createProductReview = async(req,res,next) => {
    const {rating, comment, productId} = req.body;
    // rating should be less than 5
    if(rating > 5){
        return next(new ErrorHandler(400, "Rating should not exceed 5"));
    }
    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }

    const product = await Product.findById(productId);
    // console.log("Product : ",product);

    const isReviewed =  product.reviews.find((rev) =>{
        return (rev.user.toString() === req.user._id.toString())
    })
    // console.log("isReviewed : ",isReviewed);

    // if user is updating the review
    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating
                rev.comment = comment
            }
        })
    }
    // user is adding a new review
    else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    // Calculating new average rating
    let sum = 0;
    product.reviews.forEach((rev) => {
        sum += rev.rating;
    })

    product.avgRating = sum/(product.numOfReviews);

    const updatedProduct = await product.save({validateBeforeSave : false})

    if(!updatedProduct){
        return next(new ErrorHandler(500, "Something went wrong while updating review"));
    }
    res.status(200).json({
        success : true,
        updatedProduct
    })
}

// Get all reviews of a product
exports.getProductReviews = async (req,res,next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler(404, "Product not found"));
    }

    res.status(200).json({
        success : true,
        reviews : product.reviews
    })
}

exports.deleteReview = async (req,res,next) => {
    const {reviewId,productId} = req.query;

    const product = await Product.findById(productId);

    if(!product){
        return next(new ErrorHandler(404, "Product not found"));
    }

    const reviews = product.reviews.filter((rev) => {
        return rev._id.toString() !== reviewId.toString()
    })

    
    let sum = 0;
    reviews.forEach((rev) => {
        sum += rev.rating;
    })
    const avgRating = Number(sum/(reviews.length));
    const numOfReviews = reviews.length;
    
    const updatedReviews = await Product.findByIdAndUpdate(
        productId,
        {
            reviews,
            avgRating,
            numOfReviews
        },
        {
            new : true,
            runValidators : true
        }
    )

    if(!updatedReviews){
        return next(new ErrorHandler(500, "Something went wrong while deleting review"));
    }

    res.status(200).json({
        success : true,
        updatedReviews
    })
}