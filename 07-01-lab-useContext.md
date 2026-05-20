# 7.1. Lab — `useContext` (idioma sin prop drilling)

[← Capítulo 7](07-comunicacion-componentes.md) | [← Lab 7.0](07-00-lab-prop-drilling.md) | [Índice](README.md) | [Siguiente lab →](07-02-lab-context-tema.md)

---

## Objetivo del laboratorio

Crear un **contexto de idioma** (`es` / `en`), un selector en un componente intermedio y un **`Header`** anidado que lea las traducciones con **`useContext`** — sin pasar props por cada nivel.

## Tiempo estimado

45–55 minutos.

## Archivos que crearás o modificarás

| Archivo | Acción |
|---------|--------|
| `src/context/LangContext.tsx` | Crear (contexto + Provider) |
| `src/components/SelectLang.tsx` | Crear |
| `src/components/Header.tsx` | Crear |
| `src/App.tsx` | Modificar |

## Prerrequisitos

- [2.1 Lab Vite](02-01-lab-vite.md) y [5.1 useState](05-01-lab-useState.md) completados.
- `npm run dev` en la raíz de tu proyecto.

## Resultado esperado

Desplegable de idioma; el título del `Header` cambia entre español e inglés. Ningún prop `bienvenida` atraviesa componentes intermedios.

---

## Paso 1 — Traducciones y contexto

**Objetivo:** definir el canal de datos compartido.

Crea **`src/context/LangContext.tsx`**:

```tsx
import { createContext, useState, type ReactNode } from 'react'

export type Lang = 'es' | 'en'

export type Traducciones = {
  bienvenida: string
  despedida: string
}

const traducciones: Record<Lang, Traducciones> = {
  es: {
    bienvenida: 'Bienvenido a la aplicación',
    despedida: 'Hasta pronto',
  },
  en: {
    bienvenida: 'Welcome to the app',
    despedida: 'See you soon',
  },
}

export const LangContext = createContext<Traducciones | null>(null)

type LangProviderProps = {
  children: ReactNode
}

export function LangProvider({ children }: LangProviderProps) {
  const [lang, setLang] = useState<Lang>('es')
  const value = traducciones[lang]

  return (
    <LangContext.Provider value={value}>
      <div style={{ padding: '1rem' }}>
        <label>
          Idioma:{' '}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </label>
        {children}
      </div>
    </LangContext.Provider>
  )
}
```

**Comprobación:** el archivo compila; `LangContext` está exportado.

---

## Paso 2 — `Header` con `useContext`

**Objetivo:** leer el contexto en un hijo profundo sin props de traducción.

Crea **`src/components/Header.tsx`**:

```tsx
import { useContext } from 'react'
import { LangContext } from '../context/LangContext'

export function Header() {
  const t = useContext(LangContext)

  if (!t) {
    return <p>Error: falta LangProvider</p>
  }

  return (
    <header style={{ margin: '1rem 0', borderBottom: '1px solid #ccc' }}>
      <h1>{t.bienvenida}</h1>
      <p>{t.despedida}</p>
    </header>
  )
}
```

**Comprobación:** TypeScript acepta `t.bienvenida` y `t.despedida`.

---

## Paso 3 — Capa intermedia (simula prop drilling evitado)

**Objetivo:** demostrar que el intermediario **no** recibe traducciones.

Crea **`src/components/Layout.tsx`**:

```tsx
import type { ReactNode } from 'react'
import { Header } from './Header'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <section>
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        Layout (no recibe props de idioma)
      </p>
      <Header />
      <main>{children}</main>
    </section>
  )
}
```

**Comprobación:** `Layout` no importa `LangContext` ni recibe `bienvenida` por props.

---

## Paso 4 — Montar en `App`

**Objetivo:** envolver la app con el Provider.

Sustituye **`src/App.tsx`**:

```tsx
import { LangProvider } from './context/LangContext'
import { Layout } from './components/Layout'

function App() {
  return (
    <LangProvider>
      <Layout>
        <p>Contenido principal de la página.</p>
      </Layout>
    </LangProvider>
  )
}

export default App
```

**Comprobación:**

- Selector ES/EN visible.
- Al cambiar idioma, cambian **h1** y párrafo del `Header` al instante.
- El texto «Layout (no recibe props…)» no cambia de idioma (correcto).

---

## Paso 5 — Repasar el flujo

**Objetivo:** fijar el patrón mental.

1. `LangProvider` guarda `lang` y calcula `value` del contexto.
2. `LangContext.Provider` publica `value` a toda la rama.
3. `Header` hace `useContext(LangContext)` y renderiza textos.
4. `Layout` no participa en el cableado de traducciones.

**Comprobación:** puedes explicarlo en tres frases a un compañero.

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| `useContext` devuelve `null` | `Header` debe estar **dentro** de `<LangProvider>`. |
| El texto no cambia al elegir idioma | `value` del Provider debe depender de `lang` (`traducciones[lang]`). |
| Error de tipos en `select` | Cast: `e.target.value as Lang`. |

---

## Retos

| Reto | Criterio de éxito |
|------|-------------------|
| A | Añade francés (`fr`) al objeto `traducciones` y una `<option>`. | Título en francés al seleccionar FR. |
| B | Extrae `useLang()` en `src/hooks/useLang.ts` que encapsule `useContext` + error si es null. | `Header` usa el hook en lugar de `useContext` directo. |
| C | Mueve solo el `<select>` a `SelectLang.tsx` y pasa `lang`/`setLang` por **contexto de control** (segundo contexto opcional). | Selector sigue funcionando. |

---

## Qué has practicado

- `createContext`, `Provider` y `useContext`.
- Evitar prop drilling para datos globales de UI.
- Comprobar `null` cuando el contexto no tiene valor por defecto tipado.

**Siguiente:** [7.2 Lab tema claro/oscuro](07-02-lab-context-tema.md).
