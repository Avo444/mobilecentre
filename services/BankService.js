const CartService = require("./CartService");
const RootService = require("./RootService");

class BankService {
    async getAllBanks() {
        const banks = await RootService.database("banks");
        return banks;
    }

    async getBank(id) {
        const banks = await this.getAllBanks();
        return banks.find((bank) => bank.id === id);
    }

    async getAparik(body) {
        const { cartID, data } = body;

        if (!cartID && data.id === "all") {
            throw new Error("Զամբյուղը դատարկ է");
        }

        const months = data.months ? +data.months : 6;
        const bank = await this.getBank(data.bank);

        if (data.id === "all") {
            const cartService = new CartService();
            const cart = await cartService.getCartWithProducts(cartID);

            const title = cart.map((item) => item.title).join(", ");
            const downPrice = data.money ? +data.money : 0;
            const monthlyRate = bank.procent / 100 / 12;

            const priceList = [];

            let totalPrice = cart.reduce(
                (acc, item) => acc + item.price * item.count,
                0,
            );

            let remaining = totalPrice - downPrice;
            const monthlyPrincipal = remaining / months;
            
            let totalInterest = 0;
            let totalPrincipal = 0;
            
            for (let month = 1; month <= months; month++) {
                const currentInterest = remaining * monthlyRate;
                const total = currentInterest + monthlyPrincipal;
                
                totalInterest += currentInterest;
                totalPrincipal += monthlyPrincipal;
                
                priceList.push({
                    month,
                    interest: +currentInterest.toFixed(2),
                    principal: +monthlyPrincipal.toFixed(2),
                    total: +total.toFixed(2),
                });
                
                remaining -= monthlyPrincipal;
            }
            
            const finalTotalPrice = totalPrincipal + totalInterest;

            return {
                title,
                months,
                priceList,
                totalPrice: +finalTotalPrice.toFixed(),
                totalInterest: +totalInterest.toFixed(2),
                totalPrincipal: +totalPrincipal.toFixed(2),
            };
        }

        return { mes: "adsn" };
    }
}

module.exports = BankService;
