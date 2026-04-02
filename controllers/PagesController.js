const { sendResponse, formattingBreadcrumbs } = require("../helper");

class PagesController {
    async home(req, res) {
        try {
            const categories =
                await req.app.locals.services.categories.getAllCategories();

            const phones =
                await req.app.locals.services.products.getProductsByCategory(
                    categories[0].slug,
                );

            res.render("index", { title: "Home", categories, phones });
        } catch (error) {
            sendResponse(res, error.message, 500);
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

            const urlArray = req.url.split("/");
            const breadcrumbs = urlArray.map((item) => {
                return {
                    url: item,
                    title: !item ? "Գլխավոր" : formattingBreadcrumbs(item),
                };
            });
            res.render("view", {
                title: product.title,
                product,
                category,
                breadcrumbs,
            });
        } catch (error) {
            sendResponse(res, error.message, 500);
        }
    }
}

module.exports = PagesController;
