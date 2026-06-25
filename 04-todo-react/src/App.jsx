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
  const [filtro, setFiltro] = useState('todas')  // 'todas', 'pendientes', 'completadas'

    // ESTADO 2: el texto que el usuario está escribiendo en el input.
  // En React, el input se controla con el estado (se llama "input controlado").
  const [texto, setTexto] = useState('')
  const [prioridad, setPrioridad] = useState('baja') // 'baja', 'media', 'alta'
  const coloresPrioridad = {
    baja: 'green',
    media: 'orange',
    alta: 'red'
  }
  const [editingId, setEditingId] = useState(null)
  const [editTexto, setEditTexto] = useState('')
  const [fecha, setFecha] = useState('')
  

  // EFECTO: cada vez que "tareas" cambie, lo guardamos en localStorage.
  // El [tareas] al final significa: "ejecútate cuando 'tareas' cambie".
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])

  // Agregar una tarea nueva
  function agregarTarea() {
    if (texto === '') return  // si está vacío, no hacemos nada

    // Creamos la tarea nueva. Usamos Date.now() como id único.
    const nueva = { id: Date.now(), texto: texto, completada: false, prioridad: prioridad, fecha: fecha }
    console.log(nueva.id, nueva.texto, nueva.prioridad)


    // ⚠️ IMPORTANTE en React: NO usamos .push().
    // Creamos un array NUEVO con lo de antes (...tareas) + la nueva.
    setTareas([...tareas, nueva])

    setTexto('')  // limpiamos el input
  }

  function iniciarEdicion(id) {
    const tarea = tareas.find((t) => t.id === id)
    if (!tarea) return

    setEditingId(id)
    setEditTexto(tarea.texto)
  }

  function guardarEdicion(id) {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, texto: editTexto } : t) )
  )
    setEditingId(null)
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

  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === 'pendientes') return !t.completada
    if (filtro === 'completadas') return t.completada
    return true  // 'todas'
  })

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
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        <select value= {prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        
        <button onClick={agregarTarea}>Agregar</button>
      </div>
        

      <div className="zona-filtros">
        <button
          className={filtro === 'todas' ? 'activo' : ''}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
        <button
          className={filtro === 'pendientes' ? 'activo' : ''}
          onClick={() => setFiltro('pendientes')}
        >
          Pendientes
        </button>
        <button
          className={filtro === 'completadas' ? 'activo' : ''}
          onClick={() => setFiltro('completadas')}
        >
          Completadas
        </button>
      </div>

      <ul>
        {/* .map() recorre el array y devuelve un <li> por cada tarea.
            Cada elemento de una lista necesita una "key" única (el id). */}
        {tareasFiltradas.map((tarea) => {
          
        
          const haVencido = tarea.fecha && new Date(tarea.fecha) < new Date() && !tarea.completada;
          return (
          <li key={tarea.id}>
            {tarea.id === editingId ? (
        
        <div className="zona-edicion">
          <input 
          value={editTexto} onChange={(e) => setEditTexto(e.target.value)}/>

          <button onClick={() => guardarEdicion(tarea.id)}>Guardar</button>
        </div>
      ) : (
      <div className="item-tarea">
      <span
        onClick={() => alternar(tarea.id)}
        style={{ textDecoration: tarea.completada ? 'line-through' : 'none', color: coloresPrioridad[tarea.prioridad] }}
    >
      {tarea.texto}
    </span>
    <small style={{color: haVencido ? 'red' : 'gray'}}> Vence: {tarea.fecha}</small>

    <div className="acciones">
      <button onClick={() => iniciarEdicion(tarea.id)}>✏️</button>
      <button className="btn-borrar" onClick={() => borrar(tarea.id)}>🗑️</button>
    </div>
  </div>
)
      }
          </li>
          );
        })}
      </ul>
      <button onClick={borrarCompletadas}>
        🗑️ Borrar completadas
      </button>
    </div>
  )
}

export default App
