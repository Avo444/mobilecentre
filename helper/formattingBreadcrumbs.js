const formattingBreadcrumbs = (text) => {
    let breadcrumb = text.split("-");
    breadcrumb = breadcrumb.map((item) => {
        item = item.split("");

        const index = item.findIndex((item) => item === "?");
        item = item.slice(0, index);
        item[0] = item[0].toUpperCase();
        item = item.join("");

        return item;
    });

    return breadcrumb.join(" ");
};

module.exports = formattingBreadcrumbs;
