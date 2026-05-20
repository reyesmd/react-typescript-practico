# 8.1. Lab — React Router (rutas y enlaces)

[← Capítulo 8](08-routing.md) | [← Lab 7.7](07-07-lab-hook-useLang.md) | [Índice](README.md) | [Siguiente lab →](09-01-lab-consumo-api.md)

---

## Objetivo del laboratorio

Instalar **react-router-dom**, envolver la app con **BrowserRouter** en `main.tsx`, crear páginas **Inicio**, **Contacto** y **NoEncontrado**, y navegar con **Routes**, **Route** y **Link** (sin recargar la página).

## Tiempo estimado

50 minutos.

## Prerrequisitos

- Haber completado [2.1 Lab Vite](02-01-lab-vite.md) (proyecto React + TypeScript con Vite).
- Servidor de desarrollo en marcha (`npm run dev`) dentro de la carpeta de **tu** proyecto.

> Los paths de archivos (`src/...`) son **relativos a la raíz de tu proyecto Vite**. El nombre de la carpeta no importa; en ejemplos usamos `react-curso-practico` solo como referencia.

## Resultado esperado

Barra de enlaces Inicio | Contacto; rutas `/`, `/contacto` y página 404 para URLs desconocidas; la URL cambia sin refresh completo.

---

## Paso 1 — Instalar dependencia

**Objetivo:** añadir React Router al proyecto.

En la raíz del proyecto:

```bash
npm install react-router-dom
```

**Comprobación:** `package.json` lista `react-router-dom`; `npm run dev` sigue arrancando.

---

## Paso 2 — Páginas básicas

**Objetivo:** componentes que representan cada vista.

Crea **`src/pages/Inicio.tsx`**:

```tsx
export function Inicio() {
  return (
    <div>
      <h2>Inicio</h2>
      <p>Bienvenido a la app con rutas.</p>
    </div>
  )
}
```

Crea **`src/pages/Contacto.tsx`**:

```tsx
export function Contacto() {
  return (
    <div>
      <h2>Contacto</h2>
      <p>Formulario o datos de contacto (placeholder).</p>
    </div>
  )
}
```

Crea **`src/pages/NoEncontrado.tsx`**:

```tsx
import { Link } from 'react-router-dom'

export function NoEncontrado() {
  return (
    <div>
      <h2>404</h2>
      <p>La ruta no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  )
}
```

**Comprobación:** tres archivos sin errores de TypeScript.

---

## Paso 3 — `BrowserRouter` en `main.tsx`

**Objetivo:** activar el enrutador en toda la aplicación.

Abre **`src/main.tsx`** y envuelve `<App />`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**Comprobación:** la app carga igual que antes (aún sin rutas definidas en `App`).

---

## Paso 4 — `Routes` y `Route` en `App`

**Objetivo:** asociar paths con páginas.

Sustituye **`src/App.tsx`** por:

```tsx
import { Routes, Route } from 'react-router-dom'
import { Inicio } from './pages/Inicio'
import { Contacto } from './pages/Contacto'
import { NoEncontrado } from './pages/NoEncontrado'

function App() {
  return (
    <div>
      <h1>React Router</h1>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </div>
  )
}

export default App
```

Prueba manualmente en la barra de direcciones: `/`, `/contacto`, `/ruta-falsa`.

**Comprobación:** cada URL muestra su página; `/ruta-falsa` muestra 404.

> En el paso 5 sustituirás `App.tsx` por la versión que incluye también la barra de navegación.

---

## Paso 5 — Navegación con `Link`

**Objetivo:** cambiar de ruta sin recargar el documento entero.

Sustituye **todo** **`src/App.tsx`** por (incluye nav + rutas):

```tsx
import { Routes, Route, Link } from 'react-router-dom'
import { Inicio } from './pages/Inicio'
import { Contacto } from './pages/Contacto'
import { NoEncontrado } from './pages/NoEncontrado'

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>React Router</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Inicio</Link>
        {' | '}
        <Link to="/contacto">Contacto</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </div>
  )
}

export default App
```

**Comprobación:** los enlaces cambian la vista sin parpadeo de recarga completa.

**Prueba comparativa:** sustituye temporalmente un `Link` por `<a href="/contacto">` y observa la recarga; vuelve a `Link`.

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| Pantalla en blanco tras instalar router | ¿Envolviste `<App />` con `<BrowserRouter>` en `main.tsx`? |
| 404 en `/` | La ruta raíz es `path="/"` con `element={<Inicio />}`. |
| Enlace recarga toda la página | Usa `<Link to="...">`, no `<a href>`. |

## Retos

1. **Reto A:** Resalta el enlace activo con `NavLink` y `className` según `isActive`.
2. **Reto B:** Añade ruta `/acerca` con su página.
3. **Reto C:** Lee la documentación de `Outlet` y prepara un layout con cabecera común (sin implementarlo si no has visto layouts aún).

---

## Qué has practicado

- Instalación y `BrowserRouter`.
- `Routes`, `Route`, ruta comodín `*`.
- Navegación declarativa con `Link`.

**Siguiente:** [Capítulo 9](09-consumo-apis.md) y [9.1 Lab consumo API](09-01-lab-consumo-api.md).
