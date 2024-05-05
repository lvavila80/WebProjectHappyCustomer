document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.register-page #formRegistro');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evitar el envío del formulario
        let valid = true;
        let firstErrorInput = null;

        const inputs = form.querySelectorAll('.input-field');

        inputs.forEach(input => {
            if (!input.value.trim()) { // Verificar si el campo está vacío
                input.classList.add('input-error');
                input.nextElementSibling.style.display = 'block'; // Mostrar mensaje de error
                valid = false;
                if (!firstErrorInput) {
                    firstErrorInput = input;
                }
            } else {
                input.classList.remove('input-error');
                input.nextElementSibling.style.display = 'none'; // Ocultar mensaje de error
            }
        });

        if (!valid) {
            alert('Por favor completa todos los campos requeridos.');
            firstErrorInput.focus(); // Enfocar el primer campo con error
            firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Desplazar la vista al primer campo con error
        } else {
            form.submit(); // Si todo está correcto, enviar el formulario
        }
    });
});
