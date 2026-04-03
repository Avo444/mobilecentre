const RootService = require("./RootService");

class CategoriesService {
    async getAllCategories(...without) {
        let categories =  await RootService.database("categories");
        without.forEach((item) => {
            categories = categories.filter((category) => category.slug !== item);
        })
        return categories
    }

    async getCategoryBySlug(slug) {
        const categories = await RootService.database("categories");
        const category = categories.find((category) => category.slug === slug);
        if (!category) {
            throw new Error("Category is not found!");
        }

        return category;
    }
}

module.exports = CategoriesService;
