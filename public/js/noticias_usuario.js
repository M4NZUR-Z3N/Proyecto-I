// Noticias avisos usuario.
// ingresamos al DOM 
const columna_avisos = document.getElementById('display_avisos');
const columna_noticias = document.getElementById('display_noticias');
const toggleButton = document.getElementById('button_avisos');
const toggleButton2 = document.getElementById('button_noticias');

const checkScreenSize = () => {
    if(window.innerWidth >= 2000) {//si la pantalla es grande, se tienen que mostrar ambas columnas, sin el boton
        columna_avisos.style.display = 'block';
        columna_noticias.style.display = 'block';
        toggleButton.style.display = 'none';

    }else{//si la pantalla es pequeña, solo se muestra 1 columna y el boton
        columna_noticias.style.display = 'block';
        columna_avisos.style.display = 'none';
        toggleButton.style.display = 'block';
    }
}

//llamamos la funcion al cargar pagina
checkScreenSize();

// escuchamos el evento
toggleButton.addEventListener('click',() => {
    if(toggleButton.textContent=== "Avisos"){
        // toggleButton.textContent ="Noticias";
        columna_avisos.style.display = 'block';
        columna_noticias.style.display = 'none';
        toggleButton.style.backgroundColor="rgb(42, 81, 255)";
        toggleButton2.style.backgroundColor="#5067a7";
        toggleButton.style.transform="translateY(-10%)"
        toggleButton2.style.transform="translateY(0%)"
    }
});
toggleButton2.addEventListener('click',() => {
    if(toggleButton2.textContent=== "Noticias"){
        // toggleButton2.textContent ="Noticias";
        columna_avisos.style.display = 'none';
        columna_noticias.style.display = 'block';
        toggleButton2.style.backgroundColor="rgb(42, 81, 255)";
        toggleButton.style.backgroundColor="#5067a7";
        toggleButton2.style.transform="translateY(-10%)"
        toggleButton.style.transform="translateY(0%)"
    }
});
//llamamos la funcion que escucha las dimenciones de la ventana
window.addEventListener('resize',checkScreenSize);