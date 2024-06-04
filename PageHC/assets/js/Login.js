document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('contrasena');
    const errorMessageDiv = document.getElementById('error-message'); // Asegúrate de que este elemento exista en tu HTML

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const loginData = {
            correo: emailInput.value,
            passwd: passwordInput.value
        };

        fetch('http://localhost:3200/api/usuarios/authUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Autenticación exitosa:', data.message);
                window.location.href = 'index.html'; // Redireccionar al usuario a la página principal
            } else {
                console.log('Error en autenticación:', data.message);
                errorMessageDiv.textContent = data.message;
                errorMessageDiv.style.display = 'block'; // Muestra el mensaje de error
            }
        })
        .catch(error => {
            console.error('Error durante la autenticación:', error);
            errorMessageDiv.textContent = 'Error al procesar la solicitud. Intente de nuevo más tarde.';
            errorMessageDiv.style.display = 'block'; // Muestra el mensaje de error
        });
    });
});
