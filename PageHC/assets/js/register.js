document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.register-page #formRegistro');
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const confirmarCorreo = document.getElementById('confirmar-correo');
    const contrasena = document.getElementById('contrasena');
    const confirmarContrasena = document.getElementById('confirmar-contrasena');
    const contrasenaErrorAlert = contrasena.nextElementSibling.nextElementSibling;
    const confirmarContrasenaErrorAlert = confirmarContrasena.nextElementSibling.nextElementSibling;

    // Función para validar la fortaleza de la contraseña
    function validatePasswordStrength() {
        const passwordValue = contrasena.value;
        const hasMinLength = passwordValue.length >= 8;
        const hasUpperCase = /[A-Z]/.test(passwordValue);
        const hasNumbers = /[0-9]/.test(passwordValue);

        if (!hasMinLength || !hasUpperCase || !hasNumbers) {
            contrasena.classList.add('input-error');
            contrasenaErrorAlert.innerText = 'La contraseña debe tener más de 8 caracteres, incluir al menos una mayúscula y números.';
            contrasenaErrorAlert.style.display = 'block';
        } else {
            contrasena.classList.remove('input-error');
            contrasenaErrorAlert.style.display = 'none';
        }
    }

    // Evento para validar la fortaleza de la contraseña en tiempo real
    contrasena.addEventListener('input', validatePasswordStrength);

    // Función para verificar si las contraseñas coinciden
    function validatePasswordMatch() {
        if (contrasena.value !== confirmarContrasena.value) {
            confirmarContrasena.classList.add('input-error');
            confirmarContrasenaErrorAlert.innerText = 'Las contraseñas no coinciden.';
            confirmarContrasenaErrorAlert.style.display = 'block';
        } else {
            confirmarContrasena.classList.remove('input-error');
            confirmarContrasenaErrorAlert.style.display = 'none';
        }
    }

    // Evento para verificar la coincidencia de las contraseñas en tiempo real
    confirmarContrasena.addEventListener('input', validatePasswordMatch);

    // Manejo del envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        // Validación de todos los campos requeridos
        [nombre, correo, confirmarCorreo, contrasena, confirmarContrasena].forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('input-error');
                input.nextElementSibling.style.display = 'block';
                input.nextElementSibling.innerText = 'Este campo es requerido.';
                valid = false;
            } else {
                input.classList.remove('input-error');
                input.nextElementSibling.style.display = 'none';
            }
        });

        // Revalidación de la fortaleza de la contraseña y coincidencia antes de enviar
        validatePasswordStrength();
        validatePasswordMatch();

        if (valid && contrasena.value === confirmarContrasena.value && contrasenaErrorAlert.style.display === 'none') {
            form.submit(); // Si todo está correcto, enviar el formulario
        }
    });
});
