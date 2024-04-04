const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string().required(),
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
