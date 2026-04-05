import { showNotification } from "./notification.js";

document.addEventListener("click", (e) => {
    const button = e.target.closest(".add-to-cart");
    addToCart(button.dataset.id);
});

// buttons.forEach((btn) => {
//     btn.addEventListener("click", () => {
//         addToCart(btn.dataset.id);
//     });
// });

const getCartID = () => {
    let cartID = localStorage.getItem("cartID");
    if (!cartID) {
        cartID = window.crypto.randomUUID();
        localStorage.setItem("cartID", cartID);
    }

    return cartID;
};

const addToCart = async (id) => {
    try {
        const cartID = getCartID();
        const response = await fetch("http://localhost:3000/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, cartID }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Սխալ է տեղի ունեցել");
        }
        showNotification("Ապրանքը ավելացվել է զամբյուղում։", "success");
    } catch (error) {
        showNotification(error.message, "error");
    }
};
