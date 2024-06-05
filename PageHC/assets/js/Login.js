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

        fetch('http://localhost:3200/api/usuarios/authUsuario', { // Cambiar localhost por la dirección correcta si es necesario
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
                window.location.href = 'index.html';
            } else {
                console.log('Error en autenticación:', data.message);
                messageDiv.textContent = data.message;
                messageDiv.style.display = 'block'; // Asegúrate de que el mensaje se muestre
            }
        })
        .catch(error => {
            console.error('Error durante la autenticación:', error);
            messageDiv.textContent = 'Error al procesar la solicitud.';
            messageDiv.style.display = 'block'; // Asegúrate de que el mensaje se muestre
        });
    }

    if (recoverAccountButton) {
        recoverAccountButton.addEventListener('click', function() {
            window.location.href = 'rehabilitarUsuario.html';
        });
    }
});
