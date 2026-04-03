const minSlider = document.getElementById("min-slider");
const maxSlider = document.getElementById("max-slider");
const minLabel = document.getElementById("min-price");
const maxLabel = document.getElementById("max-price");
const container = document.querySelector(".category__items");
const inputs = document.querySelectorAll("input[type='checkbox']");
let filteredProducts = [];

const safeParse = (val) => {
    try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
        return [val];
    }
};

const updateURL = (params) => {
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", url);
};

const getStatus = (inStock) => {
    let statusClass = "";
    let statusText = "";

    if (inStock < 1) {
        statusClass = "red";
        statusText = "Առկա չէ";
    } else if (inStock > 5) {
        statusClass = "green";
        statusText = "Առկա է";
    } else {
        statusClass = "yellow";
        statusText = "Սահմանափակ է";
    }

    return {
        statusClass,
        statusText,
    };
};

async function loadProducts() {
    const slug = window.location.pathname.split("/").at(-1);

    const res = await fetch(`http://localhost:3000/api/products/${slug}`);
    const data = await res.json();

    filteredProducts = data;
    applyFilters();
}

function applyFilters() {
    const params = new URLSearchParams(window.location.search);
    
    const min = params.has("minPrice")
        ? +params.get("minPrice")
        : minSlider.value;

    const max = params.has("maxPrice")
        ? +params.get("maxPrice")
        : maxSlider.value;

    let result = filteredProducts;

    result = result.filter((p) => p.price >= min && p.price <= max);

    params.forEach((value, key) => {
        if (!key.startsWith("searchData_")) return;

        const values = safeParse(value).map((v) => v.toLowerCase());
        const field = key.replace("searchData_", "");

        result = result.filter((product) => {
            if (field === "brand") {
                return values.includes(product.brand?.toLowerCase());
            }

            return (
                product.params &&
                product.params.some(
                    (p) =>
                        p.title === field &&
                        values.includes(p.desc.toLowerCase()),
                )
            );
        });
    });

    render(result);
    uiRender(params, min, max);
}

function toggleFilter(key, value) {
    const params = new URLSearchParams(window.location.search);

    let values = [];
    const existing = params.get(key);

    if (existing) values = safeParse(existing);

    values = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];

    if (values.length) {
        params.set(key, JSON.stringify(values));
    } else {
        params.delete(key);
    }

    updateURL(params);
    applyFilters();
}

function handlePrice(e) {
    let min = +minSlider.value;
    let max = +maxSlider.value;
    const gap = 2000;
    if (min > max - gap) {
        if (e.target.id === "min-slider") {
            minSlider.value = max - gap;
        } else {
            maxSlider.value = min + gap;
        }
    }
    minLabel.textContent = minSlider.value;
    maxLabel.textContent = maxSlider.value;
    const params = new URLSearchParams(window.location.search);

    params.set("minPrice", min);
    params.set("maxPrice", max);

    updateURL(params);
    applyFilters();
}

function uiRender(params, min, max) {
    const activeValues = new Set();

    minLabel.textContent = min;
    maxLabel.textContent = max;

    minSlider.value = min;
    maxSlider.value = max;

    params.forEach((value, key) => {
        if (!key.startsWith("searchData_")) return;
        safeParse(value).forEach((v) => activeValues.add(v));
    });

    inputs.forEach((input) => {
        if (activeValues.has(input.value)) {
            input.checked = true;
        } else {
            input.checked = false;
        }
    });
}

function render(list) {
    if (!list.length) {
        container.innerHTML = `<p class="no-products">Ապրանքներ չեն գտնվել</p>`;
        return;
    }

    container.innerHTML = "";
    list.forEach((p) => {
        const { statusClass, statusText } = getStatus(p.inStock);
        const data = `
          <li class="product__item">
              <span class="status ${statusClass}">${statusText}</span>
          
              <a class="img" href="/${p.categorySlug}/${p.slug}">
                  <img src="${p.image}" alt="${p.title}">
              </a>
          
              <div class="product__content">
                  <a class="title" href="/${p.categorySlug}/${p.slug}">${p.title}</a>
                  <p class="price">Գին՝ <b>${p.price.toLocaleString("en-US")} դր.</b></p>
                  <button class="btn">Ավելացնել զամբյուղում</button>
              </div>
          </li>
      `;
        container.insertAdjacentHTML("beforeend", data);
    });
}

function initEvents() {
    document.addEventListener("click", (e) => {
        const item = e.target.closest("[data-filter]");
        if (!item) return;

        if (e.target.tagName === "INPUT") return;
      
        const key = item.dataset.key;
        const value = item.dataset.value;
        toggleFilter(key, value);
    });

    if (minSlider && maxSlider) {
        minSlider.addEventListener("input", handlePrice);
        maxSlider.addEventListener("input", handlePrice);
    }
}

initEvents();
loadProducts();
