document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#formRegistro');
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const confirmarCorreo = document.getElementById('confirmar-correo');
    const contrasena = document.getElementById('contrasena');
    const confirmarContrasena = document.getElementById('confirmar-contrasena');
    const cedula = document.getElementById('cedula');

    function validatePasswordStrength() {
        const passwordValue = contrasena.value;
        const hasMinLength = passwordValue.length >= 8;
        const hasUpperCase = /[A-Z]/.test(passwordValue);
        const hasNumbers = /[0-9]/.test(passwordValue);
        if (!hasMinLength || !hasUpperCase || !hasNumbers) {
            alert('La contraseña debe tener al menos 8 caracteres, incluir una mayúscula y números.');
            return false;
        }
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
        .then(response => response.json()) // Asegurarse de que siempre se espera un JSON
        .then(data => {
            if (data.success) {
                alert(data.message);
                form.reset();
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
