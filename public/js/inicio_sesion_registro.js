// para registros


    // const $formulario_registro = document.getElementById('formulario_registro_usuario');
    // const $inputs_registro = document.querySelectorAll('#formulario_registro_usuario input');
    console.log("IN");

    //Expresiones Regulares
    const expresiones_registro = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        apellidos: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        cedula: /^\d{9,11}$/,
        passwordR: /^.{4,12}$/, 
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

            case "nombre":
                validarCampo_registro(expresiones.nombre, e.target, "nombre");
                console.log("validado");
            break;

            case "apellidos":
                validarCampo_registro(expresiones.apellidos, e.target, "apellidos");
            break;

            case "cedula":
                validarCampo_registro(expresiones.cedula, e.target, "cedula");
            break;

            case "email2":
                validarCampo_registro(expresiones.email2, e.target, "email2");
                console.log("validado");
            break;
                
            case "passwordR":
                validarCampo_registro(expresiones.passwordR, e.target, "passwordR");
                validarPassword2();
            break;

            case "passwordR2":
                validarPassword2();
            break;

            case "telefono":
                validarCampo_registro(expresiones.telefono, e.target, "telefono");
            break;

            case "direccion":
                validarCampo_registro(expresiones.direccion, e.target, "direccion");
            break;
        }
    }

    const validarCampo_registro = (expresion,input,campo) =>{
        if (expresion.test(input.value)) {
            document.querySelector(`#formulario_${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
            campos_registro[campo]=true;
        } else {
            document.querySelector(`#formulario_${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
            campos_registro[campo]=false;
        }
    }

    const validarPassword2 = () => {
        const password = document.querySelector('input[name="password"]');
        const password2 = document.querySelector('input[name="password2"]');
        const error = document.querySelector(`#formulario_password2 .formulario__input-error`);

        if (password.value !== password2.value) {
            error.classList.add("formulario__input-error-activo");
            campos_registro["password"] = false;
        } else {
            error.classList.remove("formulario__input-error-activo");
            campos_registro["password"] = true;
        }
    }

    //escuchamos el evento
    $inputs_registro.forEach((input)=>{
        input.addEventListener("keyup",validarFormulario_registro);
        input.addEventListener("blur",validarFormulario_registro);
    })