const Joi = require("joi");


const productSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().required(),
    price: Joi.number().max(10000000, "Price cannot exceed 1cr").required(),
    rating: Joi.number().default(0),
    image: Joi.array().items(
        Joi.object({
            public_id: Joi.string().required(),
            url: Joi.string().required()
        })
    ),
    category: Joi.string().required(),
    stock: Joi.number().max(9999).default(1),
    numOfReviews: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            rating: Joi.number().max(5).required(),
            comment: Joi.string().required()
        })
    )
})

const userSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    avatar: Joi.object({
        public_id: Joi.string().required(),
        url: Joi.string().required()
    }),
    role: Joi.string().default("user"),
    resetPasswordToken: Joi.string(),
    resetPasswordExpire: Joi.date()
})


module.exports = { productSchema, userSchema }