// ===================================================
//  LISTA DE TAREAS  (con guardado en localStorage)
//
//  IDEA CLAVE: el array "tareas" es la FUENTE DE LA VERDAD.
//  - Agregar/borrar/tachar -> cambia el array y lo guarda.
//  - La pantalla SIEMPRE se redibuja a partir del array.
// ===================================================

// 1. Agarramos los elementos del HTML
const campo = document.getElementById("campoTarea");
const boton = document.getElementById("botonAgregar");
const lista = document.getElementById("listaTareas");

// 2. La FUENTE DE LA VERDAD: un array de tareas.
//    Cada tarea es un objeto: { texto: "...", completada: true/false }
//    Al iniciar, intentamos CARGAR lo que había guardado.
let tareas = cargar();

// 3. GUARDAR: convierte el array a texto (JSON) y lo mete en localStorage
function guardar() {
  // JSON.stringify convierte el array en texto para poder guardarlo
  localStorage.setItem("misTareas", JSON.stringify(tareas));
}

// 4. CARGAR: lee de localStorage y lo vuelve a convertir en array
function cargar() {
  const guardado = localStorage.getItem("misTareas");
  // Si hay algo guardado, lo convertimos de texto a array; si no, array vacío
  if (guardado) {
    return JSON.parse(guardado);
  } else {
    return [];
  }
}

function borrarTodo() {
  tareas = [];
  guardar();
  dibujar();
}

// 5. DIBUJAR: vacía la lista y la reconstruye desde el array "tareas"
function dibujar() {
  // Vaciamos la <ul> para no duplicar
  lista.innerHTML = "";

  // Recorremos CADA tarea del array
  tareas.forEach(function (tarea, indice) {
    // Creamos el <li>
    const li = document.createElement("li");
    li.textContent = tarea.texto;

    // Si la tarea está completada, la mostramos tachada
    if (tarea.completada) {
      li.style.textDecoration = "line-through";
    }
    // Si no está completada, contamos cuántas tareas pendientes hay y lo mostramos en el contador
   


    // Clic en la tarea = alternar completada (toggle), guardar y redibujar
    li.addEventListener("click", function () {
      tarea.completada = !tarea.completada; // invierte true/false
      guardar();
      dibujar();
    });

    // Botón borrar 🗑️
    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "🗑️";
    btnBorrar.className = "btn-borrar";

    // Clic en borrar = quitar esa tarea del array (por su índice), guardar y redibujar
    btnBorrar.addEventListener("click", function (evento) {
      evento.stopPropagation();   // evita que el clic también tache la tarea
      tareas.splice(indice, 1);   // quita 1 elemento en la posición "indice"
      guardar();
      dibujar();
    });

    li.appendChild(btnBorrar);
    lista.appendChild(li);
  });
  let pendientes = 0;
  tareas.forEach(tarea => {
    if (!tarea.completada) {
      pendientes++;
    }
  });
  document.getElementById("contador").textContent = "Tienes " + pendientes + " tareas pendientes.";
}

// 6. AGREGAR: añade una tarea al array, guarda y redibuja
function agregarTarea() {
  const texto = campo.value;

  if (texto === "") {
    alert("¡Escribe una tarea primero!");
    return;
  }

  // Metemos un nuevo objeto al array
  tareas.push({ texto: texto, completada: false });

  guardar();   // persistimos el cambio
  dibujar();   // actualizamos la pantalla

  campo.value = ""; // limpiamos el campo
}

// 7. Conectamos eventos
boton.addEventListener("click", agregarTarea);
campo.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    agregarTarea();
  }
});

const botonBorrarfull = document.getElementById("botonBorrarfull");
botonBorrarfull.addEventListener("click", borrarTodo);

// 8. ¡IMPORTANTE! Al cargar la página, dibujamos lo que ya estaba guardado
dibujar();
