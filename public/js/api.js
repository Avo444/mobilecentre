import { showNotification } from "./notification.js";
const cartID = localStorage.getItem("cartID");

export const getCartData = async () => {
    try {
        if (!cartID) {
            cartContent.textContent = "Դատարկ է";
        }
        const response = await fetch(
            `http://localhost:3000/api/cart/${cartID}`,
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        showNotification(error.message, "error");
    }
};

export const aparikInfo = async (obj) => {
    try {
        const cartID = localStorage.getItem("cartID");
        const response = await fetch(`http://localhost:3000/api/bank/aparik`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: obj,
                cartID,
            }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        showNotification(error.message, "error");
    }
};

export const getBanks = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/bank`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        showNotification(error.message, "error");
    }
};
