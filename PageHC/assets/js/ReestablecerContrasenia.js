document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resetForm');
    const emailInput = document.getElementById('email');
    const tokenInput = document.getElementById('token');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = emailInput.value;
        const token = tokenInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword !== confirmPassword) {
            messageDiv.textContent = 'Las contraseñas no coinciden.';
            messageDiv.style.color = 'red';
            return;
        }

        fetch(`http://localhost:3200/api/usuarios/ReestablecerContrasenia/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email, contrasenia: newPassword })
        })
        .then(response => {
            return response.json(); // Esperar una respuesta JSON
        })
        .then(data => {
            if (data.error) {
                messageDiv.textContent = data.error;
                messageDiv.style.color = 'red';
            } else {
                messageDiv.textContent = data.message || 'Contraseña actualizada con éxito.';
                messageDiv.style.color = 'green';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Error al procesar la solicitud. Intente de nuevo más tarde.';
            messageDiv.style.color = 'red';
        });
    });
});
