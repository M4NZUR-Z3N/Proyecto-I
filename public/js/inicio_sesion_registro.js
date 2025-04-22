// para registros


    const formulario_registro = document.getElementById('formulario_registro_usuario');
    const inputs_registro = document.querySelectorAll('#formulario_registro_usuario input');
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
        passwordR: false,
        telefono: false,
        direccion: false,
        email2: false,
        distrito: false,
    }

    const validarFormulario_registro = (e) =>{
        switch(e.target.name){

            case "nombre":
                validarCampo_registro(expresiones_registro.nombre, e.target, "nombre");
            break;
            case "apellidos":
                validarCampo_registro(expresiones_registro.apellidos, e.target, "apellidos");
            break;
            case "cedula":
                validarCampo_registro(expresiones_registro.cedula, e.target, "cedula");
            break;
            case "email2":
                validarCampo_registro(expresiones_registro.email2, e.target, "email2");
            break;
            case "passwordR":
                validarCampo_registro(expresiones_registro.passwordR, e.target, "passwordR");
                validarPassword2();
            break;
            case "passwordR2":
                validarPassword2();
            break;
            case "telefono":
                validarCampo_registro(expresiones_registro.telefono, e.target, "telefono");
            break;
            case "direccion":
                validarCampo_registro(expresiones_registro.direccion, e.target, "direccion");
            break;
            case "distrito":
                const selectDistrito = e.target;
                if(selectDistrito.value !== "null"){
                    document.querySelector(`#formulario_distritos .formulario__input-error`).classList.remove("formulario__input-error-activo");
                    campos_registro["distrito"]=true;
                } else {
                    document.querySelector(`#formulario_distritos .formulario__input-error`).classList.add("formulario__input-error-activo");
                    campos_registro["distrito"]=false;
                }
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
        const passwordR = document.getElementById("passwordR");
        const passwordR2 = document.getElementById("passwordR2");

        if (passwordR.value !== passwordR2.value) {
            document.querySelector(`#formulario_passwordR2 .formulario__input-error`).classList.add("formulario__input-error-activo");
            campos_registro["passwordR"] = false;
        } else {
            document.querySelector(`#formulario_passwordR2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
            campos_registro["passwordR"] = true;
        }
    }

    //escuchamos el evento
    inputs_registro.forEach((input)=>{
        input.addEventListener("keyup",validarFormulario_registro);
        input.addEventListener("blur",validarFormulario_registro);
    })

    // $formulario.addEventListener("submit",(e)=>{
    //     e.preventDefault();//Evita que se recargue la pagina
    
    //     const $terminos = document.getElementById("terminos");
    //     if(campos.correo && campos.nombre && campos.password && campos.telefono && campos.usuario && $terminos.checked){
    //         document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
    //         document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
    
    //         setTimeout(()=>{
    //             location.reload();
    //         },4000)
    
    //     }else{
    //         document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    //     }
    // })