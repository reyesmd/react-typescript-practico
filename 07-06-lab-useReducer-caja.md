# 7.6. Lab — `useReducer` + `useEffect` (caja con teclado)

[← Capítulo 7](07-comunicacion-componentes.md) | [← Lab 7.5](07-05-lab-useReducer-contador.md) | [Índice](README.md) | [Siguiente lab →](07-07-lab-hook-useLang.md)

---

## Objetivo del laboratorio

Mover un cuadrado con las **flechas del teclado** usando **`useReducer`** (posición `x`, `y` numérica) y **`useEffect`** para el listener `keydown` con limpieza.

## Tiempo estimado

50–60 minutos.

## Archivos

| Archivo | Acción |
|---------|--------|
| `src/reducers/cajaReducer.ts` | Crear |
| `src/components/CajaMovil.tsx` | Crear |
| `src/App.tsx` | Modificar |

## Prerrequisitos

- [7.5 Lab useReducer contador](07-05-lab-useReducer-contador.md).
- [5.2 Lab useEffect](05-02-lab-useEffect-reloj.md).

## Resultado esperado

Cuadrado rojo centrado al cargar; flechas lo desplazan 10px; al desmontar el componente no quedan listeners colgando.

---

## Paso 1 — Reducer de posición

**Objetivo:** estado `{ x, y }` y acciones de teclado.

Crea **`src/reducers/cajaReducer.ts`**:

```tsx
const PASO = 10
const TAMANO = 50

export type Posicion = { x: number; y: number }

export type AccionCaja = { type: 'tecla'; key: string }

export function posicionInicial(): Posicion {
  return {
    x: Math.max(0, Math.floor(window.innerWidth / 2 - TAMANO / 2)),
    y: Math.max(0, Math.floor(window.innerHeight / 2 - TAMANO / 2)),
  }
}

export function cajaReducer(estado: Posicion, accion: AccionCaja): Posicion {
  switch (accion.key) {
    case 'ArrowLeft':
      return { ...estado, x: Math.max(0, estado.x - PASO) }
    case 'ArrowRight':
      return { ...estado, x: estado.x + PASO }
    case 'ArrowUp':
      return { ...estado, y: Math.max(0, estado.y - PASO) }
    case 'ArrowDown':
      return { ...estado, y: estado.y + PASO }
    default:
      return estado
  }
}

export const TAMANO_CAJA = TAMANO
```

**Comprobación:** coordenadas son `number`, no strings con `px`.

---

## Paso 2 — Componente `CajaMovil`

**Objetivo:** `useReducer` + listener de teclado.

Crea **`src/components/CajaMovil.tsx`**:

```tsx
import { useEffect, useReducer } from 'react'
import {
  cajaReducer,
  posicionInicial,
  TAMANO_CAJA,
  type AccionCaja,
} from '../reducers/cajaReducer'

export function CajaMovil() {
  const [pos, dispatch] = useReducer(cajaReducer, null, posicionInicial)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      dispatch({ type: 'tecla', key: e.key })
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <motion.div
      style={{
        width: TAMANO_CAJA,
        height: TAMANO_CAJA,
        backgroundColor: 'crimson',
        position: 'fixed',
        left: pos.x,
        top: pos.y,
      }}
      tabIndex={0}
      aria-label="Caja movible con flechas"
    />
  )
}
```

Sustituye el `return` por un **`div`** (no otra etiqueta):

```tsx
  return (
    <div
      style={{
        width: TAMANO_CAJA,
        height: TAMANO_CAJA,
        backgroundColor: 'crimson',
        position: 'fixed',
        left: pos.x,
        top: pos.y,
      }}
      tabIndex={0}
      aria-label="Caja movible con flechas"
    />
  )
```

**Comprobación:** al pulsar flechas, el cuadrado se mueve.

---

## Paso 3 — Montar en `App`

**Objetivo:** foco en la página para teclado.

Sustituye **`src/App.tsx`**:

```tsx
import { useState } from 'react'
import { CajaMovil } from './components/CajaMovil'

function App() {
  const [visible, setVisible] = useState(true)

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Caja con useReducer</h1>
      <p>Haz clic aquí y usa las flechas del teclado.</p>
      <button type="button" onClick={() => setVisible((v) => !v)}>
        {visible ? 'Ocultar' : 'Mostrar'} caja
      </button>
      {visible && <CajaMovil />}
    </motion.div>
  )
}

export default App
```

Corrige el cierre: `</motion.div>` → **`</motion.div>`** — usa **`</motion.div>`** → **`</motion.div>`** → **`</div>`**.

**Comprobación:** al ocultar la caja, el listener se elimina (no mueve nada invisible).

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| No se mueve | Foco en la ventana; pestaña activa; flechas no en input. |
| Salta a 0,0 raro | `posicionInicial` usa `window` — solo en cliente. |
| Memory leak | `removeEventListener` en el cleanup del `useEffect`. |

---

## Retos

| Reto | Criterio |
|------|----------|
| A | Acción `reiniciar` con tecla `r` que centre la caja. | Tecla R recentra. |
| B | Impide salir de los bordes de `window.innerWidth/Height`. | Caja dentro del viewport. |
| C | Muestra coordenadas `x, y` debajo del título en `App` vía Context (pista 7.1). | Posición visible sin props drilling. |

---

## Qué has practicado

- `useReducer` con estado objeto y acciones externas (teclado).
- Combinar reducer + `useEffect` para efectos del DOM global.

**Siguiente:** [7.7 Hook useLang](07-07-lab-hook-useLang.md).
