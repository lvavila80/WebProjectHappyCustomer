document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formRegistro');
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const confirmarCorreo = document.getElementById('confirmar-correo');
    const contrasena = document.getElementById('contrasena');
    const confirmarContrasena = document.getElementById('confirmar-contrasena');
    const cedula = document.getElementById('cedula');
    const terminos = document.getElementById('terminos');
    const passwordErrorDiv = document.getElementById('password-error');
    const emailErrorDiv = document.getElementById('email-error');

    // Event listeners for real-time validation
    contrasena.addEventListener('input', validatePasswordStrength);
    confirmarContrasena.addEventListener('input', validatePasswordMatch);
    correo.addEventListener('input', validateEmailMatch);
    confirmarCorreo.addEventListener('input', validateEmailMatch);

    function validatePasswordStrength() {
        const hasMinLength = contrasena.value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(contrasena.value);
        const hasNumbers = /[0-9]/.test(contrasena.value);
        const hasSpecialChar = /[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/.test(contrasena.value);

        if (hasMinLength && hasUpperCase && hasNumbers && hasSpecialChar) {
            passwordErrorDiv.style.display = 'none';
            return true;
        } else {
            passwordErrorDiv.textContent = 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.';
            passwordErrorDiv.style.display = 'block';
            return false;
        }
    }

    function validatePasswordMatch() {
        if (contrasena.value === confirmarContrasena.value) {
            passwordErrorDiv.style.display = 'none';
            return true;
        } else {
            passwordErrorDiv.textContent = 'Las contraseñas no coinciden.';
            passwordErrorDiv.style.display = 'block';
            return false;
        }
    }

    function validateEmailMatch() {
        if (correo.value === confirmarCorreo.value) {
            emailErrorDiv.style.display = 'none';
            return true;
        } else {
            emailErrorDiv.textContent = 'Los correos electrónicos no coinciden.';
            emailErrorDiv.style.display = 'block';
            return false;
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Ocultar mensajes de error
        passwordErrorDiv.style.display = 'none';

        if (correo.value !== confirmarCorreo.value) {
            alert("Los correos no coinciden. Por favor, confirme su correo electrónico.");
            return;
        }

        if (!validatePasswordStrength() || !validatePasswordMatch()) {
            return;
        }

        let usuarioData = {
            correo: confirmarCorreo.value,
            passwd: confirmarContrasena.value,
            cedula: parseInt(cedula.value),
            nombre: nombre.value,
            cambiarClave: false,
            rol: "ADMIN"
        };

        fetch('http://localhost:3200/api/usuarios/insertarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // En lugar de mostrar un alert, redirigir a la página de confirmación
                window.location.href = 'confirmacionRegistro.html';  // Asegúrate de que esta es la URL correcta
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al enviar los datos: ' + error.message);
        });
    });
});
