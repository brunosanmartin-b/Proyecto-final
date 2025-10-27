// login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formLogin');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailRaw = (document.getElementById('email')?.value || '').trim();
    const email = emailRaw.toLowerCase();
    const pass = (document.getElementById('pass')?.value || '');

    if (!email) { alert('Ingresá tu correo.'); return; }
    if (!pass) { alert('Ingresá tu contraseña.'); return; }

    // Cargar usuarios desde sessionStorage (no persisten al cerrar la ventana)
    const usersJSON = sessionStorage.getItem('usuarios');
    let usuarios = {};
    if (usersJSON) {
      try {
        const parsed = JSON.parse(usersJSON);
        if (Array.isArray(parsed)) {
          parsed.forEach(u => {
            if (u && u.email) usuarios[(u.email || '').toLowerCase()] = u;
          });
        } else if (parsed && typeof parsed === 'object') {
          usuarios = parsed;
        }
      } catch (err) {
        console.error('Error parseando usuarios desde sessionStorage:', err);
        usuarios = {};
      }
    }

    const usuario = usuarios[email];

    if (!usuario) {
      alert('No existe una cuenta con ese correo. Registrate primero.');
      return;
    }

    if (String(usuario.password) !== String(pass)) {
      alert('Contraseña incorrecta.');
      return;
    }

    // Inicio de sesión exitoso
    alert('Inicio de sesión exitoso. Vas a ser redirigido a la página principal.');

    // Guardar info de sesión en sessionStorage (no persiste al cerrar la ventana)
    sessionStorage.setItem('usuarioLogueado', JSON.stringify({
      email: usuario.email,
      nombre: usuario.nombre,
      iniciadoEn: new Date().toISOString()
    }));

    // Redirigir a la página principal
    window.location.href = '../pagina_principal.html';
  });
});
