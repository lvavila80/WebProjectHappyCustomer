document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzUzODk1NywiZXhwIjoxNzE3NTU2OTU3fQ.772PNHBY4DgjUAiR2HSRdad-76yRfibbLPDGJ5ynvVw';
    const urlArticulos = 'http://localhost:3300/api/articulos/todos';
    const urlVenta = 'http://localhost:3300/api/ventas/nuevaVenta';

    function cargarArticulos() {
        fetch(urlArticulos, {
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
            const salesTableBody = document.querySelector('#tablaProveedores tbody');

            data.forEach(articulo => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${articulo.nombrearticulo}</td>
                    <td>${articulo.valorunitario.toFixed(2)}</td>
                    <td>${articulo.unidadesdisponibles}</td>
                    <td><input type="number" class="cantidad" data-precio="${articulo.valorunitario}" data-unidades="${articulo.unidadesdisponibles}" data-articulo-id="${articulo.id}" min="0" max="${articulo.unidadesdisponibles}" value="0"></td>
                    <td class="totalArticulo">0.00</td>
                `;
                salesTableBody.appendChild(row);
            });

            document.querySelectorAll('.cantidad').forEach(input => {
                input.addEventListener('input', validarCantidad);
                input.addEventListener('input', actualizarTotal);
            });
        })
        .catch(error => {
            console.error('Error al cargar los artículos:', error);
            alert('Error al cargar los artículos: ' + error.message);
        });
    }

    function validarCantidad(event) {
        const input = event.target;
        const maxUnidades = parseFloat(input.dataset.unidades);
        const cantidad = parseFloat(input.value);

        if (cantidad > maxUnidades) {
            input.value = maxUnidades;
            alert('No puede vender más unidades de las disponibles.');
        }
    }

    function actualizarTotal() {
        let totalVenta = 0;
        document.querySelectorAll('#tablaProveedores tbody tr').forEach(row => {
            const cantidadInput = row.querySelector('.cantidad');
            const cantidad = parseFloat(cantidadInput.value);
            const precio = parseFloat(cantidadInput.dataset.precio);
            const unidadesDisponibles = parseFloat(cantidadInput.dataset.unidades);

            if (cantidad > unidadesDisponibles) {
                cantidadInput.value = unidadesDisponibles;
            }

            const totalArticulo = cantidad * precio;
            row.querySelector('.totalArticulo').innerText = totalArticulo.toFixed(2);
            totalVenta += totalArticulo;
        });
        document.getElementById('totalVenta').innerText = totalVenta.toFixed(2);
    }

    function procesarVenta() {
        const cantidades = document.querySelectorAll('.cantidad');
        let cantidadValida = false;

        cantidades.forEach(input => {
            if (parseFloat(input.value) > 0) {
                cantidadValida = true;
            }
        });

        if (!cantidadValida) {
            alert('Debe agregar al menos una unidad de cualquier producto para procesar la venta.');
            return;
        }

        let articulosVenta = [];

        cantidades.forEach(input => {
            const cantidad = parseFloat(input.value);
            if (cantidad > 0) {
                articulosVenta.push({
                    articulo: parseInt(input.dataset.articuloId),
                    unidadesVendidas: cantidad,
                    estado: 1
                });
            }
        });

        const ventaData = {
            articulosVenta: articulosVenta,
            idUsuario: 1,
            idCliente: 1
        };

        fetch(urlVenta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ventaData)
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
                console.log('Venta procesada:', responseData);
                alert('Venta procesada con éxito');
                location.reload();
            } catch (error) {
                console.log('Respuesta no es un JSON válido:', responseText);
                alert('Venta procesada con éxito');
                location.reload();
            }
        })
        .catch(error => {
            console.error('Error al procesar la venta:', error);
            alert('Error al procesar la venta: ' + error.message);
        });
    }

    document.getElementById('procesarVenta').addEventListener('click', procesarVenta);

    cargarArticulos();
});
