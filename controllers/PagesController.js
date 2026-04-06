const { sendResponse, createBreadcrumbs } = require("../helper");

class PagesController {
    async home(req, res) {
        try {
            const categories =
                await req.app.locals.services.categories.getAllCategories();

            const phones =
                await req.app.locals.services.products.getProductsByCategory(
                    categories[0].slug,
                );

            const allProducts =
                await req.app.locals.services.products.filterProductsWithout(
                    "phones",
                );

            res.render("index", {
                title: "Home",
                categories,
                phones,
                allProducts,
            });
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 404);
        }
    }

    async category(req, res) {
        try {
            const { categorySlug } = req.params;
            const category =
                await req.app.locals.services.categories.getCategoryBySlug(
                    categorySlug,
                );

            const products =
                await req.app.locals.services.products.getProductsByCategory(
                    categorySlug,
                );

            const pricesArray = new Set(products.map((item) => item.price));
            const minPrice = Math.min(...pricesArray);
            const maxPrice = Math.max(...pricesArray);
            const params =
                await req.app.locals.services.products.getParams(categorySlug);

            const breadcrumbs = createBreadcrumbs(req.url);
            res.render("category", {
                title: category.title,
                prices: {
                    min: minPrice,
                    max: maxPrice,
                },
                breadcrumbs,
                params,
            });
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 404);
        }
    }

    async viewProduct(req, res) {
        try {
            const { categorySlug, productSlug } = req.params;
            const product =
                await req.app.locals.services.products.getProductBySlug(
                    productSlug,
                );
            if (categorySlug !== product.categorySlug) {
                return res.redirect("/");
            }

            const category =
                await req.app.locals.services.categories.getCategoryBySlug(
                    categorySlug,
                );

            const breadcrumbs = createBreadcrumbs(req.url);
            res.render("view", {
                title: product.title,
                product,
                category,
                breadcrumbs,
            });
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 404);
        }
    }

    async cart(req, res) {
        try {
            const breadcrumbs = createBreadcrumbs(req.url);
            res.render("cart", { title: "Զամբյուղ", breadcrumbs });
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 404);
        }
    }

    async search(req, res) {
        try {
            const { searchData } = req.query;
            const title = `Որոնման արդյունք՝ ${searchData}`;
            const products =
                await req.app.locals.services.products.getProductsBySearch(
                    searchData,
                );
            res.render("search", { title, products });
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 404);
        }
    }
}

module.exports = PagesController;
