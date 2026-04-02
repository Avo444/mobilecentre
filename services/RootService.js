const { readFile, createPath, updateFile } = require("../helper");

class RootService {
    static async database(file) {
        return await readFile(createPath("db", `${file}.json`))
    }

    static async save(file, data) {
        return await updateFile(file, data);
    }
}

module.exports = RootService;
