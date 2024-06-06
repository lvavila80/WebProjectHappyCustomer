document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('insertarProveedor');
    const errorMessage = document.getElementById('error-message'); 
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbXJpYW5vNDFAdWNhdG9saWNhLmVkdS5jbyIsImlhdCI6MTcxNzcxNDY5NiwiZXhwIjoxNzE3NzMyNjk2fQ.QwDJl8UY08-8o5gBgopnK4F1sRunneK_sTjnA9PpnzI';
    
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      let isValid = true;
      errorMessage.innerHTML = ""; 
  
      const nombre = document.getElementById('nombre').value;
      const identificacion = document.getElementById('identificación').value;
      const telefono = document.getElementById('telefono').value;
      const correo = document.getElementById('correo').value;
  
      if (nombre === "") {
        errorMessage.innerHTML += "El nombre del proveedor es obligatorio. <br>";
        isValid = false;
      }
  
      if (isNaN(identificacion) || identificacion === "") {
        errorMessage.innerHTML += "La identificación debe ser un número válido. <br>";
        isValid = false;
      }
  
      if (isNaN(telefono) || telefono === "") {
        errorMessage.innerHTML += "El teléfono debe ser un número válido. <br>";
        isValid = false;
      }
  
      if (!emailRegex.test(correo)) {
        errorMessage.innerHTML += "El correo electrónico no tiene un formato válido. <br>";
        isValid = false;
      }
  
      if (isValid) {
        const proveedor = {
          nombre: nombre,
          identificacion: parseInt(identificacion),
          telefono: parseInt(telefono),
          correo: correo
        };
  
        fetch('http://localhost:3300/api/proveedores/createProveedor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(proveedor)
        })
          .then(response => {
            if (response.ok) {
              alert('Proveedor insertado correctamente');
              form.reset();
            } else {
              return response.text().then(text => {
                errorMessage.innerHTML += text;
                console.error('Error:', text);
              });
            }
          })
          .catch(error => {
            console.error('Error:', error);
            errorMessage.innerHTML += "Error al insertar el proveedor: " + error.message;
          });
      }
    });
});
