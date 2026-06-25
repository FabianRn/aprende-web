# 📝 TODO List (React)

Lista de tareas construida con **React + Vite** como parte de mi proceso de aprendizaje (`aprende-web`). Es el mismo concepto que la versión vanilla JS, pero llevada a React: estado, inmutabilidad, efectos y persistencia con `localStorage`.

## ✨ Funcionalidades

- ➕ **Agregar** tareas con texto, prioridad (baja / media / alta) y fecha de vencimiento.
- ✅ **Marcar** una tarea como completada (tachado) o desmarcarla.
- ✏️ **Editar** el texto de una tarea en línea.
- 🗑️ **Borrar** tareas individuales o todas las completadas a la vez.
- 🔍 **Filtrar** entre Todas / Pendientes / Completadas.
- ⚠️ Aviso visual de **tareas vencidas**.
- 💾 **Persistencia automática** en `localStorage` (las tareas sobreviven a recargas).
- ⌨️ Atajo: `Enter` en el input agrega la tarea.

## 🧠 Conceptos de React que se practican aquí

- `useState` para estado de tareas, filtros, edición y campos del formulario.
- `useEffect` para sincronizar el estado con `localStorage`.
- **Inmutabilidad**: nunca `.push` ni mutar — siempre `[...tareas, nueva]`, `.map`, `.filter`.
- **Input controlado**: el input refleja el estado y se actualiza con `onChange`.
- **Keys** en listas (`key={tarea.id}`).
- Renderizado condicional para el modo edición.

## 🚀 Cómo correrlo

Necesitas **Node.js 18+** y `npm`.

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción
npm run build

# Previsualizar el build
npm run preview

# Linter
npm run lint
```

## 📁 Estructura

```
src/
├── App.jsx       # Toda la lógica y UI (componente principal)
├── App.css       # Estilos
├── main.jsx      # Punto de entrada (monta <App /> en #root)
└── index.css     # Estilos base
```

## 📚 Aprendizajes previos en la serie

1. `01-mi-primera-web` — HTML y CSS básicos.
2. `02-tareas-vanilla-js` — TODO list en JavaScript puro (DOM manual, `localStorage`).
3. `03-contador-react` — Primer contacto con `useState` en React.
4. **`04-todo-react`** ← *estás aquí*: TODO list completa con persistencia, filtros, prioridades, edición y fechas.
5. `05-...` — Próximos pasos.

## 📜 Licencia

Proyecto de aprendizaje personal. Úsalo como quieras.