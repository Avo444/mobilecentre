const formattingBreadcrumbs = require("./formattingBreadcrumbs");

const createBreadcrumbs = (url) => {
    const urlArray = url.split("/");
    return urlArray.map((item, index) => {
        return {
            url: !index ? "/" : urlArray.slice(0, index + 1).join("/"),
            title: !item ? "Գլխավոր" : formattingBreadcrumbs(item),
        };
    });
};

module.exports = createBreadcrumbs;
