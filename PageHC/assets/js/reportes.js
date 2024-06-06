document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { id: 1, producto: 'Teclado', cantidad: 150, precio: 35.00 },
        { id: 2, producto: 'Mouse', cantidad: 200, precio: 20.00 },
        { id: 3, producto: 'Monitor', cantidad: 50, precio: 150.00 },
        { id: 4, producto: 'CPU', cantidad: 80, precio: 400.00 },
        { id: 5, producto: 'Cargador', cantidad: 150, precio: 35.00 },
        { id: 6, producto: 'Pantalla', cantidad: 200, precio: 20.00 },
        { id: 7, producto: 'Memoria', cantidad: 50, precio: 150.00 },
        { id: 8, producto: 'Disco', cantidad: 80, precio: 400.00 }
    ];

    const tableBody = document.querySelector('#reportTable tbody');
    let rows = data.map(item => `<tr>
        <td>${item.id}</td>
        <td>${item.producto}</td>
        <td>${item.cantidad}</td>
        <td>${item.precio.toFixed(2)}</td>
    </tr>`).join('');

    tableBody.innerHTML = rows;

    renderCharts(data);
    document.getElementById('reportes').addEventListener('click', function() {
        generatePDF(data);
    });
});

function renderCharts(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const priceCtx = document.getElementById('priceChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.producto),
            datasets: [{
                label: 'Cantidad de Producto',
                data: data.map(item => item.cantidad),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });

    new Chart(priceCtx, {
        type: 'line',
        data: {
            labels: data.map(item => item.producto),
            datasets: [{
                label: 'Precio por Producto',
                data: data.map(item => item.precio),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });
}
function generatePDF(data) {
    const jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();

    // Configurar título y fecha en el documento
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text('HappyCostumer - Reporte de Productos', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`, 105, 25, { align: 'center' });

    // Detalles de los productos
    let y = 35; // Posición inicial de los detalles del producto en la página
    doc.setFontSize(14);
    doc.text('Detalle de Productos:', 105, y, { align: 'center' });
    y += 10; // Espacio para comenzar los detalles de los productos

    doc.setFontSize(11);
    data.forEach((item, index) => {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(`${item.id}. ${item.producto} - Cantidad: ${item.cantidad}, Precio: $${item.precio.toFixed(2)}`, 15, y);
        y += 7;
    });

    // Capturar imágenes de gráficos
    const quantityCanvas = document.getElementById('myChart');
    const priceCanvas = document.getElementById('priceChart');
    const quantityImgData = quantityCanvas.toDataURL('image/png');

    // Gráfico de cantidad de productos
    if (y + 100 <= 280) {
        y += 15; // Un pequeño espacio antes de colocar el gráfico
    } else {
        doc.addPage();
        y = 20;
    }
    doc.text('Gráfico de Cantidad de Productos', 105, y, { align: 'center' });
    doc.addImage(quantityImgData, 'PNG', 15, y + 10, 180, 90);

    // Gráfico de precios por producto en una nueva página
    doc.addPage();
    const priceImgData = priceCanvas.toDataURL('image/png');
    doc.text('Gráfico de Precios por Producto', 105, 20, { align: 'center' });
    doc.addImage(priceImgData, 'PNG', 15, 30, 180, 90);

    // Guardar PDF
    doc.save('reporte_happy_costumer.pdf');
}
