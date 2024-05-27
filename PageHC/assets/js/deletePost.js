document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNTI4OTY1NCwiZXhwIjoxNzE1MzA3NjU0fQ.ddD7e8JeKuTniLHFOYD4P318u-MN72dskoWwRDTFutA';

    function cargarDatos() {
        const url = 'http://localhost:3300/api/articulos/todos';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tablaProductos tbody');
            tbody.innerHTML = '';
            data.forEach(producto => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${producto.nombrearticulo}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.modelo}</td>
                    <td>${producto.color}</td>
                    <td>${producto.unidadesdisponibles}</td>
                    <td>$${producto.valorunitario}</td>
                    <td>
                        <button class="btn-edit" data-id="${producto.id}">✏️</button>
                        <button class="btn-delete" data-id="${producto.id}">🗑️</button>
                    </td>
                `;
            });
            agregarEventosEliminar();
            agregarEventosEditar();
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            alert('Error al cargar los productos: ' + error.message);
        });
    }

    function agregarEventosEliminar() {
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', function() {
                const idProducto = this.getAttribute('data-id');
                eliminarProducto(idProducto);
            });
        });
    }

    function agregarEventosEditar() {
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', function() {
                const idProducto = this.getAttribute('data-id');
                if (confirm('¿Desea editar este producto?')) {
                    window.location.href = `modificarProducto.html?id=${idProducto}`;
                }
            });
        });
    }

    function eliminarProducto(idProducto) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmacion) {
            fetch('http://localhost:3300/api/articulos/eliminarArticulo', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: idProducto }) 
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.text(); 
            })
            .then(responseMessage => {
                alert('Producto eliminado correctamente: ' + responseMessage);
                cargarDatos();  
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
                alert('Error al eliminar el producto: ' + error.message);
            });
        }
    }

    cargarDatos();
});