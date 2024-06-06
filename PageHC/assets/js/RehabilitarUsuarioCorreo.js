document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('recoveryForm');
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');
    const recoverTokenButton = document.getElementById('recoverTokenButton');
    const registerButton = document.getElementById('registerButton');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value;
        fetch('http://localhost:3200/api/usuarios/correoReestablecerContrasenia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta del servidor no fue exitosa: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            messageDiv.textContent = data;
            messageDiv.style.color = 'green';
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = error.message || 'Error al procesar la solicitud. Intente de nuevo más tarde.';
            messageDiv.style.color = 'red';
        });
    });

    recoverTokenButton.addEventListener('click', function() {
        window.location.href = 'RehabilitarUsuario.html';
    });

    registerButton.addEventListener('click', function() {
        window.location.href = 'RegistroUsuario.html';
    });
});
