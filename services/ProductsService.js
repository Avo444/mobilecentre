const RootService = require("./RootService");

class ProductsService {
    async getAllProducts(...without) {
        let products = await RootService.database("products");
        without.forEach((id) => {
            products = products.filter((product) => product.categoryID !== id);
        });
        return products;
    }

    async getProductsByCategory(slug) {
        const products = await RootService.database("products");
        return products.filter((product) => product.categorySlug === slug);
    }
    async getProductByID(id) {
        const products = await RootService.database("products");
        const product = products.find((product) => product.id === id);
        if (!product) {
            throw new Error("Product is not found!");
        }

        return product;
    }
    async getProductBySlug(slug) {
        const products = await RootService.database("products");
        const product = products.find((product) => product.slug === slug);
        if (!product) {
            throw new Error("Product is not found!");
        }

        return product;
    }

    async filterProductsWithout(...categorySlug) {
        let products = await RootService.database("products");
        categorySlug.forEach((category) => {
            products = products.filter(
                (product) => product.categorySlug !== category,
            );
        });
        return products;
    }

    async getParams(categorySlug) {
        const products = await this.getProductsByCategory(categorySlug);
        const brands = new Set(products.map((item) => item.brand));
        const otherParams = products.reduce((acc, product) => {
            product.params.forEach((item) => {
                let group = acc.find((p) => p.title === item.title);
                
                if (!group) {
                    group = {
                        title: item.title,
                        values: new Set(),
                    };
                    acc.push(group);
                }
                
                group.values.add(item.desc);
            });
            return acc;
        }, []);
        otherParams.unshift({ title: "Բրենդեր", values: brands });


        return otherParams;
    }
}

module.exports = ProductsService;
