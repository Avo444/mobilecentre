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
        } catch (error) {
            sendResponse(res, error.message, 500);
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

            const brands = new Set(products.map((item) => item.brand));
            const pricesArray = new Set(products.map((item) => item.price));
            const minPrice = Math.min(...pricesArray);
            const maxPrice = Math.max(...pricesArray);
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

            res.render("category", {
                title: category.title,
                products,
                brands,
                prices: {
                    min: minPrice,
                    max: maxPrice,
                },
                otherParams,
            });
        } catch (error) {
            sendResponse(res, error.message, 404);
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
            sendResponse(res, error.message, 404);
        }
    }
}

module.exports = PagesController;
