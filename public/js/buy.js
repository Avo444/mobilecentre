import { addOrder } from "./api.js";
import { showNotification } from "./notification.js";

const buyForm = document.getElementById("buy__form");
const buyBtn = document.getElementById("buy__btn");

buyForm.addEventListener("change", (e) => {
    e.preventDefault();
    const form = new FormData(buyForm);
    const data = Object.fromEntries(form.entries());

    if (data.name && data.phone && data.country) {
        buyBtn.disabled = false;
    } else buyBtn.disabled = true;
});
buyForm.onsubmit = async (e) => {
    try {
        e.preventDefault();
        const form = new FormData(buyForm);
        const data = Object.fromEntries(form.entries());

        if (data.name.trim().length < 3) {
            showNotification("Անունը պետք է պարունակի առնվազն 3 տառ", "error");
        } else if (!/^[0-9+() -]{6,}$/.test(data.phone.trim())) {
            showNotification("Սխալ հեռախոսահամար", "error");
        } else if (!data.country) {
            showNotification("Խնդրում ենք նշել բնակավայրը", "error");
        }

        const result = await addOrder(data);
        showNotification("Պատվերը հաջողությամբ գրանցվել է", "success");

        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
    } catch (error) {
        showNotification(error.message, "error");
    }
};
