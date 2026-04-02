const fs = require("fs").promises;

const readFile = async (path) => JSON.parse(await fs.readFile(path, "utf-8"));

module.exports = readFile