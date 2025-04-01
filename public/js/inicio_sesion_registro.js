// para registros
const $formulario_registro = document.getElementById('formulario_registro_usuario');
const $inputs_registro = document.querySelectorAll('#formulario_registro_usuario input');

//Expresiones Regulares
const expresiones_registro = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    apellidos: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    cedula: /^\d{9,11}$/,
    password: /^.{4,12}$/, 
    telefono: /^\d{8,11}$/,
    direccion: /^[a-zA-ZÀ-ÿ\s]{10,200}$/,
    email2:/^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]+$/,//a-z para aceptar todos las letras minusculas, A-Z para aceptar letras en mayusculas, 0-9 para aceptar el uso de numeros
}

const campos_registro={
    nombre: false,
    apellidos: false,
    cedula: false,
    password: false,
    telefono: false,
    direccion: false,
    email2: false,
}

const validarFormulario_registro = (e) =>{
    switch(e.target.name){

        case "email2":
            validarCampo(expresiones.email, e.target, "email2");
        break;

        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
        break;

        case "apellidos":
            validarCampo(expresiones.apellidos, e.target, "apellidos");
        break;
            
        case "cedula":
            validarCampo(expresiones.cedula, e.target, "cedula");
        break;

        case "passwordR":
            validarCampo(expresiones.password, e.target, "passwordR");
            validarPassword2();
        break;

        case "passwordR2":
            validarPassword2();
        break;

        case "telefono":
            validarCampo(expresiones.telefono, e.target, "telefono");
        break;

        case "direccion":
            validarCampo(expresiones.direccion, e.target, "direccion");
        break;
    }
}

const validarCampo_registro = (expresion,input,campo) =>{
    if (expresion.test(input.value)) {
        document.querySelector(`#formulario_${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo]=true;
    } else {
        document.querySelector(`#formulario_${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo]=false;
    }
}

const validarPassword2 = () => {
    const password = document.querySelector('input[name="password"]');
    const password2 = document.querySelector('input[name="password2"]');
    const error = document.querySelector(`#formulario_password2 .formulario__input-error`);

    if (password.value !== password2.value) {
        error.classList.add("formulario__input-error-activo");
        campos["password"] = false;
    } else {
        error.classList.remove("formulario__input-error-activo");
        campos["password"] = true;
    }
}

//escuchamos el evento
$inputs_registro.forEach((input)=>{
    input.addEventListener("keyup",validarFormulario);
    input.addEventListener("blur",validarFormulario);
})