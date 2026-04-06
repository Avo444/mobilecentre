const { sendResponse } = require("../helper");

class CartController {
    async getCartData(req, res) {
        try {
            const data = await req.app.locals.services.cart.getCartByID(
                req.body.id,
            );
            sendResponse(res, data);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    }

    async getCartWithProducts(req, res) {
        try {
            const { id } = req.params;
            const data =
                await req.app.locals.services.cart.getCartWithProducts(id);
            sendResponse(res, data);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    }

    async addCartData(req, res) {
        try {
            const data = await req.app.locals.services.cart.addCartData(
                req.body,
            );
            sendResponse(res, data, 201);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    }

    async patchCartData(req, res) {
        try {
            const { body } = req;
            const { id } = req.params;
            const isChanged = await req.app.locals.services.cart.patchCartData(
                id,
                body,
            );

            sendResponse(res, isChanged);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    }
}

module.exports = CartController;
