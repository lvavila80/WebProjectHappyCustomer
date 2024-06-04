document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('recoveryForm');
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = emailInput.value;

        messageDiv.textContent = "Se envió a su correo electrónico el token para recuperar su contraseña.";
        messageDiv.style.color = 'green';
        messageVerificarDiv.style.display = 'block';

        fetch('http://localhost:3200/api/usuarios/correoReestablecerContrasenia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            messageDiv.textContent = data.message || "Revise su correo electrónico para continuar con la recuperación de la contraseña.";
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Error al procesar la solicitud. Intente de nuevo más tarde.';
            messageDiv.style.color = 'red';
        });
    });
});
