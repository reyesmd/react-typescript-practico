# 7.3. Lab — HOC `withHover` (estilos reutilizables)

[← Capítulo 7](07-comunicacion-componentes.md) | [← Lab 7.2](07-02-lab-context-tema.md) | [Índice](README.md) | [Siguiente lab →](07-04-lab-hoc-withData.md)

---

## Objetivo del laboratorio

Crear el HOC **`withHover`**: envuelve un botón, detecta `mouseenter` / `mouseleave` y aplica opacidad. Aprenderás a **reenviar props** con `{...props}` al componente envuelto.

## Tiempo estimado

45–55 minutos.

## Archivos

| Archivo | Acción |
|---------|--------|
| `src/components/Boton.tsx` | Crear |
| `src/hoc/withHover.tsx` | Crear |
| `src/App.tsx` | Modificar |

## Prerrequisitos

- Labs 7.1–7.2 (Context) recomendados antes; el HOC con fetch viene en el [7.4](07-04-lab-hoc-withData.md).
- `npm run dev` en tu proyecto.

## Resultado esperado

Dos botones: uno normal y otro con efecto hover (opacidad al pasar el ratón).

---

## Paso 1 — `Boton` presentacional

**Objetivo:** componente que el HOC envolverá.

Crea **`src/components/Boton.tsx`**:

```tsx
import type { ReactNode } from 'react'

const estilosBase = {
  padding: '8px 12px',
  border: '1px solid #333',
  borderRadius: '6px',
  backgroundColor: '#fff',
  cursor: 'pointer',
} as const

type BotonProps = {
  children: ReactNode
  onClick: () => void
}

export function Boton({ children, onClick }: BotonProps) {
  return (
    <button type="button" style={estilosBase} onClick={onClick}>
      {children}
    </button>
  )
}
```

**Comprobación:** compila sin errores.

---

## Paso 2 — HOC esqueleto

**Objetivo:** función `withHover(Componente)`.

Crea **`src/hoc/withHover.tsx`**:

```tsx
import type { ComponentType } from 'react'

export function withHover<P extends object>(Wrapped: ComponentType<P>) {
  return function WithHover(props: P) {
    return <Wrapped {...props} />
  }
}
```

**Comprobación:** genérico `P` sin errores.

---

## Paso 3 — Estado hover y estilos del envoltorio

**Objetivo:** lógica transversal en el HOC.

Sustituye **`src/hoc/withHover.tsx`** por:

```tsx
import { useState, type ComponentType, type CSSProperties } from 'react'

export function withHover<P extends object>(Wrapped: ComponentType<P>) {
  return function WithHover(props: P) {
    const [hover, setHover] = useState(false)

    const wrapperStyle: CSSProperties = {
      opacity: hover ? 0.5 : 1,
      width: 'max-content',
      display: 'inline-block',
    }

    return (
      <div
        style={wrapperStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Wrapped {...props} />
      </div>
    )
  }
}
```

**Comprobación:** `{...props}` reenvía `children` y `onClick` al `Boton`.

---

## Paso 4 — Usar en `App`

**Objetivo:** instanciar el componente envuelto.

Sustituye **`src/App.tsx`**:

```tsx
import { Boton } from './components/Boton'
import { withHover } from './hoc/withHover'

const BotonConHover = withHover(Boton)

function App() {
  return (
    <motion.div style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
      <Boton onClick={() => alert('Botón normal')}>Normal</Boton>
      <BotonConHover onClick={() => alert('Botón con hover')}>
        Con hover
      </BotonConHover>
    </motion.div>
  )
}

export default App
```

Corrige el contenedor: debe ser `motion.div` → **`div`**.

```tsx
    <div style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
```

**Comprobación:** el segundo botón cambia opacidad al pasar el ratón; ambos disparan `alert`.

---

## Paso 5 — Sin `{...props}` (experimento)

**Objetivo:** ver el fallo clásico de HOC.

Comenta temporalmente `{...props}` en el HOC y deja `<Wrapped />`.

**Comprobación:** el botón envuelto pierde texto y click; restaura `{...props}`.

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| Botón vacío | Falta `<Wrapped {...props} />`. |
| Sin efecto hover | `onMouseEnter` / `onMouseLeave` en el `div` envoltorio. |
| TypeScript en `BotonConHover` | `Boton` debe aceptar `children` y `onClick`. |

---

## Retos

| Reto | Criterio |
|------|----------|
| A | Añade `transform: scale(1.05)` cuando `hover` es true. | Efecto visible. |
| B | Crea `withBorder` que añada borde rojo y combínalo: `withBorder(withHover(Boton))`. | Composición de HOC. |
| C | ¿Qué custom hook moderno sustituye este HOC? | Respuesta: `useHover` + estado local. |

---

## Qué has practicado

- HOC que añade comportamiento UI sin tocar el componente base.
- Importancia de `{...props}`.

**Siguiente:** [7.4 HOC withData](07-04-lab-hoc-withData.md).
