//Inicio de Sesion

    // Ingresamos al HTML con el DOM
    const $formulario = document.getElementById('formulario_inicio_sesion', 'formulario_registro_usuario');
    const $inputs = document.querySelectorAll('#formulario_inicio_sesion input', '#formulario_registro_usuario input');

    // const $inputs = document.querySelectorAll('#formulario input');
    // const $formulario = document.getElementById('formulario');

    //Expresiones Regulares
    const expresiones = {
        email:/^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]+$/,//a-z para aceptar todos las letras minusculas, A-Z para aceptar letras en mayusculas, 0-9 para aceptar el uso de numeros
        email2:/^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]+$/,//a-z para aceptar todos las letras minusculas, A-Z para aceptar letras en mayusculas, 0-9 para aceptar el uso de numeros
    }

    const campos={
        email: false,
        email2: false,
    }
    
    //Paso 3 Realizar la accion
    const validarFormulario = (e) =>{
        switch(e.target.name){
            case "email":
                validarCampo(expresiones.email, e.target, "email");
            break;
            case "email2":
                validarCampo_registro(expresiones.email2, e.target, "email2");
                console.log("validado");
            break;
        }
    }

    const validarCampo = (expresion,input,campo) =>{
        if (expresion.test(input.value)) {
            document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
            campos[campo]=true;
        } else {
            document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
            campos[campo]=false;
        }
    }
    
    //Paso 2 Escuchar el Evento
    $inputs.forEach((input)=>{
        input.addEventListener("keyup",validarFormulario);
        input.addEventListener("blur",validarFormulario);
    })

    // $inputs_registro.forEach((input)=>{
    //     input.addEventListener("keyup",validarFormulario);
    //     input.addEventListener("blur",validarFormulario);
    // })

    
// -----------------------------------------------------------------------Display en el Responsive-----------------------------------------------------------------------
    // Noticias avisos usuario.
    // ingresamos al DOM 
    const columna_inicio_sesion = document.getElementById('formulario_inicio_sesion');
    const columna_registro_usuario = document.getElementById('formulario_registro_usuario');
    const toggleButton = document.getElementById('btn_registro');

    const checkScreenSize = () => {
        if(window.innerWidth >= 900) {//si la pantalla es grande, se tienen que mostrar ambas columnas, sin el boton
            columna_inicio_sesion.style.display = 'block';
            columna_registro_usuario.style.display = 'block';
            toggleButton.style.display = 'none';

        }else{//si la pantalla es pequeña, solo se muestra 1 columna y el boton
            columna_inicio_sesion.style.display = 'block';
            columna_registro_usuario.style.display = 'none';
            toggleButton.style.display = 'block';
        }
    }

    //llamamos la funcion al cargar pagina
    checkScreenSize();

    // escuchamos el evento
    toggleButton.addEventListener('click',() => {
        if(toggleButton.textContent === "Registrarse"){
            toggleButton.textContent ="Iniciar Sesion";
            columna_registro_usuario.style.display = 'block';
            columna_inicio_sesion.style.display = 'none';
        }else{
            toggleButton.textContent = "Registrarse";
            columna_registro_usuario.style.display = 'none';
            columna_inicio_sesion.style.display = 'block';
        }
    });

    //llamamos la funcion que escucha las dimenciones de la ventana
        window.addEventListener('resize',checkScreenSize);