<<<<<<< HEAD
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNjMyNzYxOCwiZXhwIjoxNzE2MzQ1NjE4fQ.UDITRZ9pJRXIT7dLem-Be3s0NOG7kPw9nSphEEo1OjI"';
=======
document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzYxMTU3MiwiZXhwIjoxNzE3NjI5NTcyfQ.zSu0IdsTbxp5FY8_0fOTchIsmby6MpRpylWE2nBtJFc';
    
    function insertarProducto(event) {
        event.preventDefault();
>>>>>>> Laura

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
<<<<<<< HEAD
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
            return response.text().then(text => {
                if (!response.ok) {
                    throw new Error(text);
                }
                try {
                    return JSON.parse(text);
                } catch (e) {
                    throw new Error('Respuesta no es JSON: ' + text);
                }
            });
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
=======
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
>>>>>>> Laura
    }

    document.getElementById('btnInsertarProducto').addEventListener('click', insertarProducto);
});
