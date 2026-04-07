const CartService = require("./CartService");
const RootService = require("./RootService");

class OrdersService extends RootService {
    async getAllOrders() {
        return await this.database("orders");
    }
    async addOrder(body) {
        const cartService = new CartService();
        const cart = await cartService.getCartByID(body.cartID);
        const orders = await this.getAllOrders();

        body.id = crypto.randomUUID();
        body.isCompleted = false;
        body.cartID = body.cartID;
        body.items = cart;

        orders.push(body);
        await this.save("orders", orders);
        await cartService.deleteCartData(body.cartID);
        return body;
    }
}

module.exports = OrdersService;
