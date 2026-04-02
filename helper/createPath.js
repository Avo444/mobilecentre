const path = require("path");

const createPath = (...arr) => path.join(__dirname, "..", ...arr);

module.exports = createPath;
