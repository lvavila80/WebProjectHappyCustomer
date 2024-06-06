document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault();  
    var confirmation = confirm('¿Estás seguro de que deseas salir?');
    if (confirmation) {
        window.location.href = 'HomePage.html'; 
    }
});
