const { sendResponse } = require("../helper");
const { authSchema } = require("../schemas");

const authMiddleware = async (req, res, next) => {
    try {
        const { body } = req;
        const data = await authSchema.validateAsync(body);
        res.locals.body = data;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 500);
    }
};

module.exports = authMiddleware;
