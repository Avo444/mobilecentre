const createPath = require("./createPath");

const fs = require("fs").promises;

const updateFile = async (file, data) =>
    await fs.writeFile(
        createPath("db", `${file}.json`),
        JSON.stringify(data, null, 4),
    );

module.exports = updateFile;
