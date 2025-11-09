document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
// Evita el envío del formulario por defecto
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const asunto = document.getElementById("asunto").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const mensajeExito = document.getElementById("mensajeExito");
// Selecciona los valores de los campos del formulario
  if (!nombre || !email || !asunto || !mensaje) {
    alert("Por favor, completa todos los campos.");
    return;
  }
// Validación básica de campos vacíos
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ← corregido
  if (!emailValido.test(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }
// Validación básica de formato de correo electrónico
  mensajeExito.textContent = "¡Mensaje enviado correctamente!";
  this.reset();// Limpia el formulario

  setTimeout(() => mensajeExito.textContent = "", 3000);// Limpia el mensaje de éxito después de 3 segundos
  document.getElementById("volverBtn").addEventListener("click", function() {
  window.location.href ='../pagina_principal.html';// Redirige a la página principal
});

});

