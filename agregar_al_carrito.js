// Función para actualizar el contador del carrito en el badge
function actualizarContadorCarrito() {
  // Obtener el carrito del localStorage
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cantidad = carrito.length;
  
  // Buscar todos los badges del carrito (puede haber múltiples en diferentes páginas)
  const badges = document.querySelectorAll(".cart-badge");
  
  badges.forEach(badge => {
    if (cantidad > 0) {
      badge.textContent = cantidad;
      badge.style.display = "flex";
    } else {
      badge.textContent = "0";
      badge.style.display = "none";
    }
  });
}

// Función para agregar un juego al carrito
function agregarAlCarrito(nombre, precio) {
  // Obtener el carrito actual del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  // Crear el objeto del juego
  const juego = {
    nombre: nombre,
    precio: parseFloat(precio)
  };
  
  // Agregar el juego al carrito
  carrito.push(juego);
  
  // Guardar el carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  
  // Actualizar el contador del badge
  actualizarContadorCarrito();
  
  // Mostrar mensaje de confirmación
  alert(`¡${nombre} agregado al carrito!`);
  
  console.log("Carrito actualizado:", carrito);
}

// Función para extraer el precio del texto (elimina el símbolo $)
function extraerPrecio(textoPrecio) {
  // Eliminar el símbolo $ y espacios, luego convertir a número
  return textoPrecio.replace("$", "").trim();
}

// Función para inicializar los event listeners de los botones
function inicializarBotonesCarrito() {
  // Buscar todos los botones con clase "btn-cart" (catalogo.html)
  const botonesCart = document.querySelectorAll(".btn-cart");
  
  // Buscar todos los botones con clase "agregar-carrito" (pagina_principal.html)
  const botonesAgregar = document.querySelectorAll(".agregar-carrito");
  
  // Agregar event listeners a los botones de catálogo
  botonesCart.forEach(boton => {
    boton.addEventListener("click", function() {
      // Encontrar el contenedor del juego (el div padre con clase "juego")
      const contenedorJuego = boton.closest(".juego");
      
      if (contenedorJuego) {
        // Extraer el nombre del juego (del elemento h3)
        const nombreElemento = contenedorJuego.querySelector("h3");
        const nombre = nombreElemento ? nombreElemento.textContent.trim() : "";
        
        // Extraer el precio (del elemento strong dentro de un p)
        const precioElemento = contenedorJuego.querySelector("strong");
        const precioTexto = precioElemento ? precioElemento.textContent.trim() : "";
        const precio = extraerPrecio(precioTexto);
        
        if (nombre && precio) {
          agregarAlCarrito(nombre, precio);
        } else {
          alert("Error: No se pudo obtener la información del juego.");
        }
      }
    });
  });
  
  // Agregar event listeners a los botones de página principal
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", function() {
      // Encontrar el contenedor del juego (el div padre con clase "juego")
      const contenedorJuego = boton.closest(".juego");
      
      if (contenedorJuego) {
        // Extraer el nombre del juego (del elemento h3)
        const nombreElemento = contenedorJuego.querySelector("h3");
        const nombre = nombreElemento ? nombreElemento.textContent.trim() : "";
        
        // Extraer el precio (del elemento strong dentro de un p)
        const precioElemento = contenedorJuego.querySelector("strong");
        const precioTexto = precioElemento ? precioElemento.textContent.trim() : "";
        const precio = extraerPrecio(precioTexto);
        
        if (nombre && precio) {
          agregarAlCarrito(nombre, precio);
        } else {
          alert("Error: No se pudo obtener la información del juego.");
        }
      }
    });
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  inicializarBotonesCarrito();
  actualizarContadorCarrito();
  
  // Escuchar cambios en el localStorage (cuando se eliminan productos desde otras pestañas/ventanas)
  window.addEventListener("storage", (e) => {
    if (e.key === "carrito") {
      actualizarContadorCarrito();
    }
  });
});

