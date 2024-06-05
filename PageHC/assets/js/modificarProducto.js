document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNjMyNzYxOCwiZXhwIjoxNzE2MzQ1NjE4fQ.UDITRZ9pJRXIT7dLem-Be3s0NOG7kPw9nSphEEo1OjI"';

    const form = document.getElementById('modificarProducto');

    if (!form) {
        console.error("Formulario con ID 'modificarProducto' no encontrado.");
        return;
    }

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
    const inputs = ['nombre', 'marca', 'modelo', 'color', 'unidades', 'precio'];
    return inputs.every(inputId => {
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            const value = inputElement.value.trim();
            return !!value; // Verifica si el valor no está vacío
        } else {
            console.error(`Elemento con ID ${inputId} no encontrado.`);
            return false;
        }
    });
}

function cargarProducto(id, token) {
    fetch(`http://localhost:3300/api/articulos/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar los datos del producto.');
        }
        return response.json();
    })
    .then(data => {
        const fields = [
            { id: 'nombre', value: data.nombrearticulo },
            { id: 'marca', value: data.marca },
            { id: 'modelo', value: data.modelo },
            { id: 'color', value: data.color },
            { id: 'unidades', value: data.unidadesdisponibles },
            { id: 'precio', value: data.valorunitario }
        ];

        fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element) {
                element.value = field.value;
            } else {
                console.error(`Elemento con ID ${field.id} no encontrado.`);
            }
        });
    })
    .catch(error => {
        console.error('Error al cargar los datos del producto:', error);
        alert('Error al cargar los datos del producto. Por favor, inténtelo de nuevo.');
    });
}

function actualizarProducto(id, token) {
    const nombre = document.getElementById('nombre').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const color = document.getElementById('color').value;
    const unidades = document.getElementById('unidades').value;
    const precio = document.getElementById('precio').value;

    const productoActualizado = {
        articulo: {
            nombrearticulo: nombre,
            marca: marca,
            modelo: modelo,
            color: color,
            unidadesdisponibles: parseInt(unidades),
            valorunitario: parseFloat(precio)
        },
        idCategoria: 2
    };

    fetch(`http://localhost:3300/api/articulos/actualizarArticulo/${id}`, {
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
            window.location.href = 'inventario.html';
        } else {
            return response.text().then(text => { throw new Error(text) });
        }
    })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto: ' + error.message);
    });
}
