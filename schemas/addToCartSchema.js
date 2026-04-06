const Joi = require("joi");

const addToCart = Joi.object({
    id: Joi.string().required(),
    cartID: Joi.string().required(),
})
    .unknown(false)
    .required();

module.exports = addToCart;
