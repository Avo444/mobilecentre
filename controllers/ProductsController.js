const { sendResponse } = require("../helper");

class ProductsController {
    async getAllProducts(req, res) {
        try {
            const products =
                await req.app.locals.services.products.getAllProducts();
            sendResponse(res, products);
        } catch (error) {
            sendResponse(res, error.message, 500);
        }
    }

    async getProductsByCategory(req, res) {
        try {
            const { category } = req.params;
            const products =
                await req.app.locals.services.products.getProductsByCategory(
                    category,
                );
            sendResponse(res, products);
        } catch (error) {
            sendResponse(res, error.message, 500);
        }
    }
}

module.exports = ProductsController;
