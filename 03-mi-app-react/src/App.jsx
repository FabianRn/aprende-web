// useState es un "hook" de React para guardar datos que cambian.
import { useState } from 'react'
import './App.css'

// 👇 Esto es un COMPONENTE: una función que devuelve la interfaz (en JSX).
//    JSX = HTML escrito dentro de JavaScript. ¡Magia de React!
function App() {

  // useState crea una variable "reactiva":
  //   - contador      = el valor actual (empieza en 0)
  //   - setContador   = la función para cambiarlo
  // Cuando cambias el valor con setContador, React REDIBUJA la pantalla SOLO.
  const [contador, setContador] = useState(0)

  // Esta función se ejecuta cuando hacen clic en el botón
  function manejarClic() {
    setContador(contador + 1)   // cambiamos el dato... y React actualiza la vista
  }

  function restarClic() {
    if (contador > 0) {
      setContador(contador - 1) // Evita que el contador sea negativo
    }
  }

  // 👇 Lo que se ve en pantalla. Fíjate: parece HTML, ¡pero está dentro de JS!
  return (
    <div className="caja">
      <h1>FERN React ⚛️</h1>

      {/* En JSX, para meter una variable de JS usamos llaves { } */}
      <p>Has hecho clic {contador} veces</p>

      {/* onClick conecta el evento con nuestra función (sin getElementById!) */}
      <button onClick={manejarClic}>
        Haz clic
      </button>
      <button onClick={restarClic}>
        Restar
      </button>
      <button onClick={() => setContador(0)}> {/* Resetea el contador a 0 */}
        Reiniciar
      </button>
    </div>
  )
}

export default App
