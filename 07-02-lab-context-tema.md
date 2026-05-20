# 7.2. Lab — Context: tema claro / oscuro

[← Capítulo 7](07-comunicacion-componentes.md) | [← Lab 7.1](07-01-lab-useContext.md) | [Índice](README.md) | [Siguiente lab →](07-03-lab-hoc-withHover.md)

---

## Objetivo del laboratorio

Compartir **estilos de tema** (claro u oscuro) con **Context** y `useContext`, sin pasar un objeto `style` por cada nivel. Segundo patrón de Context tras el idioma (7.1).

## Tiempo estimado

40–50 minutos.

## Archivos

| Archivo | Acción |
|---------|--------|
| `src/context/ThemeContext.tsx` | Crear |
| `src/components/PanelTema.tsx` | Crear |
| `src/App.tsx` | Modificar |

## Prerrequisitos

- [7.1 Lab useContext](07-01-lab-useContext.md) completado.
- `npm run dev` en tu proyecto.

## Resultado esperado

Botón que alterna tema; un panel anidado cambia fondo y color de texto al instante.

---

## Paso 1 — Tipos y estilos

**Objetivo:** valor estable del Provider.

Crea **`src/context/ThemeContext.tsx`**:

```tsx
import {
  createContext,
  useContext,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

export type ModoTema = 'claro' | 'oscuro'

const estilosPorModo: Record<ModoTema, CSSProperties> = {
  claro: { backgroundColor: '#fff', color: '#111', minHeight: '120px', padding: '1rem' },
  oscuro: { backgroundColor: '#1a1a1a', color: '#f5f5f5', minHeight: '120px', padding: '1rem' },
}

type ThemeContextValue = {
  modo: ModoTema
  estilos: CSSProperties
  alternar: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [modo, setModo] = useState<ModoTema>('claro')

  const value: ThemeContextValue = {
    modo,
    estilos: estilosPorModo[modo],
    alternar: () => setModo((m) => (m === 'claro' ? 'oscuro' : 'claro')),
  }

  return (
    <ThemeContext.Provider value={value}>
      <div>
        <button type="button" onClick={value.alternar} style={{ marginBottom: '1rem' }}>
          Tema: {modo} (clic para cambiar)
        </button>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider')
  return ctx
}
```

**Comprobación:** exportas `ThemeProvider` y `useTheme`.

---

## Paso 2 — Panel consumidor

**Objetivo:** `useContext` vía hook en componente anidado.

Crea **`src/components/PanelTema.tsx`**:

```tsx
import { useTheme } from '../context/ThemeContext'

export function PanelTema() {
  const { estilos, modo } = useTheme()

  return (
    <section style={estilos}>
      <h2>Panel con tema</h2>
      <p>Modo actual: <strong>{modo}</strong></p>
      <p>Este bloque no recibe estilos por props.</p>
    </section>
  )
}
```

**Comprobación:** import de `useTheme` resuelve.

---

## Paso 3 — `App` con Provider

**Objetivo:** envolver la rama que debe reaccionar al tema.

Sustituye **`src/App.tsx`**:

```tsx
import { ThemeProvider } from './context/ThemeContext'
import { PanelTema } from './components/PanelTema'

function App() {
  return (
    <ThemeProvider>
      <h1 style={{ padding: '1rem 1rem 0' }}>Tema con Context</h1>
      <PanelTema />
    </ThemeProvider>
  )
}

export default App
```

**Comprobación:** al pulsar el botón de tema, cambian fondo y texto del panel.

---

## Paso 4 — Comparar con prop drilling

**Objetivo:** enlazar con el lab 7.0.

¿Cómo pasarías `estilos` sin Context? Describe en una frase.

**Comprobación:** mencionas reenvío por `Layout`, `Sidebar`, etc.

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| Panel no cambia | `PanelTema` dentro de `<ThemeProvider>`. |
| Error en `useTheme` | Provider montado en `App`. |
| Botón no alterna | `alternar` en el `value` del contexto. |

---

## Retos

| Reto | Criterio |
|------|----------|
| A | Persiste `modo` en `localStorage` y restáuralo al recargar. | Tema se mantiene tras F5. |
| B | Añade `LayoutTema` intermedio sin props de estilo; solo envuelve hijos. | Sigue funcionando. |
| C | En 7.7 unificarás `useLang` y `useTheme` en hooks reutilizables. | — |

---

## Qué has practicado

- Context con objeto de valor compuesto (estado + métodos + datos derivados).
- Hook `useTheme` como capa sobre `useContext`.

**Siguiente:** [7.3 HOC withHover](07-03-lab-hoc-withHover.md).
