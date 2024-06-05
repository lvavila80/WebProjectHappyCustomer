document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resetPasswordForm');
    const emailInput = document.getElementById('email');
    const tokenInput = document.getElementById('token');
    const newPasswordInput = document.getElementById('newPassword');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value;
        const token = tokenInput.value;
        const newPassword = newPasswordInput.value;

        fetch(`http://localhost:3200/api/usuarios/RehabilitarUsuario/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email, contrasenia: newPassword })
        })
        .then(response => {
            if (!response.ok) {
                // Si el servidor responde con un código de estado de error, lanza un Error para manejarlo en el catch
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Parsea la respuesta del servidor como JSON
        })
        .then(data => {
            // Si la respuesta contiene un mensaje, úsalo, de lo contrario proporciona un mensaje predeterminado
            messageDiv.textContent = data.message || "Contraseña restablecida y estado actualizado a activo con éxito.";
            messageDiv.style.color = 'green'; // Establece el color del mensaje a verde para indicar éxito
            messageDiv.style.display = 'block'; // Asegura que el mensaje esté visible
        })
        .catch(error => {
            console.error('Error:', error); // Muestra errores en la consola
            messageDiv.textContent = error.message || 'Error al procesar la solicitud. Intente de nuevo más tarde.';
            messageDiv.style.color = 'red'; // Establece el color del mensaje a rojo para indicar un error
            messageDiv.style.display = 'block'; // Asegura que el mensaje esté visible
        });
    });
});
