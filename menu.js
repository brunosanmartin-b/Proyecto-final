// Script para abrir/cerrar el menú responsive
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Cierra el menú al hacer clic en un enlace (opcional)
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('active'));
});