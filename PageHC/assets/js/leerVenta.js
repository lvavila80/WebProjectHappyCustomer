document.addEventListener('DOMContentLoaded', function() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzUzODk1NywiZXhwIjoxNzE3NTU2OTU3fQ.772PNHBY4DgjUAiR2HSRdad-76yRfibbLPDGJ5ynvVw';
    const url = 'http://localhost:3300/api/articulos/todos';

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
        const salesTableBody = document.querySelector('#tablaProveedores tbody');

        data.forEach(articulo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${articulo.nombrearticulo}</td>
                <td>${articulo.valorunitario.toFixed(2)}</td>
                <td>${articulo.unidadesdisponibles}</td>
                <td><input type="number" class="cantidad" data-precio="${articulo.valorunitario}" data-unidades="${articulo.unidadesdisponibles}" min="0" max="${articulo.unidadesdisponibles}" value="0"></td>
                <td class="totalArticulo">0.00</td>
            `;
            salesTableBody.appendChild(row);
        });

        document.querySelectorAll('.cantidad').forEach(input => {
            input.addEventListener('input', actualizarTotal);
        });

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
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al cargar los artículos: ' + error.message);
    });
});

