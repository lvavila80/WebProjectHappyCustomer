document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#formRegistro');
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const confirmarCorreo = document.getElementById('confirmar-correo');
    const contrasena = document.getElementById('contrasena');
    const confirmarContrasena = document.getElementById('confirmar-contrasena');
    const cedula = document.getElementById('cedula');
    const passwordErrorDiv = document.getElementById('password-error');

    function validatePasswordStrength() {
        const passwordValue = contrasena.value;
        const hasMinLength = passwordValue.length >= 8;
        const hasUpperCase = /[A-Z]/.test(passwordValue);
        const hasNumbers = /[0-9]/.test(passwordValue);
        const hasSpecialChar = /[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/.test(passwordValue);

        if (!hasMinLength || !hasUpperCase || !hasNumbers || !hasSpecialChar) {
            const errorMessage = 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.';
            passwordErrorDiv.textContent = errorMessage;
            passwordErrorDiv.style.display = 'block';
            return false;
        }
        passwordErrorDiv.style.display = 'none';
        return true;
    }

    function validatePasswordMatch() {
        if (contrasena.value !== confirmarContrasena.value) {
            alert('Las contraseñas no coinciden.');
            return false;
        }
        return true;
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
            correo: correo.value,
            passwd: contrasena.value,
            cedula: parseInt(cedula.value, 10),  // Convierte a entero
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta del servidor no fue exitosa: ' + response.statusText);
            }
            return response.text();  // Usa .text() en lugar de .json() si no estás seguro de que la respuesta es JSON
        })
        .then(text => {
            try {
                const data = JSON.parse(text);  // Intenta analizar el texto como JSON
                if (data.success) {
                    window.location.href = 'confirmacionRegistro.html';
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                throw new Error('Error al analizar JSON: ' + error.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al enviar los datos: ' + error.message);
        });
    });
});
