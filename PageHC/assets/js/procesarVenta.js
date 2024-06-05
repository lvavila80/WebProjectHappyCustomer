document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('procesarVenta').addEventListener('click', function() {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzYxMTU3MiwiZXhwIjoxNzE3NjI5NTcyfQ.zSu0IdsTbxp5FY8_0fOTchIsmby6MpRpylWE2nBtJFc';
        const url = 'http://localhost:3300/api/ventas/nuevaVenta';
        
        let articulosVenta = [];
        
        document.querySelectorAll('#tablaProveedores tbody tr').forEach(row => {
            const cantidadInput = row.querySelector('.cantidad');
            const cantidad = parseFloat(cantidadInput.value);
            const articulo = cantidadInput.dataset.articuloId;
            
            if (cantidad > 0) {
                articulosVenta.push({
                    articulo: parseInt(articulo),
                    unidadesVendidas: cantidad,
                    estado: 1
                });
            }
        });

        if (articulosVenta.length === 0) {
            alert('Debe agregar al menos una unidad de cualquier producto para procesar la venta.');
            return;
        }

        const ventaData = {
            articulosVenta: articulosVenta,
            idUsuario: 1,  // Reemplaza con el ID del usuario actual
            idCliente: 1   // Reemplaza con el ID del cliente actual
        };

        fetch(url, {
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
    });
});
