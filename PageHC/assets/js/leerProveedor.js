document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzYxMTU3MiwiZXhwIjoxNzE3NjI5NTcyfQ.zSu0IdsTbxp5FY8_0fOTchIsmby6MpRpylWE2nBtJFc';
    
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
                        <button class="btn-edit" data-id="${proveedor.id}"><ion-icon name="pencil-outline"></ion-icon></button>
                        <button class="btn-delete" data-id="${proveedor.id}"><ion-icon name="trash-outline"></ion-icon></button>
                    </td>
                `;
                tablaProveedoresBody.appendChild(row);
            });

            agregarEventosEditar();
            agregarEventosEliminar();
        })
        .catch(error => {
            console.error('Error al cargar los proveedores:', error);
            alert('Error al cargar los proveedores: ' + error.message);
        });
    }

    function agregarEventosEditar() {
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', function() {
                const idProveedor = this.getAttribute('data-id');
                window.location.href = `modificarProveedor.html?id=${idProveedor}`;
            });
        });
    }

    function agregarEventosEliminar() {
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', function() {
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

