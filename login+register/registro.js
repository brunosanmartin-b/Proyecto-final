// registro.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formRegistro');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = (document.getElementById('nombre')?.value || '').trim();
    const emailRaw = (document.getElementById('email')?.value || '').trim();
    const email = emailRaw.toLowerCase();
    const pass = (document.getElementById('pass')?.value || '');
    const pass2 = (document.getElementById('pass2')?.value || '');

    // Validaciones obligatorias
    if (!nombre) { alert('Ingresá tu nombre.'); return; }
    if (!email) { alert('Ingresá tu correo electrónico.'); return; }
    if (!pass || !pass2) { alert('Ingresá la contraseña y confirmala.'); return; }

    // Validar formato simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Ingresá un correo electrónico válido.');
      return;
    }

    if (pass !== pass2) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (pass.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Usar sessionStorage para que los datos NO persistan al cerrar la ventana
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

    // Evitar registro de email repetido
    if (usuarios[email]) {
      alert('Ya existe una cuenta con ese correo. Iniciá sesión o usá otro correo.');
      return;
    }

    // Crear usuario (en este entorno local se guarda en sessionStorage)
    usuarios[email] = {
      nombre,
      email,
      password: pass,
      creadoEn: new Date().toISOString()
    };

    // Guardar en sessionStorage (no persiste al cerrar la pestaña/ventana)
    try {
      sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
    } catch (err) {
      console.error('No se pudo guardar usuarios en sessionStorage:', err);
      alert('Ocurrió un error al guardar la cuenta. Verificá el almacenamiento del navegador.');
      return;
    }

    // Mostrar mensaje de éxito y redirigir a login
    alert('Cuenta creada con éxito. Ahora vas a ser redirigido al inicio de sesión.');
    window.location.href = 'login.html';
  });
});