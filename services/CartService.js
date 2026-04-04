const RootService = require("./RootService");

class CartService {
    async allCartsData() {
        return await RootService.database("cart");
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
}

module.exports = CartService;
