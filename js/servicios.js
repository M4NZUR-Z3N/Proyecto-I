document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                    const otherDatos = otherCheckbox.closest('.servicios').querySelector('.datos');
                    otherDatos.style.maxHeight = '0';
                }
            });

            const datos = this.closest('.servicios').querySelector('.datos');

            // Alternar el menú actual
            if (this.checked) {
                datos.style.maxHeight = '220px';
            } else {
                datos.style.maxHeight = '0';
            }
        });
    });
});