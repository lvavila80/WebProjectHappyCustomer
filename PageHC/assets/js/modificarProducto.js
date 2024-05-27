document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNTI4MzQ2OSwiZXhwIjoxNzE1MzAxNDY5fQ.sm-8S0Id9WwJu5ADeKQX0bcrd9cP5k9Jh0r4iiYB034';

    const form = document.getElementById('modificarProducto');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const productoId = getQueryParam('id');
    if (productoId) {
        cargarProducto(productoId, token);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validarFormulario()) {
            if (confirm('¿Está seguro de que desea modificar este producto?')) {
                actualizarProducto(productoId, token);
            }
        } else {
            alert('Por favor, complete todos los campos requeridos.');
        }
    });
});

function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const color = document.getElementById('color').value.trim();
    const unidades = document.getElementById('unidades').value.trim();
    const precio = document.getElementById('precio').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const proveedor = document.getElementById('proveedor').value.trim();

    return nombre && marca && modelo && color && unidades && precio && categoria && proveedor;
}

function cargarProducto(id, token) {
    fetch(`http://localhost:3300/api/articulos/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('nombre').value = data.nombrearticulo;
        document.getElementById('marca').value = data.marca;
        document.getElementById('modelo').value = data.modelo;
        document.getElementById('color').value = data.color;
        document.getElementById('unidades').value = data.unidadesdisponibles;
        document.getElementById('precio').value = data.valorunitario;
        document.getElementById('categoria').value = data.categoria;
        document.getElementById('proveedor').value = data.proveedor;
    })
    .catch(error => console.error('Error al cargar los datos del producto:', error));
}





function actualizarProducto(id, token) {
    const productoActualizado = {
        id: id, 
        nombrearticulo: document.getElementById('nombre').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        color: document.getElementById('color').value,
        unidadesdisponibles: parseInt(document.getElementById('unidades').value),
        valorunitario: parseFloat(document.getElementById('precio').value),
        categoria: document.getElementById('categoria').value,
        proveedor: document.getElementById('proveedor').value
    };

    console.log("Datos del producto a actualizar:", productoActualizado);

    fetch(`http://localhost:3300/api/articulos/actualizarArticulo`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productoActualizado)
    })
    .then(response => {
        if (response.ok) {
            alert('Producto actualizado correctamente');
            window.location.href = 'modificarProducto.html';
        } else {
            return response.text().then(text => { throw new Error(text) });
        }
    })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto: ' + error.message);
    });
}

