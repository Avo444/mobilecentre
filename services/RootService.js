const { readFile, createPath, updateFile } = require("../helper");

class RootService {
    async database(file) {
        return await readFile(createPath("db", `${file}.json`))
    }

    async save(file, data) {
        return await updateFile(file, data);
    }
}

module.exports = RootService;
