const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzcxNDY5NiwiZXhwIjoxNzE3NzMyNjk2fQ.QwDJl8UY08-8o5gBgopnK4F1sRunneK_sTjnA9PpnzI';
    
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
                articulosCompra: [
                    {
                        articulo: {
                            nombrearticulo: nombre,
                            marca: marca,
                            modelo: modelo,
                            color: color,
                            unidaddemedida: "Unidades"
                        },
                        unidadesCompradas: unidades,
                        valorUnidad: precio,
                        idCategoria: 1,
                        estado: 1
                    }
                ],
                idProveedor: 1,
                idUsuario: 1
            };

            console.log('datosCompra:', datosCompra);

            try {
                const jsonBody = JSON.stringify(datosCompra);
                console.log('JSON Body:', jsonBody);

                fetch('http://localhost:3300/api/compras/registrarCompra', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: jsonBody
                })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
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
            } catch (jsonError) {
                console.error('Error al crear JSON:', jsonError);
                alert('Error al crear JSON: ' + jsonError.message);
            }
        } else {
            alert('Inserción de producto cancelada.');
        }
    }

    document.getElementById('btnInsertarProducto').addEventListener('click', insertarProducto);

