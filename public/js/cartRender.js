import { getCartData } from "./api.js";
import { showNotification } from "./notification.js";

const cartContent = document.getElementById("cart__content");

const getData = async () => {
    const data = await getCartData();
    if (data.length < 1) {
        showNotification("Զամբյուղը դատարկ է", "error");

        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
    }
    cartContent.innerHTML = "";
    data.forEach((item) => {
        cartContent.innerHTML += `
        <li class="cart__item">
            <a class="cart__imagebar" href="/category/${item.categorySlug}/${item.slug}">
                <img src="${item.image}" alt="${item.title}" />
            </a>
            <div class="cart__info">
                <a class="cart___item--title link" href="/category/${item.categorySlug}/${item.slug}">${item.title}</a>
                <p class="cart___item--price">${item.price.toLocaleString("en-US")}դր.</p>
            </div>
            
            <div class="cart__counter">
                <button class="cart__counter--decrement" data-id="${item.id}">-</button>
                <span class="count cart__counter--count" data-id="${item.id}">${item.count}</span>
                <button class="cart__counter--increment" data-id="${item.id}">+</button>
            </div>
            <div class="cart__item--end">
                <p class="totalPrice">${(item.price * item.count).toLocaleString("en-US")}դր.</p>
                <span class="cart__item--delete link" data-id="${item.id}">Հեռացնել</span>
            </div>
        </li>

        `;
    });
};

const getter = (type) => {
    switch (type) {
        case "increment": {
            return "ավելացվել";
        }
        case "decrement": {
            return "Նվազել";
        }
        case "delete": {
            return "Հեռացվել";
        }
        default: {
            return "";
        }
    }
};

const updateCartData = async (id, type) => {
    try {
        const cartID = localStorage.getItem("cartID");
        const response = await fetch(
            `http://localhost:3000/api/cart/${cartID}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    type,
                }),
            },
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        const notify = getter(type);
        showNotification(`Ապրանքը ${notify} է`, "success");
        return data;
    } catch (error) {
        showNotification(error.message, "error");
    }
};

cartContent.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    const item = e.target.closest(".cart__item");
    const counter = item.querySelector(".count");
    const totalPrice = item.querySelector(".totalPrice");

    if (e.target.classList.contains("cart__counter--increment")) {
        const data = await updateCartData(id, "increment");
        counter.textContent = data.count;
        totalPrice.textContent = `${(data.price * data.count).toLocaleString("en-US")}դր.`;
    }
    if (e.target.classList.contains("cart__counter--decrement")) {
        const data = await updateCartData(id, "decrement");
        counter.textContent = data.count;
        totalPrice.textContent = `${(data.price * data.count).toLocaleString("en-US")}դր.`;
    }

    if (e.target.classList.contains("cart__item--delete")) {
        await updateCartData(id, "delete");
        await getData();
    }
});

getData();
