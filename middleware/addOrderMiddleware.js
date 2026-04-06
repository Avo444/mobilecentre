const { sendResponse } = require("../helper");
const { addOrderSchema } = require("../schemas");

const addOrderMiddleware = async (req, res, next) => {
    try {
        const body = await addOrderSchema.validateAsync(req.body);
        res.locals.body = body;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 500);
    }
};

module.exports = addOrderMiddleware;
