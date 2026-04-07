const RootService = require("./RootService");

class CategoriesService extends RootService {
    async getAllCategories(...without) {
        let categories = await this.database("categories");
        without.forEach((item) => {
            categories = categories.filter(
                (category) => category.slug !== item,
            );
        });
        return categories;
    }

    async getCategoryBySlug(slug) {
        const categories = await this.database("categories");
        const category = categories.find((category) => category.slug === slug);
        if (!category) {
            throw new Error("Category is not found!");
        }

        return category;
    }
}

module.exports = CategoriesService;
