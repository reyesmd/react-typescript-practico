# 7.0. Lab — Prop drilling y callbacks (el problema)

[← Capítulo 7](07-comunicacion-componentes.md) | [← Lab 6.1](06-01-lab-formulario-contacto.md) | [Índice](README.md) | [Siguiente lab →](07-01-lab-useContext.md)

---

## Objetivo del laboratorio

Visualizar el **prop drilling**: pasar `mensaje` y `onAccion` por un componente intermedio que no los usa. En el [lab 7.1](07-01-lab-useContext.md) sustituirás este cableado por **Context**.

## Tiempo estimado

25–35 minutos.

## Archivos

| Archivo | Acción |
|---------|--------|
| `src/components/PanelAccion.tsx` | Crear |
| `src/components/LayoutIntermedio.tsx` | Crear |
| `src/App.tsx` | Modificar |

## Prerrequisitos

- [2.1 Lab Vite](02-01-lab-vite.md) y capítulos 4–6 (props y callbacks).
- `npm run dev` en tu proyecto.

## Resultado esperado

Botón en un componente anidado que incrementa el total mostrado en `App`; el layout intermedio solo reenvía props.

---

## Paso 1 — Componente hoja `PanelAccion`

**Objetivo:** el único que realmente usa las props.

Crea **`src/components/PanelAccion.tsx`**:

```tsx
type PanelAccionProps = {
  mensaje: string
  onAccion: () => void
}

export function PanelAccion({ mensaje, onAccion }: PanelAccionProps) {
  return (
    <div>
      <p>{mensaje}</p>
      <button type="button" onClick={onAccion}>+1 click</button>
    </div>
  )
}
```

**Comprobación:** archivo sin errores TypeScript.

---

## Paso 2 — Intermediario `LayoutIntermedio`

**Objetivo:** recibir props solo para pasarlas más abajo.

Crea **`src/components/LayoutIntermedio.tsx`**:

```tsx
import { PanelAccion } from './PanelAccion'

type LayoutIntermedioProps = {
  mensaje: string
  onAccion: () => void
}

export function LayoutIntermedio({ mensaje, onAccion }: LayoutIntermedioProps) {
  return (
    <section style={{ border: '1px dashed #999', padding: '1rem', marginTop: '1rem' }}>
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        LayoutIntermedio — solo reenvía props (prop drilling)
      </p>
      <PanelAccion mensaje={mensaje} onAccion={onAccion} />
    </section>
  )
}
```

**Comprobación:** no usa `mensaje` ni `onAccion` salvo para reenviarlas.

---

## Paso 3 — Estado y callback en `App`

**Objetivo:** fuente de verdad en la raíz.

Sustituye **`src/App.tsx`**:

```tsx
import { useState } from 'react'
import { LayoutIntermedio } from './components/LayoutIntermedio'

function App() {
  const [total, setTotal] = useState(0)
  const incrementar = () => setTotal((t) => t + 1)

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Prop drilling</h1>
      <p>Total (App): {total}</p>
      <LayoutIntermedio
        mensaje={`Clicks: ${total}`}
        onAccion={incrementar}
      />
    </div>
  )
}

export default App
```

**Comprobación:** cada click actualiza el total en `App` y el texto del panel.

---

## Paso 4 — Reflexión

**Objetivo:** motivar los labs 7.1+.

1. ¿Cuántos componentes tocaste si mañana añades otro hijo que también necesite `incrementar`?
2. ¿Qué problema evita Context en este escenario?

**Comprobación:** puedes responder en una frase cada pregunta.

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| El total no sube | `onAccion={incrementar}` en `LayoutIntermedio`. |
| Error en `PanelAccion` | Props con nombres exactos `mensaje` y `onAccion`. |

---

## Retos

| Reto | Criterio |
|------|----------|
| A | Inserta `Sidebar` entre `App` y `Layout` que también reenvíe las props. | Sigue funcionando; más verboso. |
| B | Tras completar el 7.1, elimina props de paso y compara. | Menos reenvíos en intermediarios. |

---

## Qué has practicado

- Repaso de props + callback hacia arriba.
- Prop drilling como problema de escalabilidad.

**Siguiente:** [7.1 useContext — idioma](07-01-lab-useContext.md).
