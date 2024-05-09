document.addEventListener('DOMContentLoaded', function () {
    const verificationForm = document.getElementById('verificationForm');
    const emailInput = document.getElementById('email');
    const verificationCodeInput = document.getElementById('verificationCode');
    const messageDiv = document.getElementById('message');

    verificationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const verificationCode = parseInt(verificationCodeInput.value);

        if (!email) {
            messageDiv.textContent = 'Por favor, ingrese su correo electrónico.';
            return;
        }

        if (isNaN(verificationCode)) {
            messageDiv.textContent = 'El código de verificación debe ser un número entero.';
            return;
        }

        const requestBody = {
            correo: email,
            token: verificationCode
        };

        fetch('http://localhost:3200/api/usuarios/confirmarregistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.text()) // Cambiamos response.json() a response.text() para recibir texto plano
        .then(data => {
            messageDiv.textContent = data;
        })
        .catch(error => {
            messageDiv.textContent = 'Error al procesar la solicitud: ' + error.message;
        });
    });
});
