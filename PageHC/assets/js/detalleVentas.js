document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzYxMTU3MiwiZXhwIjoxNzE3NjI5NTcyfQ.zSu0IdsTbxp5FY8_0fOTchIsmby6MpRpylWE2nBtJFc';
    const urlVentas = 'http://localhost:3300/api/ventas/detalleVentasCombinado';

    function cargarVentas() {
        fetch(urlVentas, {
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
            const tablaVentas1 = document.getElementById('tablaVentas1').getElementsByTagName('tbody')[0];
            const tablaVentas2 = document.getElementById('tablaVentas2').getElementsByTagName('tbody')[0];
            const tablaVentas3 = document.getElementById('tablaVentas3').getElementsByTagName('tbody')[0];

            tablaVentas1.innerHTML = '';
            tablaVentas2.innerHTML = '';
            tablaVentas3.innerHTML = '';

            data.forEach(venta => {
                const fechaVenta = new Date(venta.fechaVenta);
                const fechaFormateada = `${fechaVenta.getFullYear()}-${padNumber(fechaVenta.getMonth() + 1)}-${padNumber(fechaVenta.getDate())}`;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${venta.idVenta}</td>
                    <td>${venta.idArticulo}</td>
                    <td>${venta.unidadesVendidas}</td>
                    <td>${venta.valorTotal}</td>
                    <td>${fechaFormateada}</td>
                    <td>
                        ${venta.estado === 1 ? `<button class="btn-edit" onclick="cambiarEstado(${venta.idVenta}, ${venta.idArticulo}, 2)"><ion-icon name="checkmark-outline"></ion-icon></button>` : ''}
                        ${venta.estado === 1 ? `<button class="btn-delete" onclick="cambiarEstado(${venta.idVenta}, ${venta.idArticulo}, 3)"><ion-icon name="close-outline"></ion-icon></button>` : ''}
                        ${venta.estado === 2 ? `<button class="btn-reverse" onclick="reverseCompra(${venta.idVenta}, ${venta.idArticulo})"><ion-icon name="arrow-undo-circle-outline"></ion-icon></button>` : ''}
                    </td>
                `;
                if (venta.estado === 1) {
                    tablaVentas1.appendChild(tr);
                } else if (venta.estado === 2) {
                    tablaVentas2.appendChild(tr);
                } else if (venta.estado === 3 || venta.estado === 4) {
                    tablaVentas3.appendChild(tr);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar las ventas:', error);
            alert('Error al cargar las ventas: ' + error.message);
        });
    }

    function padNumber(number) {
        return number < 10 ? '0' + number : number;
    }

    window.cambiarEstado = function(idVenta, idArticulo, nuevoEstado) {
        let mensajeConfirmacion = '';

        switch (nuevoEstado) {
            case 2:
                mensajeConfirmacion = '¿Está seguro de que desea confirmar la venta?';
                break;
            case 3:
                mensajeConfirmacion = '¿Está seguro de que desea cancelar la venta?';
                break;
            default:
                console.error('Estado no válido:', nuevoEstado);
                return;
        }
    
        if (confirm(mensajeConfirmacion)) {
            console.log('Cambiar estado:', idVenta, idArticulo, nuevoEstado);
            const url = 'http://localhost:3300/api/ventas/estadoVenta';
            const data = {
                operacion: idVenta,
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
                    return response.json().then(text => { throw new Error(text.error) });
                }
                return response.json();
            })
            .then(responseData => {
                console.log('Respuesta recibida:', responseData);
                cargarVentas();
            })
            .catch(error => {
                console.error('Error al cambiar el estado:', error);
                console.log('Detalles del error:', error.message);
                alert('Error al cambiar el estado: ' + error.message);
            });
        }
    }

    window.reverseCompra = function(idVenta, idArticulo) {
        if (confirm('¿Está seguro de que desea reversar la venta?')) {
            const url = 'http://localhost:3300/api/ventas/devolucionVenta';
            const data = {
                idVenta: idVenta,
                motivoReversion: 'Motivo de la reversión',  // Puedes ajustar esto según sea necesario
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
                    return response.json().then(text => { throw new Error(text.error) });
                }
                return response.json();
            })
            .then(responseData => {
                console.log('Respuesta recibida:', responseData);
                cargarVentas();
            })
            .catch(error => {
                console.error('Error al reversar la venta:', error);
                console.log('Detalles del error:', error.message);
                alert('Error al reversar la venta: ' + error.message);
            });
        }
    }

    cargarVentas();
});
