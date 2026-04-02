const formattingBreadcrumbs = (text) => {
    let breadcrumb = text.split("-");
    breadcrumb = breadcrumb.map((item) => {
        item = item.split("");
        item[0] = item[0].toUpperCase();
        item = item.join("");

        return item;
    });

    return breadcrumb.join(" ");
};

module.exports = formattingBreadcrumbs;
