# 2.1. Lab — Proyecto inicial con Vite

[← Índice](README.md) | [← Capítulo 2](02-entorno-desarrollo.md) | [Siguiente: Capítulo 3 →](03-jsx-renderizado.md) | [Siguiente lab →](03-01-lab-lista-noticias.md)

---

## Objetivo del laboratorio

Al terminar tendrás un proyecto **React + TypeScript** creado con Vite, el servidor de desarrollo en marcha y un **build de producción** comprobado. Este proyecto lo reutilizarás en los labs siguientes (puedes llamarlo como quieras; en los ejemplos usamos la carpeta `react-curso-practico`).

## Tiempo estimado

30–45 minutos.

## Prerrequisitos

- Node.js y npm instalados (`node -v`, `npm -v`).
- Terminal en la carpeta donde quieras crear el proyecto (por ejemplo tu home o `~/proyectos`).

## Archivos implicados

| Acción | Ruta |
|--------|------|
| Crea Vite | `package.json`, `index.html`, `src/main.tsx` |
| Editas | `src/App.tsx` |

## Resultado esperado

- Carpeta del proyecto con `src/main.tsx` y `src/App.tsx`.
- Navegador mostrando un título personalizado en `http://localhost:5173` (o el puerto que indique Vite).
- Carpeta `dist/` generada tras `npm run build`.

---

## Paso 1 — Crear el proyecto

**Objetivo:** generar la estructura base con la plantilla oficial `react-ts`.

Ejecuta **exactamente** (puedes cambiar `react-curso-practico` por otro nombre; usa el mismo en todo el curso):

```bash
npm create vite@latest react-curso-practico -- --template react-ts
```

**Comprobación:** existe la carpeta `react-curso-practico` con `package.json`, `vite.config.ts` y `src/main.tsx`.

---

## Paso 2 — Instalar dependencias

**Objetivo:** descargar React, TypeScript y Vite en `node_modules`.

```bash
cd react-curso-practico
npm install
```

**Comprobación:** no hay errores en terminal; aparece la carpeta `node_modules`.

---

## Paso 3 — Arrancar el servidor de desarrollo

**Objetivo:** ver la aplicación por defecto y confirmar que HMR funciona.

```bash
npm run dev
```

1. Copia la URL que muestra la terminal (suele ser `http://localhost:5173`).
2. Ábrela en el navegador.
3. Deberías ver la pantalla por defecto de Vite + React.

**Comprobación:** la página carga sin error en consola del navegador (F12 → pestaña *Console*).

---

## Paso 4 — Revisar el punto de entrada

**Objetivo:** entender dónde React se monta en el DOM.

Abre el archivo **`src/main.tsx`**. Debe coincidir con:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- `getElementById('root')` enlaza con `<div id="root">` en `index.html`.
- `createRoot(...).render(...)` es la API moderna de React 18+.

**Comprobación:** puedes explicar en una frase qué hace `main.tsx` (montar `App` en `#root`).

---

## Paso 5 — Personalizar el componente raíz

**Objetivo:** comprobar que al guardar un `.tsx` la vista se actualiza sola.

Sustituye **todo** el contenido de **`src/App.tsx`** por:

```tsx
function App() {
  return (
    <div>
      <h1>React + TypeScript + Vite</h1>
      <p>Si ves este texto, el lab 2.1 está correcto.</p>
    </div>
  )
}

export default App
```

Guarda el archivo **sin detener** `npm run dev`.

**Comprobación:** el navegador muestra el nuevo título y el párrafo **sin** pulsar F5 manualmente.

---

## Paso 6 — Build de producción

**Objetivo:** generar los archivos estáticos que se desplegarían en producción.

Detén el servidor de desarrollo (`Ctrl+C` en la terminal) y ejecuta:

```bash
npm run build
npm run preview
```

Abre la URL que indique `preview` (a menudo `http://localhost:4173`).

**Comprobación:**

- Existe la carpeta `dist/` con `index.html` y assets.
- La misma UI se ve en la URL de preview.

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| `npm: command not found` | Instala Node.js LTS desde [nodejs.org](https://nodejs.org). |
| Puerto distinto a 5173 | Usa la URL exacta que imprime Vite en la terminal. |
| Pantalla en blanco | F12 → Console; suele haber error de sintaxis en `App.tsx`. |
| `getElementById('root')` es null | `index.html` debe tener `<div id="root">` → usa `<div id="root">`. |

---

## Retos

| Reto | Enunciado |
|------|-----------|
| A | Añade en `App.tsx` un segundo párrafo con tu nombre. Guarda y verifica HMR.
2. **Reto B:** Ejecuta `npm run build` otra vez tras el cambio y confirma que `dist/` refleja el texto nuevo.
3. **Reto C:** En `package.json`, localiza los scripts `dev`, `build` y `preview` y anota en una línea qué hace cada uno.

---

## Qué has practicado

- Crear proyecto con `npm create vite@latest … -- --template react-ts`.
- Scripts `npm run dev`, `npm run build`, `npm run preview`.
- Punto de entrada `main.tsx` y componente raíz `App.tsx`.

**Siguiente:** teoría en [3. JSX y renderizado](03-jsx-renderizado.md) y lab [3.1 Lista de noticias](03-01-lab-lista-noticias.md) **en la misma carpeta** `react-curso-practico`.
