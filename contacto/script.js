document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const asunto = document.getElementById("asunto").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const mensajeExito = document.getElementById("mensajeExito");

  if (!nombre || !email || !asunto || !mensaje) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ← corregido
  if (!emailValido.test(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  mensajeExito.textContent = "¡Mensaje enviado correctamente!";
  this.reset();

  setTimeout(() => mensajeExito.textContent = "", 3000);
  document.getElementById("volverBtn").addEventListener("click", function() {
  window.location.href ='../pagina_principal.html';
});

});

