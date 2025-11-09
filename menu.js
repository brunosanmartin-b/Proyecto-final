// Script para abrir/cerrar el menú responsive
const menuToggle = document.getElementById('menu-toggle');// Selector del botón de menú
const menu = document.getElementById('menu');// Selector del menú

// Alterna la clase 'active' para mostrar/ocultar el menú

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');// Alterna la visibilidad del menú
});

// Cierra el menú al hacer clic en un enlace (opcional)
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('active'));// Cierra el menú al seleccionar un enlace
});