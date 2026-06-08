// ===================================================
// JavaScript = el comportamiento / la interactividad
// Aquí haremos que un botón reaccione cuando se hace clic.
// ===================================================

// 1. "Agarramos" el botón del HTML usando su id ("miBoton")
const boton = document.getElementById("miBoton");

// 2. "Agarramos" el párrafo donde mostraremos el mensaje
const mensaje = document.getElementById("mensaje");

// 3. Creamos una variable para contar los clics. Empieza en 0.
let contador = 0;

// 4. Le decimos al botón: "cuando te hagan CLIC, ejecuta esta función"
boton.addEventListener("click", function () {

  // Cada clic suma 1 al contador
  contador = contador + 1;

  boton.style.backgroundColor = "#ebac25"; // Cambia el color del botón al hacer clic
  boton.textContent = "¡Gracias por hacer click!"; // Cambia el texto del botón al hacer clic

  // Cambiamos el texto del párrafo (esto SÍ se ve en la página)
  mensaje.textContent = "LE HAS DADO DURO A ESE RATON! " + contador + " veces! 🎉";

  // Bonus: esto escribe en la "consola" del navegador (para programadores)
  console.log("Clic número:", contador);
});
