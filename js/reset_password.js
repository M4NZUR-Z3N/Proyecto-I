function togglePassword(inputId, iconId) {
    let passwordField = document.getElementById(inputId);
    let eyeIcon = document.getElementById(iconId);

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.remove("bi-eye-fill");
        eyeIcon.classList.add("bi-eye-slash-fill");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.remove("bi-eye-slash-fill");
        eyeIcon.classList.add("bi-eye-fill");
    }
}


const passwordInput = document.getElementById("nueva_contraseña");
const confirmPasswordInput = document.getElementById("confirmar_contraseña");


const lengthRequirement = document.getElementById("length");
const numberRequirement = document.getElementById("number");
const uppercaseRequirement = document.getElementById("uppercase");


const passwordRequirements = document.getElementById("password_requirements");
const errorMessage = document.createElement("p");
errorMessage.style.color = "red";
errorMessage.style.fontWeight = "bold";
errorMessage.style.marginTop = "10px";
errorMessage.style.display = "none"; 
passwordRequirements.appendChild(errorMessage);


passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;

    
    if (password.length >= 8) {
        lengthRequirement.innerHTML = "✅ 8 o más dígitos";
        lengthRequirement.classList.remove("invalid");
        lengthRequirement.classList.add("valid");
    } else {
        lengthRequirement.innerHTML = "❌ 8 o más dígitos";
        lengthRequirement.classList.remove("valid");
        lengthRequirement.classList.add("invalid");
    }

    
    if (/\d/.test(password)) {
        numberRequirement.innerHTML = "✅ 1 o más números";
        numberRequirement.classList.remove("invalid");
        numberRequirement.classList.add("valid");
    } else {
        numberRequirement.innerHTML = "❌ 1 o más números";
        numberRequirement.classList.remove("valid");
        numberRequirement.classList.add("invalid");
    }

    
    if (/[A-Z]/.test(password)) {
        uppercaseRequirement.innerHTML = "✅ 1 o más mayúsculas";
        uppercaseRequirement.classList.remove("invalid");
        uppercaseRequirement.classList.add("valid");
    } else {
        uppercaseRequirement.innerHTML = "❌ 1 o más mayúsculas";
        uppercaseRequirement.classList.remove("valid");
        uppercaseRequirement.classList.add("invalid");
    }
});


confirmPasswordInput.addEventListener("input", function () {
    if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.innerHTML = "⚠️ Ambas contraseñas deben ser iguales, por favor verifica e intenta de nuevo.";
        errorMessage.style.display = "block";
        confirmPasswordInput.style.border = "2px solid red";
    } else {
        errorMessage.style.display = "none";
        confirmPasswordInput.style.border = "2px solid green";
    }
});


