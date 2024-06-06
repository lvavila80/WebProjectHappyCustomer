document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('recoveryForm');
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = emailInput.value;

        // Cambia la URL de acuerdo a tu configuración de servidor y API
        fetch('http://localhost:3200/api/usuarios/correoReestablecerContrasenia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email })
        })
        .then(response => {
            if (!response.ok) {
                // Si el servidor responde con un código de error, genera un Error
                throw new Error('No fue posible procesar la solicitud');
            }
            return response.json();
        })
        .then(data => {
            // Muestra un mensaje de éxito al usuario
            messageDiv.textContent = "Se envió el token al correo para rehabilitar su usuario";
            messageDiv.style.color = 'green';
            messageDiv.style.display = 'block';
        })
        .catch(error => {
            // Maneja errores de conexión o de la respuesta del servidor
            console.error('Error:', error);
            messageDiv.textContent = error.message;
            messageDiv.style.color = 'red';
            messageDiv.style.display = 'block';
        });
    });
});
