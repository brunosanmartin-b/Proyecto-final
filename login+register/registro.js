document.addEventListener('DOMContentLoaded', () => {

    const formRegistro = document.getElementById('formRegistro');

    formRegistro.addEventListener('submit', (e) => {
        
        e.preventDefault(); // evita que se recargue la página

        // tomamos los valores de los inputs
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const pass = document.getElementById('pass').value.trim();
        const pass2 = document.getElementById('pass2').value.trim();

        // validamos que los campos no estén vacíos
        if (nombre === '' || email === '' || pass === '' || pass2 === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // validamos el formato del email con una expresión regular sencilla
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValido.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // validamos que las contraseñas coincidan
        if (pass !== pass2) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // guardamos los datos en localStorage simulando una "base de datos"
        const usuario = {
        nombre: nombre,
        email: email,
        pass: pass
        };

        localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));

        alert('Registro exitoso. Ahora podés iniciar sesión.');
        window.location.href = 'login.html'; // redirige al login

    });

});
