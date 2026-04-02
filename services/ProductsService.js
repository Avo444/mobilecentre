const RootService = require("./RootService");

class ProductsService {
    async getAllProducts(...without) {
        let products = await RootService.database("products");
        without.forEach((id) => {
            products = products.filter((product) => product.categoryID !== id);
        });
        return products;
    }

    async getProductsByCategory(id) {
        const products = await RootService.database("products");
        return products.filter((product) => product.categoryID === id);
    }
}

module.exports = ProductsService;
