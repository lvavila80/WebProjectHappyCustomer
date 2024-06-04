document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzUzODk1NywiZXhwIjoxNzE3NTU2OTU3fQ.772PNHBY4DgjUAiR2HSRdad-76yRfibbLPDGJ5ynvVw';
  
    function cargarDatos() {
        const url = 'http://localhost:3300/api/compras/detalleCompra';
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
            const tablaCompras1 = document.getElementById('tablaCompras1').getElementsByTagName('tbody')[0];
            const tablaCompras2 = document.getElementById('tablaCompras2').getElementsByTagName('tbody')[0];
            const tablaCompras3 = document.getElementById('tablaCompras3').getElementsByTagName('tbody')[0];
            tablaCompras1.innerHTML = '';
            tablaCompras2.innerHTML = '';
            tablaCompras3.innerHTML = '';
            data.forEach(compra => {
                const fechaCompra = new Date(compra.fechacompra);
                const fechaFormateada = `${fechaCompra.getFullYear()}-${padNumber(fechaCompra.getMonth() + 1)}-${padNumber(fechaCompra.getDate())}`;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${compra.idcompra}</td>
                    <td>${compra.idarticulo}</td>
                    <td>${compra.nombreArticulo}</td>
                    <td>${compra.unidadescompradas}</td>
                    <td>${compra.valorunidad}</td>
                    <td>${compra.valortotal}</td>
                    <td>${fechaFormateada}</td>
                    <td>
                        ${compra.estado === 1 ? `<button class="btn-edit" onclick="cambiarEstado(${compra.idcompra}, ${compra.idarticulo}, 2)"><ion-icon name="checkmark-outline"></ion-icon></button>` : ''}
                        ${compra.estado === 1 ? `<button class="btn-delete" onclick="cambiarEstado(${compra.idcompra}, ${compra.idarticulo}, 3)"><ion-icon name="close-outline"></ion-icon></button>` : ''}
                        ${compra.estado === 2 ? `<button class="btn-reverse" onclick="reverseCompra(${compra.idcompra}, ${compra.idarticulo})"><ion-icon name="arrow-undo-circle-outline"></ion-icon></button>` : ''}
                    </td>
                `;
                if (compra.estado === 1) {
                    tablaCompras1.appendChild(tr);
                } else if (compra.estado === 2) {
                    tablaCompras2.appendChild(tr);
                } else if (compra.estado === 3 || compra.estado === 4) {
                    tablaCompras3.appendChild(tr);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar datos: ' + error.message);
        });
    }
    
    cargarDatos();
    
    function padNumber(number) {
        return number < 10 ? '0' + number : number;
    }

    window.cambiarEstado = function(idCompra, idArticulo, nuevoEstado) {
        let mensajeConfirmacion = '';

        switch (nuevoEstado) {
            case 2:
                mensajeConfirmacion = '¿Está seguro de que desea confirmar la compra?';
                break;
            case 3:
                mensajeConfirmacion = '¿Está seguro de que desea cancelar la compra?';
                break;
            default:
                console.error('Estado no válido:', nuevoEstado);
                return;
        }
    
        if (confirm(mensajeConfirmacion)) {
            console.log('Cambiar estado:', idCompra, idArticulo, nuevoEstado);
            const url = 'http://localhost:3300/api/compras/estadoCompra';
            const data = {
                operacion: idCompra,
                articulos: [
                    {
                        id: idArticulo,
                        estado: nuevoEstado
                    }
                ]
            };
            console.log('Datos a enviar:', JSON.stringify(data));
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok, status: ' + response.status);
                }
                return response.text();  
            })
            .then(responseText => {
                try {
                    const responseData = JSON.parse(responseText);
                    console.log('Respuesta recibida:', responseData);
                } catch (error) {
                    console.log('Respuesta no es un JSON:', responseText);
                }
                cargarDatos();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al cambiar el estado: ' + error.message);
            });
        }
    }

    window.reverseCompra = function(idCompra, idArticulo) {
        if (confirm('¿Está seguro de que desea reversar la compra?')) {
            const url = 'http://localhost:3300/api/compras/devolucionCompra';
            const data = {
                idCompra: idCompra,
                descripcion: 'precio',
                devuelto: [idArticulo]
            };
            console.log('Datos a enviar:', JSON.stringify(data));
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok, status: ' + response.status);
                }
                return response.text();  
            })
            .then(responseText => {
                try {
                    const responseData = JSON.parse(responseText);
                    console.log('Respuesta recibida:', responseData);
                } catch (error) {
                    console.log('Respuesta no es un JSON:', responseText);
                }
                cargarDatos();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al reversar la compra: ' + error.message);
            });
        }
    }
});




