document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzUzODk1NywiZXhwIjoxNzE3NTU2OTU3fQ.772PNHBY4DgjUAiR2HSRdad-76yRfibbLPDGJ5ynvVw';

    const urlParams = new URLSearchParams(window.location.search);
    const idProveedor = urlParams.get('id');

    function obtenerProveedor(id) {
        fetch(`http://localhost:3300/api/proveedores/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('identificacion').value = data.identificacion;
            document.getElementById('telefono').value = data.telefono;
            document.getElementById('correo').value = data.correo;
        })
        .catch(error => {
            console.error('Error al obtener los datos del proveedor:', error);
            alert('Error al obtener los datos del proveedor: ' + error.message);
        });
    }

    function modificarProveedor(id, proveedor) {
        fetch(`http://localhost:3300/api/proveedores/updateProveedor/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(proveedor)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.text();
        })
        .then(responseMessage => {
            alert('Proveedor modificado correctamente: ' + responseMessage);
            window.location.href = 'proveedores.html';
        })
        .catch(error => {
            console.error('Error al modificar el proveedor:', error);
            document.getElementById('error-message').textContent = 'Error al modificar el proveedor: ' + error.message;
        });
    }

    document.getElementById('modificarProveedor').addEventListener('submit', function(event) {
        event.preventDefault();

        const proveedor = {
            nombre: document.getElementById('nombre').value,
            identificacion: parseInt(document.getElementById('identificacion').value),
            telefono: parseInt(document.getElementById('telefono').value),
            correo: document.getElementById('correo').value
        };

        modificarProveedor(idProveedor, proveedor);
    });

    obtenerProveedor(idProveedor);
});
