document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzUxODQ4MiwiZXhwIjoxNzE3NTM2NDgyfQ.b89W9ucNHylylCWVVTg4x98NpZ3F4H9_8zLRw3iHylk';

    function cargarDatos() {
        const url = 'http://localhost:3300/api/proveedores/all';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok, status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            const tbody = document.getElementById('tablaProveedores').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            data.forEach(proveedor => {
                const tr = document.createElement('tr');
                tr.innerHTML = `

                    <td>${proveedor.nombre}</td>
                    <td>${proveedor.identificacion}</td>
                    <td>${proveedor.telefono}</td>
                    <td>${proveedor.correo}</td>
                    <td>
                        <button class="btn-edit"><ion-icon name="pencil-outline"></ion-icon></button>
                        <button class="btn-delete"><ion-icon name="trash-outline"></ion-icon></button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar datos: ' + error.message);
        });
    }

    cargarDatos();
});