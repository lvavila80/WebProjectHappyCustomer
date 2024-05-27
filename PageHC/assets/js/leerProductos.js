document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNTIyODg1NCwiZXhwIjoxNzE1MjQ2ODU0fQ.GhDx1KqhUiYxP4zywIVkrDG1dMJgaQmzL7HBTs71c-8';

    function cargarDatos() {
        const url = 'http://localhost:3300/api/articulos/todos';
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
            const tbody = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            data.forEach(articuloInventario => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${articuloInventario.nombrearticulo}</td>
                    <td>${articuloInventario.marca}</td>
                    <td>${articuloInventario.modelo}</td>
                    <td>${articuloInventario.color}</td>
                    <td>${articuloInventario.unidadesdisponibles}</td>
                    <td>${articuloInventario.valorunitario}</td>
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
