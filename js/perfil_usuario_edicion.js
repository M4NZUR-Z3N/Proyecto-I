const toggleButton = document.getElementById('editarBtn');
        const campos = ['nombre', 'telefono', 'distrito', 'descripcion'];

        toggleButton.addEventListener('click', () => {
            const enModoEdicion = toggleButton.textContent === 'Editar';

            toggleButton.textContent = enModoEdicion ? 'Confirmar' : 'Editar';

            campos.forEach(campo => {
                const span = document.getElementById(campo);
                const input = document.getElementById(`input-${campo}`);

                if (enModoEdicion) {
                    // Activar modo edición
                    input.value = span.textContent;
                    span.classList.replace('perfil__dato--visualizar-activo', 'perfil__dato--visualizar-inactivo');
                    input.classList.replace('perfil__dato--edicion-inactivo', 'perfil__dato--edicion-activo');
                    input.focus();
                } else {
                    // Confirmar cambios y volver a modo visualización
                    span.textContent = input.value;
                    span.classList.replace('perfil__dato--visualizar-inactivo', 'perfil__dato--visualizar-activo');
                    input.classList.replace('perfil__dato--edicion-activo', 'perfil__dato--edicion-inactivo');
                }
            });
        });