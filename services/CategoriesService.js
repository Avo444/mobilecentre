const RootService = require("./RootService");

class CategoriesService {
    async getAllCategories() {
        return await RootService.database("categories");
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
