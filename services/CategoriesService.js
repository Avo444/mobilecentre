const RootService = require("./RootService")

class CategoriesService {
    async getAllCategories() {
        return await RootService.database("categories");
    }
}

module.exports = CategoriesService