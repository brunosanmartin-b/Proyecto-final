function cargarCarrito() {
  const tbody = document.querySelector("#carrito tbody");
  tbody.innerHTML = "";

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.forEach(juego => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${juego.nombre}</td>
      <td class="precio">${juego.precio}</td>
      <td><button class="eliminar">Eliminar</button></td>
    `;
    tbody.appendChild(fila);
  });

  calcularTotal();
  activarBotonesEliminar();
}

function calcularTotal() {
  const precios = document.querySelectorAll(".precio");
  let total = 0;
  precios.forEach(precio => total += parseFloat(precio.textContent));
  document.getElementById("total").textContent = total.toFixed(2);
}

function activarBotonesEliminar() {
  document.querySelectorAll(".eliminar").forEach(boton => {
    boton.addEventListener("click", e => {
      const fila = e.target.closest("tr");
      const nombre = fila.querySelector("td").textContent;

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito = carrito.filter(juego => juego.nombre !== nombre);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      fila.remove();
      calcularTotal();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();

  document.getElementById("comprar").addEventListener("click", () => {
    const total = parseFloat(document.getElementById("total").textContent);
    const saldo = parseFloat(document.getElementById("saldo").textContent);

    if (total === 0) {
      alert("Tu carrito está vacío.");
    } else if (saldo >= total) {
      alert("¡Compra realizada con éxito!");
      document.getElementById("saldo").textContent = (saldo - total).toFixed(2);
      localStorage.removeItem("carrito");
      document.querySelector("tbody").innerHTML = "";
      calcularTotal();
    } else {
      alert("Saldo insuficiente. Recargá tu billetera.");
    }
  });

  // 🔙 Volver a la página principal
  document.getElementById("volver").addEventListener("click", () => {
    window.location.href = "../pagina_principal.html";
  });
});