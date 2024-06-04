document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzUzODk1NywiZXhwIjoxNzE3NTU2OTU3fQ.772PNHBY4DgjUAiR2HSRdad-76yRfibbLPDGJ5ynvVw';

    function cargarDatos() {
        const url = 'http://localhost:3300/api/proveedores/all';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const tablaProveedoresBody = document.querySelector('#tablaProveedores tbody');
            tablaProveedoresBody.innerHTML = '';
            data.forEach(proveedor => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${proveedor.nombre}</td>
                    <td>${proveedor.identificacion}</td>
                    <td>${proveedor.telefono}</td>
                    <td>${proveedor.correo}</td>
                    <td>

                    </td>
                `;
                tablaProveedoresBody.appendChild(row);
            });

            agregarEventosEliminar();
        })
        .catch(error => {
            console.error('Error al cargar los proveedores:', error);
            alert('Error al cargar los proveedores: ' + error.message);
        });
    }

    function agregarEventosEliminar() {
        console.log("Agregando eventos de eliminar");
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', function() {
                console.log("Se hizo clic en el botón de eliminar");
                const idProveedor = this.getAttribute('data-id');
                eliminarProveedor(idProveedor);
            });
        });
    }

    function eliminarProveedor(idProveedor) {
        console.log("Eliminar proveedor llamado con ID:", idProveedor);
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este proveedor?");
        if (confirmacion) {
            fetch(`http://localhost:3300/api/proveedores/deleteProveedor/${idProveedor}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.text(); 
            })
            .then(responseMessage => {
                alert('Proveedor eliminado correctamente: ' + responseMessage);
                cargarDatos();  
            })
            .catch(error => {
                console.error('Error al eliminar el proveedor:', error);
                alert('Error al eliminar el proveedor: ' + error.message);
            });
        }
    }

    cargarDatos();
});
