// Archivo: verification.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('verificationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const verificationCode = document.getElementById('verificationCode').value;

        // Aquí necesitas cambiar la URL a la de tu endpoint específico
        fetch('localhost:3200/api/usuarios/confirmarregistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: verificationCode })
        })
        .then(response => response.text())  // Primero obtén el texto
        .then(text => {
            try {
                return JSON.parse(text);  // Intenta parsear el texto a JSON
            } catch (error) {
                throw new Error('La respuesta del servidor no es un JSON válido: ' + text);
            }
        })
        .then(data => {
            if (data.success) {
                displayMessage("Verificación exitosa. Su cuenta ha sido activada.", "success");
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Error al enviar los datos: ' + error.message, "error");
        });
    });

    function displayMessage(message, type) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.className = ''; // Limpiar clases anteriores
        messageDiv.classList.add(type); // Agregar clase basada en el tipo de mensaje
    }
});
