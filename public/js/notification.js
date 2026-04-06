const notificationContainer = document.getElementById("notificationContainer");

export function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.classList.add("notification", "show", type);
    notification.textContent = message;
    notificationContainer.append(notification);

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
    setTimeout(() => {
        notification.remove();
    }, 3200);
}
