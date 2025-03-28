document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"); 
    const button = document.querySelector("button");

    button.addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        
        if (email === "") {
            alert("Por favor, ingrese su correo electrónico.");
            return;
        }

        const existingMessage = document.querySelector(".message-box");
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageBox = document.createElement("div");
        messageBox.classList.add("message-box");
        messageBox.innerHTML = "✅ <strong>Éxito:</strong> Se ha enviado un enlace a su correo para cambiar su contraseña.";

        form.parentNode.appendChild(messageBox);
        
        setTimeout(() => {
            messageBox.remove();
            window.location.href = "reset_password.html";
        }, 5000);
    });
});
