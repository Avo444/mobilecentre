import { aparikInfo, getBanks } from "./api.js";
const aparikBtns = document.querySelectorAll(".aparik");

const closeModal = (modalContainer) => {
    modalContainer.classList.remove("show");

    setTimeout(() => {
        modalContainer.remove();
    }, 300);
};

const createModal = (banks, data) => {
    const modalContainer = document.createElement("div");
    console.log(data)
    modalContainer.innerHTML += `
        <div class="modal">
            <div class="modal__header">
                <p class="title">${data.title}</p>
                <p class="price">Ապառիկ գին: ${data.totalPrice.toLocaleString("en-US")}դր.</p>

                <button class="btn close" id="close">X</button>
            </div>
            <form class="modal__form">
                <label>
                    Բանկ
                    <select name="bank" id="bank">
                        ${banks.map((bank) => `<option value="${bank.id}">${bank.title} (${bank.procent}%)</option>`).join("")}
                    </select>
                </label>
                <label>
                    Տևողություն (ամիս)
                    <select name="months">
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                    </select>
                </label>
                <label>
                    Կանխավճար (ՀՀ դրամ)
                    <input type="number" placeholder="Կանխավճար" />
                </label>
                <button type="submit" class="btn btn-primary">Հաշվարկել</button>
            </form>

            <table class="modal__content">
                <thead>
                    <tr>
                        <th>Ամիսներ</th>
                        <th>Տոկոսագումար</th>
                        <th>Մայր գումար</th>
                        <th>Վճարման ենթակա ընդհանուր վճար</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.priceList.map((item) => {
                        return `<tr>
                                    <td>${item.month}</td>
                                    <td>${item.interest.toLocaleString("en-US")}</td>
                                    <td>${item.principal.toLocaleString("en-US")}</td>
                                    <td>${item.total.toLocaleString("en-US")}</td>
                                </tr>`;
                    }).join("")}
                </tbody>
                 <tfoot>
                    <tr>
                        <td>Վճարման ենթակա ընդհանուր վճար</td>
                        <td>${data.totalInterest.toLocaleString("en-US")}</td>
                        <td>${data.totalPrincipal.toLocaleString("en-US")}</td>
                        <td>${data.totalPrice.toLocaleString("en-US")}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;

    const bank = modalContainer.querySelector("#bank");

    modalContainer.classList.add("modal__container");
    requestAnimationFrame(() => {
        modalContainer.classList.add("show");
    });

    modalContainer.addEventListener("click", (e) => {
        if (e.target === e.currentTarget || e.target.id === "close") {
            closeModal(modalContainer);
        }
    });

    bank.addEventListener("change", (e) => {
        // update
    });

    document.body.append(modalContainer);
};

aparikBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const banks = await getBanks();
        const data = await aparikInfo({ id, bankID: banks[0].id });
        createModal(banks, data);
    });
});
