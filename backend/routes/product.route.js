const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require("../controllers/product.controller");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const { validateUser, validateProduct } = require("../middleware/validation");

router.route("/products").get(asyncHandler(getAllProducts))

router.route("/product/new").post(validateProduct,asyncHandler(createProduct))

router.route("/product/:id")
    .get(asyncHandler(getProductDetail))
    .put(asyncHandler(updateProduct))
    .delete(asyncHandler(deleteProduct))

module.exports = router;