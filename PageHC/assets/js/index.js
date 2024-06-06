document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzcxNDY5NiwiZXhwIjoxNzE3NzMyNjk2fQ.QwDJl8UY08-8o5gBgopnK4F1sRunneK_sTjnA9PpnzI';
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
            const tablaVentas2 = document.getElementById('tablaVentas2').getElementsByTagName('tbody')[0];

            tablaVentas2.innerHTML = '';

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
                `;
                if (venta.estado === 2) {
                    tablaVentas2.appendChild(tr);
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
