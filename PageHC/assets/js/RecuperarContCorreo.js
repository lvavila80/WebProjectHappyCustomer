document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('recoveryForm');
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = emailInput.value;

        let messageTimeout;

        const fetchPromise = fetch('http://localhost:3200/api/usuarios/correoReestablecerContrasenia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email })
        })
        .then(response => {
            clearTimeout(messageTimeout);  // Limpiar el timeout si la respuesta se recibe a tiempo
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000; // duración en segundos

            if (duration > 5) {
                messageDiv.textContent = "Se envió el token de recuperación de su cuenta a su correo registrado.";
            } else if (duration < 2) {
                messageDiv.textContent = "Cuenta inactiva o inexistente.";
            } else {
                messageDiv.textContent = data.message || "Revise su correo electrónico para continuar con la recuperación de la contraseña.";
            }

            messageDiv.style.color = 'green';
        })
        .catch(error => {
            clearTimeout(messageTimeout);  // Limpiar el timeout si hay un error
            console.error('Error:', error);
            messageDiv.textContent = 'Error al procesar la solicitud. Intente de nuevo más tarde.';
            messageDiv.style.color = 'red';
        });

        const startTime = performance.now();

        // Establecer un timeout de 5 segundos
        messageTimeout = setTimeout(() => {
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000; // duración en segundos

            if (duration > 5) {
                messageDiv.textContent = "Se envió el token de recuperación de su cuenta a su correo registrado.";
                messageDiv.style.color = 'green';
            } else {
                // Hacer que la promesa rechace después de 5 segundos
                fetchPromise.catch(error => {
                    console.error('Error:', error);
                    messageDiv.textContent = 'Error al procesar la solicitud. Intente de nuevo más tarde.';
                    messageDiv.style.color = 'red';
                });
            }
        }, 5000);
    });
});
