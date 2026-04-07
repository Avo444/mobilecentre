import { login, register } from "./api.js";
import { showNotification } from "./notification.js";

const authForm = document.querySelector(".auth__form");
const auth = async (e) => {
    try {
        e.preventDefault();
        const id = e.target.id;
        const formData = new FormData(e.target);
        const form = Object.fromEntries(formData.entries());

        if (
            !form.email ||
            !form.password ||
            (id === "register" && !form.checkPassword)
        ) {
            showNotification("Խնդրում ենք լրացնել բոլոր դաշտերը!", "error");
            return;
        }

        if (
            !form.password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            )
        ) {
            showNotification(
                "Գաղտնաբառը պետք է պարունակի տառեր, թվեր և սիմվոլներ",
                "error",
            );
            return;
        }
        if (id === "register" && form.password !== form.checkPassword) {
            showNotification("Գաղտնաբառերը համապատասխան չեն", "error");
            return;
        }

        let data = null;
        if (id === "register") {
            data = await register(form);
        } else data = await login(form);
        showNotification(
            id === "register"
                ? "Դուք հաջողությամբ գրանցվել եք"
                : "Դուք հաջողությամբ մուտք գործեցիք",
            "success",
        );
        if(id === "login") {
            console.log(data)
            localStorage.setItem("id", data.id)
        }
        setTimeout(() => {
            window.location.href =
                id === "register" ? "/auth/login" : "/profile";
        }, 3000);
    } catch (error) {
        showNotification(error.message, "error");
    }
};

authForm.addEventListener("submit", auth);
