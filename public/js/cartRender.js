import { showNotification } from "./notification.js";

const cartContent = document.getElementById("cart__content");

const getData = async () => {
    const cartID = localStorage.getItem("cartID");
    if (!cartID) {
        cartContent.textContent = "Դատարկ է";
    }

    const response = await fetch(`http://localhost:3000/api/cart/${cartID}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

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
                <span class="count" class="cart__counter--count" data-id="${item.id}">${item.count}</span>
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

const updateCartData = async (id, type) => {
    try {
        const cartID = localStorage.getItem("cartID");
        const response = await fetch(
            `http://localhost:3000/api/cart/${cartID}`,
            {
                method: type === "delete" ? "DELETE" : "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body:
                    type !== "delete"
                        ? JSON.stringify({
                              id,
                              type,
                          })
                        : null,
            },
        );

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }

        return true;
    } catch (error) {
        showNotification(error.message, "error");
    }
};

cartContent.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("cart__counter--increment")) {
        await updateCartData(id, "increment");
    }
    if (e.target.classList.contains("cart__counter--decrement")) {
        await updateCartData(id, "decrement");
    }

    if (e.target.classList.contains("cart__item--delete")) {
        await updateCartData(id, "delete");
    }
});

getData();
