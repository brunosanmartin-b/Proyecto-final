document.getElementById("recargar").addEventListener("click", () => {
  const monto = parseFloat(prompt("¿Cuánto querés recargar?"));
  if (!isNaN(monto) && monto > 0) {
    const saldo = document.getElementById("saldo");
    saldo.textContent = parseFloat(saldo.textContent) + monto;
    alert("Recargaste $" + monto);
  } else {
    alert("Monto inválido");
  }
});
