document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('contrasena');
    const errorMessageDiv = document.getElementById('error-message');
    const recoverAccountButton = document.getElementById('recoverAccountButton');

    if (loginForm && emailInput && passwordInput && errorMessageDiv) {
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
            .then(response => {
                if (!response.ok) {
                    throw new Error('Respuesta del servidor no fue exitosa: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    console.log('Autenticación exitosa:', data.message);
                    window.location.href = 'index.html';
                } else {
                    console.log('Error en autenticación:', data.message);
                    errorMessageDiv.textContent = data.message;
                    errorMessageDiv.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error durante la autenticación:', error);
                errorMessageDiv.textContent = 'Error al procesar la solicitud. Intente de nuevo más tarde.';
                errorMessageDiv.style.display = 'block';
            });
        });
    }

    if (recoverAccountButton) {
        recoverAccountButton.addEventListener('click', function() {
            window.location.href = 'rehabilitarUsuario.html';
        });
    }
});