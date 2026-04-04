const { sendResponse } = require("../helper");

class CartController {
    async addCartData(req, res) {
        try {
            const data = await req.app.locals.services.cart.addCartData(req.body);
            sendResponse(res, data, 201);
        } catch (error) {
            sendResponse(res, { error: error.message }, 500);
        }
    }
}

module.exports = CartController;
