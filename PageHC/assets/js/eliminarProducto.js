const token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNTIyODg1NCwiZXhwIjoxNzE1MjQ2ODU0fQ.GhDx1KqhUiYxP4zywIVkrDG1dMJgaQmzL7HBTs71c-8';

function eliminarProducto(idProducto) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmacion) {
        fetch(`http://localhost:3300/api/articulos/eliminarArticulo/${idProducto}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            alert('Producto eliminado correctamente.');
            location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el producto: ' + error.message);
        });
    }
}

document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', function() {
        const idProducto = this.getAttribute('data-id'); 
        eliminarProducto(idProducto);
    });
});
