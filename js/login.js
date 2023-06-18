const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    
    // Construir el objeto de datos para el inicio de sesión
    const loginData = {
        Email: email,
        Password: password
    };

    // URL de la API para el inicio de sesión
    const url = "http://api.medicalsantacruz.com/auth/login";

    // Opciones de la solicitud HTTP
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    };

    // Función para procesar la respuesta de la solicitud HTTP
    function handleResponse(response) {
        if (response.ok) {
            // Si la respuesta es exitosa (código de estado 200-299)
            console.log("Inicio de sesión exitoso");

            // Obtener el token de la respuesta JSON
            response.json().then(data => {
                const token = data.token;

                // Guardar el token en sessionStorage
                sessionStorage.setItem("token", token);

                // Redirigir a la página principal
                window.location.href = 'index.html';
                localStorage.setItem('login_success', JSON.stringify(loginData))
            });
        } else {
            console.log("Inicio de sesión fallido");
            // Aquí puedes manejar el caso de inicio de sesión fallido
            alert('Usuario y/o contraseña incorrectos!');
        }
    }

    // Realizar la solicitud HTTP
    fetch(url, options)
        .then(handleResponse)
        .catch(error => {
            console.error("Error en la solicitud:", error);
            // Manejar errores de la solicitud
        });
});
