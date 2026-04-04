const { sendResponse } = require("../helper");
const addToCart = require("../schemas/addToCartSchema");

const addToCartMiddleware = async (req, res, next) => {
    try {
        console.log(req.body);
        const body = await addToCart.validateAsync(req.body);
        res.locals.body = body;
        next();
    } catch (error) {
        sendResponse(res, error, 400);
    }
};

module.exports = addToCartMiddleware;
