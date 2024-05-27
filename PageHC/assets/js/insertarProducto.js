const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNTI4MzQ2OSwiZXhwIjoxNzE1MzAxNDY5fQ.sm-8S0Id9WwJu5ADeKQX0bcrd9cP5k9Jh0r4iiYB034';

function insertarProducto(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const color = document.getElementById('color').value;
    const unidades = parseInt(document.getElementById('unidades').value);
    const precio = parseFloat(document.getElementById('precio').value);

    if (!nombre || !marca || !modelo || !color || isNaN(unidades) || isNaN(precio)) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }

    const confirmacion = confirm("¿Estás seguro de que deseas insertar el producto?");
    if (confirmacion) {
        const datosCompra = {
            "articulosCompra": [
                {
                    "articulo": {
                        "nombrearticulo": nombre,
                        "marca": marca,
                        "modelo": modelo,
                        "color": color,
                        "unidaddemedida": "Unidades"
                    },
                    "unidadesCompradas": unidades,
                    "valorUnidad": precio,
                    "idCategoria": 1,
                    "estado": 1
                }
            ],
            "idProveedor": 1,
            "idUsuario": 1
        };

        fetch('http://localhost:3300/api/compras/registrarCompra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosCompra)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) }); 
            }
            return response.json();
        })
        .then(data => {
            console.log('Producto insertado:', data);
            alert('Producto insertado correctamente.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al insertar producto: ' + error.message);
        });
    } else {
        alert('Inserción de producto cancelada.');
    }
}

document.getElementById('btnInsertarProducto').addEventListener('click', insertarProducto);
