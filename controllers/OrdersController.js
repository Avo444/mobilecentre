const { sendResponse } = require("../helper");

class OrdersController {
    async addOrder(req, res) {
        try {
            const addOrder = await req.app.locals.services.orders.addOrder(
                res.locals.body,
            );
            sendResponse(res, addOrder);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    }
}

module.exports = OrdersController;
