document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.register-page #formRegistro');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        let valid = true;
        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const confirmarCorreo = document.getElementById('confirmar-correo');
        const contrasena = document.getElementById('contrasena');
        const inputs = [nombre, correo, confirmarCorreo, contrasena];

        inputs.forEach(input => {
            input.classList.remove('input-error');
            if (input.nextElementSibling) {
                input.nextElementSibling.style.display = 'none';
            }
        });

        // Validación de campos vacíos
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('input-error');
                if (input.nextElementSibling) {
                    input.nextElementSibling.style.display = 'block';
                    input.nextElementSibling.innerText = 'Este campo es requerido.';
                }
                valid = false;
            }
        });

        // Validación específica para confirmación de correo
        if (correo.value.trim() && confirmarCorreo.value.trim() && correo.value !== confirmarCorreo.value) {
            confirmarCorreo.classList.add('input-error');
            if (confirmarCorreo.nextElementSibling) {
                confirmarCorreo.nextElementSibling.style.display = 'block';
                confirmarCorreo.nextElementSibling.innerText = 'El correo electrónico no coincide.';
            }
            valid = false;
        }

        if (valid) {
            form.submit(); 
        }
    });
});
