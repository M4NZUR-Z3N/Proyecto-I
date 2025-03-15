//Inicio de Sesion
    // Creamos las variables

    // Ingresamos al HTML con el DOM
    const $formulario = document.getElementById('formulario_inicio_sesion');
    const $inputs = document.querySelectorAll('#formulario_inicio_sesion input')

    // const $inputs = document.querySelectorAll('#formulario input');
    // const $formulario = document.getElementById('formulario');

    //Expresiones Regulares
    const expresiones = {
        email:/^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]+$/,//a-z para aceptar todos las letras minusculas, A-Z para aceptar letras en mayusculas, 0-9 para aceptar el uso de numeros
    }

    const campos={
        email: false,
    }
    //Paso 3 Realizar la accion
    const validarFormulario = (e) =>{
        switch(e.target.name){
            case "email":
                validarCampo(expresiones.email, e.target, "email");
        }
    }

    const validarCampo = (expresion,input,campo) =>{
        if (expresion.test(input.value)) {
            document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        } else {
            document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        }
    }
    //Paso 2 Escuchar el Evento
    $inputs.forEach((input)=>{
        input.addEventListener("keyup",validarFormulario);
        input.addEventListener("blur",validarFormulario);
    })
