const ProductsService = require("./ProductsService");
const RootService = require("./RootService");

class CartService {
    async allCartsData() {
        return await RootService.database("cart");
    }

    async getCartByID(id) {
        const carts = await this.allCartsData();
        const cart = carts.find((cart) => cart.id === id);
        return (cart && cart.items) || [];
    }

    async getCartWithProducts(id) {
        const productsService = new ProductsService();
        const cart = await this.getCartByID(id);
 
        const data = await Promise.all(
            cart.map(async (item) => {
                const product = await productsService.getProductByID(item.id);

                return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    slug: product.slug,
                    inStock: product.inStock,
                    categorySlug: product.categorySlug,
                    count: item.count,
                };
            }),
        );
        return data;
    }

    async addCartData(data) {
        const carts = await this.allCartsData();
        let item = carts.find((cart) => cart.id === data.cartID);
        if (!item) {
            item = {
                id: data.cartID,
                items: [{ id: data.id, count: 1 }],
            };

            carts.push(item);
        } else {
            const cart = item.items.find((item) => item.id === data.id);
            if (!cart) {
                item.items.push({ id: data.id, count: 1 });
            } else {
                if (cart.count >= 10) {
                    throw new Error(
                        "Նույն ապրանքից կարող եք գնել առավելագույնը 10 հատ",
                    );
                }
                cart.count++;
            }
        }

        await RootService.save("cart", carts);
        return item;
    }

    async patchCartData(cartID, data) {
        const carts = await this.allCartsData();
        const cart = carts.find((cart) => cart.id === cartID);
        let index = cart.items.findIndex((item) => item.id === data.id);

        const productsService = new ProductsService();
        const product = await productsService.getProductByID(data.id);

        if (data.type === "increment") {
            if (cart.items[index].count >= 10) {
                throw new Error(
                    "Նույն ապրանքից կարող եք գնել առավելագույնը 10 հատ",
                );
            }
            cart.items[index].count++;
        } else if (data.type === "decrement") {
            if (cart.items[index].count <= 1) {
                throw new Error("Կարող եք գնել նվազագույնը 1 հատ");
            }
            cart.items[index].count--;
        } else {
            cart.items.splice(index, 1);
        }
        await RootService.save("cart", carts);
        return data.type === "delete"
            ? { message: "Successful" }
            : { ...cart.items[index], price: product.price };
    }

    async deleteCartData(cartID) {
        const carts = await this.allCartsData();
        const index = carts.findIndex((cart) => cart.id === cartID);
        if (index === -1) {
            throw new Error("Զամբյուղը չի գտնվել!");
        }
        carts.splice(index, 1);
        await RootService.save("cart", carts);
    }
}

module.exports = CartService;
