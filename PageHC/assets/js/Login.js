document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('contrasena');
    const errorMessageDiv = document.getElementById('error-message'); 
    const recoverAccountButton = document.getElementById('recoverAccountButton');

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
                return response.json().then(data => Promise.reject('Error en la autenticación: ' + data.message));
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log('Autenticación exitosa:', data.message);
                window.location.href = 'index.html';
            } else {
                throw new Error('Error en autenticación: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error durante la autenticación:', error);
            errorMessageDiv.textContent = error.toString();
            errorMessageDiv.style.display = 'block';
        });
    });

    if (recoverAccountButton) {
        recoverAccountSomething.addEventListener('click', function() {
            window.location.href = 'rehabilitarUsuario.html'; // Verifica que esta URL sea correcta
        });
    }
});
