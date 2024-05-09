document.addEventListener('DOMContentLoaded', function () {
    const verificationForm = document.getElementById('verificationForm');
    const emailInput = document.getElementById('email');
    const verificationCodeInput = document.getElementById('verificationCode');
    const messageDiv = document.getElementById('message');
    const goToHomeButton = document.getElementById('goToHome'); // Referencia al botón

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
        .then(response => response.text())
        .then(data => {
            messageDiv.textContent = data.trim();
            if (data.trim() === 'Usuario confirmado' || data.trim() === 'Usuario Confirmado.') {
                goToHomeButton.disabled = false; // Habilita el botón
                goToHomeButton.addEventListener('click', function() {
                    window.location.href = 'index.html'; // Redirige al usuario a index.html
                });
            }
        })
        .catch(error => {
            messageDiv.textContent = 'Error al procesar la solicitud: ' + error.message;
        });
    });
});
