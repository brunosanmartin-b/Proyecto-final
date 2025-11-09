
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('formLogin');


  form.addEventListener('submit', (e) => {

    e.preventDefault();


    const emailRaw = (document.getElementById('email')?.value || '').trim();
    const email = emailRaw.toLowerCase();
    

    const pass = (document.getElementById('pass')?.value || '');


    if (!email) { alert('Ingresá tu correo.'); return; }
    if (!pass) { alert('Ingresá tu contraseña.'); return; }


    const usersJSON = sessionStorage.getItem('usuarios');
    let usuarios = {};

    //DE TEXTO A DATO QUE JS PUEDA USAR
    if (usersJSON) {
      try {
        const parsed = JSON.parse(usersJSON);

        //SI LOS DATOS SON UNA LISTA DE USUARIOS
        if (Array.isArray(parsed)) {
          
          //DE LISTA A OBJETO
          //FACILITA LA BUSQUEDA POR CORREO
          parsed.forEach(u => {
            if (u && u.email) usuarios[(u.email || '').toLowerCase()] = u;
          });
        } 

        else if (parsed && typeof parsed === 'object') {
          usuarios = parsed;
        }

      } catch (err){
      
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


    alert('Inicio de sesión exitoso. Vas a ser redirigido a la página principal.');


    sessionStorage.setItem('usuarioLogueado', JSON.stringify({
      email: usuario.email,          
      nombre: usuario.nombre,        
      iniciadoEn: new Date().toISOString()  
    }));


    window.location.href = '../pagina_principal.html';
  });
});