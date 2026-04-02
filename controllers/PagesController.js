class PagesController {
    async home(req, res) {
        const categories = await req.app.locals.services.categories.getAllCategories();
        const phones = await req.app.locals.services.products.getProductsByCategory("1");
        
        res.render("index", {title: "Home", categories, phones})
    }
}

module.exports = PagesController