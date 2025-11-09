document.addEventListener('DOMContentLoaded', () => {
  
  const form = document.getElementById('formRegistro');

 
  form.addEventListener('submit', (e) => {
 
    e.preventDefault();

    const nombre = (document.getElementById('nombre')?.value || '').trim();
    const emailRaw = (document.getElementById('email')?.value || '').trim();

    const email = emailRaw.toLowerCase();

    const pass = (document.getElementById('pass')?.value || '');
    const pass2 = (document.getElementById('pass2')?.value || '');

    if (!nombre) { alert('Ingresá tu nombre.'); return; }
    if (!email) { alert('Ingresá tu correo electrónico.'); return; }
    if (!pass || !pass2) { alert('Ingresá la contraseña y confirmala.'); return; }

    //(algo@dominio.com)
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

    // Busca los usuarios que ya están registrados en la memoria temporal del navegador
    const usersJSON = sessionStorage.getItem('usuarios');
    let usuarios = {};
    
    // Convierte el texto guardado en un objeto de JavaScript
    if (usersJSON) {
      try {
        const parsed = JSON.parse(usersJSON);

        //SI LOS DATOS SON UNA LISTA DE USUARIOS
        if (Array.isArray(parsed)) {
          parsed.forEach(u => {
            if (u && u.email) usuarios[(u.email || '').toLowerCase()] = u;
          });

        } else if (parsed && typeof parsed === 'object') {
          usuarios = parsed;
        }

      } catch (err) {

        // Si hay algún error al leer los usuarios, empezamos con una lista vacía
        console.error('Error leyendo usuarios desde sessionStorage:', err);
        usuarios = {};
      }
    }

    if (usuarios[email]) {
      alert('Ya existe una cuenta con ese correo. Iniciá sesión o usá otro correo.');
      return;
    }

    // Crea un nuevo usuario con los datos ingresados
    usuarios[email] = {
      nombre,          // El nombre
      email,          // El correo
      password: pass,  // La contraseña
      creadoEn: new Date().toISOString()  // Fecha y hora de creación de la cuenta
    };

    
    try {
      // Convierte el objeto de usuarios a texto para poder guardarlo
      sessionStorage.setItem('usuarios', JSON.stringify(usuarios));

    } catch (err) {

      console.error('No se pudo guardar usuarios en sessionStorage:', err);
      alert('Ocurrió un error al guardar la cuenta. Verificá el almacenamiento del navegador.');
      return;
    }

    
    alert('Cuenta creada con éxito. Ahora vas a ser redirigido al inicio de sesión.');
    window.location.href = 'login.html';
  });
});