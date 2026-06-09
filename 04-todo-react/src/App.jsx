import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // ESTADO 1: el array de tareas (la "fuente de la verdad", como antes).
  // Cada tarea es un objeto: { id, texto, completada }
  // El valor inicial lo LEEMOS de localStorage (si hay algo guardado).
  // Esta función solo se ejecuta UNA vez, al iniciar el componente.
  const [tareas, setTareas] = useState(() => {
    const guardado = localStorage.getItem('tareas')
    return guardado ? JSON.parse(guardado) : []
  })

  // ESTADO 2: el texto que el usuario está escribiendo en el input.
  // En React, el input se controla con el estado (se llama "input controlado").
  const [texto, setTexto] = useState('')

  // EFECTO: cada vez que "tareas" cambie, lo guardamos en localStorage.
  // El [tareas] al final significa: "ejecútate cuando 'tareas' cambie".
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])

  // Agregar una tarea nueva
  function agregarTarea() {
    if (texto === '') return  // si está vacío, no hacemos nada

    // Creamos la tarea nueva. Usamos Date.now() como id único.
    const nueva = { id: Date.now(), texto: texto, completada: false }
    console.log(nueva.id, nueva.texto)

    // ⚠️ IMPORTANTE en React: NO usamos .push().
    // Creamos un array NUEVO con lo de antes (...tareas) + la nueva.
    setTareas([...tareas, nueva])

    setTexto('')  // limpiamos el input
  }

  // Alternar completada (tachar/destachar) por id
  function alternar(id) {
    // Recorremos el array y devolvemos uno NUEVO con la tarea cambiada
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    )
  }

  // Borrar una tarea por id
  function borrar(id) {
    // filter devuelve un array nuevo SIN la tarea que coincide
    setTareas(tareas.filter((t) => t.id !== id))
  }

  // Contamos pendientes (las que NO están completadas)
  const pendientes = tareas.filter((t) => !t.completada).length

  function borrarCompletadas() {
    setTareas(tareas.filter((t) => !t.completada))
  }

  return (
    <div className="contenedor">
      <h1>📝  TODO LIST (React)</h1>
      <p>Tienes {pendientes} tareas pendientes</p>

      <div className="zona-agregar">
        {/* Input CONTROLADO: su valor es el estado, y onChange lo actualiza */}
        <input
          type="text"
          value={texto}
          placeholder="Escribe una tarea..."
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') agregarTarea() }}
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul>
        {/* .map() recorre el array y devuelve un <li> por cada tarea.
            Cada elemento de una lista necesita una "key" única (el id). */}
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <span
              onClick={() => alternar(tarea.id)}
              style={{
                textDecoration: tarea.completada ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {tarea.texto}

            </span>
            <button className="btn-borrar" onClick={() => borrar(tarea.id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
      <button onClick={borrarCompletadas}>
        🗑️ Borrar completadas
      </button>
    </div>
  )
}

export default App
