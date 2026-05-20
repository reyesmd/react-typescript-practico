# 7.5. Lab — `useReducer` (contador con acciones)

[← Capítulo 7](07-comunicacion-componentes.md) | [← Lab 7.4](07-04-lab-hoc-withData.md) | [Índice](README.md) | [Siguiente lab →](07-06-lab-useReducer-caja.md)

---

## Objetivo del laboratorio

Gestionar un **contador** con **`useReducer`**: acciones tipadas (`incrementar`, `decrementar`, `reiniciar`, `sumar`) y un único `reducer` que concentra la lógica de actualización.

## Tiempo estimado

40–50 minutos.

## Archivos que crearás o modificarás

| Archivo | Acción |
|---------|--------|
| `src/reducers/contadorReducer.ts` | Crear |
| `src/components/ContadorReducer.tsx` | Crear |
| `src/App.tsx` | Modificar |

## Prerrequisitos

- [5.1 Lab useState](05-01-lab-useState.md) (concepto de contador).
- `npm run dev` en tu proyecto.

## Resultado esperado

Botones **+1**, **−1**, **+5**, **Reset** y un número central; toda la lógica de cambio vive en el `reducer`.

---

## Paso 1 — Estado inicial y acciones

**Objetivo:** contrato tipado antes del componente.

Crea **`src/reducers/contadorReducer.ts`**:

```tsx
export type EstadoContador = {
  valor: number
}

export type AccionContador =
  | { type: 'incrementar' }
  | { type: 'decrementar' }
  | { type: 'reiniciar' }
  | { type: 'sumar'; payload: number }

export const estadoInicial: EstadoContador = { valor: 0 }

export function contadorReducer(
  estado: EstadoContador,
  accion: AccionContador
): EstadoContador {
  switch (accion.type) {
    case 'incrementar':
      return { valor: estado.valor + 1 }
    case 'decrementar':
      return { valor: estado.valor - 1 }
    case 'reiniciar':
      return { valor: 0 }
    case 'sumar':
      return { valor: estado.valor + accion.payload }
    default:
      return estado
  }
}
```

**Comprobación:** TypeScript no marca el `switch` como exhaustivo si añades `default` (opcional: usa `satisfies never` en el default para forzar exhaustividad).

---

## Paso 2 — Componente con `useReducer`

**Objetivo:** emitir acciones con `dispatch` en lugar de varios `setState`.

Crea **`src/components/ContadorReducer.tsx`**:

```tsx
import { useReducer } from 'react'
import {
  contadorReducer,
  estadoInicial,
  type AccionContador,
} from '../reducers/contadorReducer'

export function ContadorReducer() {
  const [estado, dispatch] = useReducer(contadorReducer, estadoInicial)

  const enviar = (accion: AccionContador) => () => dispatch(accion)

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <button type="button" onClick={enviar({ type: 'decrementar' })}>−1</button>
      <strong style={{ minWidth: '3rem', textAlign: 'center' }}>{estado.valor}</strong>
      <button type="button" onClick={enviar({ type: 'incrementar' })}>+1</button>
      <button type="button" onClick={enviar({ type: 'sumar', payload: 5 })}>+5</button>
      <button type="button" onClick={enviar({ type: 'reiniciar' })}>Reset</button>
    </div>
  )
}
```

**Comprobación:** cada botón modifica el número según la acción.

---

## Paso 3 — Montar en `App`

**Objetivo:** ver el contador en la aplicación.

Sustituye **`src/App.tsx`**:

```tsx
import { ContadorReducer } from './components/ContadorReducer'

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>useReducer</h1>
      <ContadorReducer />
    </div>
  )
}

export default App
```

**Comprobación:** secuencia +1, +5, −1, Reset deja el valor en 0.

---

## Paso 4 — Comparar con `useState`

**Objetivo:** decidir cuándo usar cada hook.

Responde por escrito (en tu cuaderno):

1. ¿Cuántos `useState` necesitarías sin reducer para las mismas reglas?
2. ¿Dónde centralizaste la lógica al usar `useReducer`?

**Comprobación:** has localizado el archivo `contadorReducer.ts` como única fuente de verdad de transiciones.

---

## Paso 5 — (Opcional) Límite mínimo 0

**Objetivo:** lógica de negocio en el reducer, no en el botón.

En `contadorReducer`, caso `decrementar`:

```tsx
return { valor: Math.max(0, estado.valor - 1) }
```

**Comprobación:** el valor no baja de 0.

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| El número no cambia | ¿Llamas a `dispatch` con `{ type: '...' }`? |
| Error de tipos en `dispatch` | `AccionContador` debe incluir todas las acciones usadas. |
| `payload` undefined | Acción `sumar` requiere `payload: number`. |

---

## Retos

| Reto | Criterio de éxito |
|------|-------------------|
| A | Acción `establecer` con `payload: number` y un input numérico controlado. | El input fija el valor vía reducer. |
| B | Muestra historial de las últimas 3 acciones (`string[]` en el estado). | Lista debajo del contador. |
| C | Refactor: extrae `useContador()` que devuelva `{ valor, incrementar, ... }` usando el mismo reducer. | API más cómoda para la UI. |

---

## Qué has practicado

- `useReducer(reducer, estadoInicial)` y `dispatch(accion)`.
- Acciones tipadas con `type` y `payload` opcional.
- Centralizar reglas de actualización fuera del JSX.

**Siguiente:** [7.6 Lab caja con teclado](07-06-lab-useReducer-caja.md).