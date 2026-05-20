# 7.4. Lab — HOC `withData` (fetch reutilizable)

[← Capítulo 7](07-comunicacion-componentes.md) | [← Lab 7.3](07-03-lab-hoc-withHover.md) | [Índice](README.md) | [Siguiente lab →](07-05-lab-useReducer-contador.md)

---

## Objetivo del laboratorio

Implementar un **Higher Order Component** `withData` que haga `fetch` a una URL, muestre **Cargando…** mientras espera e **inyecte** los datos en el componente envuelto mediante la prop `data`.

## Tiempo estimado

50–60 minutos.

## Archivos que crearás o modificarás

| Archivo | Acción |
|---------|--------|
| `src/hoc/withData.tsx` | Crear |
| `src/components/InfoUsuario.tsx` | Crear |
| `src/App.tsx` | Modificar |

## Prerrequisitos

- [5.2 Lab useEffect](05-02-lab-useEffect-reloj.md) (fetch / efectos).
- `npm run dev` en tu proyecto.

## Resultado esperado

Pantalla con nombre y email de un usuario de prueba (JSONPlaceholder). Mientras carga, texto «Cargando datos…».

---

## Paso 1 — Componente presentacional

**Objetivo:** definir qué pintar cuando ya hay `data`.

Crea **`src/components/InfoUsuario.tsx`**:

```tsx
export type Usuario = {
  id: number
  name: string
  email: string
}

type InfoUsuarioProps = {
  data: Usuario | null
}

export function InfoUsuario({ data }: InfoUsuarioProps) {
  if (!data) {
    return <p>Sin datos de usuario</p>
  }

  return (
    <article>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </article>
  )
}
```

**Comprobación:** el componente compila; espera `data` por props.

---

## Paso 2 — HOC mínimo (solo envuelve)

**Objetivo:** ver la firma `withX(Componente)`.

Crea la carpeta `src/hoc` y el archivo **`src/hoc/withData.tsx`**:

```tsx
import type { ComponentType } from 'react'
import type { Usuario } from '../components/InfoUsuario'

export function withData<P extends object>(
  Wrapped: ComponentType<P & { data: Usuario | null }>,
  url: string
) {
  return function WithData(props: P) {
    return <Wrapped {...props} data={null} />
  }
}
```

**Comprobación:** TypeScript acepta el genérico `P`.

---

## Paso 3 — Fetch dentro del HOC

**Objetivo:** cargar datos en el envoltorio, no en cada pantalla.

Sustituye **`src/hoc/withData.tsx`** por:

```tsx
import { useEffect, useState, type ComponentType } from 'react'
import type { Usuario } from '../components/InfoUsuario'

export function withData<P extends object>(
  Wrapped: ComponentType<P & { data: Usuario | null }>,
  url: string
) {
  return function WithData(props: P) {
    const [data, setData] = useState<Usuario | null>(null)

    useEffect(() => {
      let cancelado = false

      async function cargar() {
        try {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const json: Usuario = await res.json()
          if (!cancelado) setData(json)
        } catch {
          if (!cancelado) setData(null)
        }
      }

      cargar()
      return () => {
        cancelado = true
      }
    }, [])

    return <Wrapped {...props} data={data} />
  }
}
```

**Comprobación:** al usar el HOC más adelante, la petición aparece en la pestaña Network.

---

## Paso 4 — Estado de carga

**Objetivo:** no renderizar el hijo hasta tener respuesta (o error).

Añade estado `cargando` en el HOC:

```tsx
const [data, setData] = useState<Usuario | null>(null)
const [cargando, setCargando] = useState(true)
```

En `cargar`, al terminar: `setCargando(false)`.

Antes del `return`:

```tsx
if (cargando) {
  return <p>Cargando datos…</p>
}

return <Wrapped {...props} data={data} />
```

**Comprobación:** ves «Cargando datos…» un instante y luego nombre + email.

---

## Paso 5 — Usar el HOC en `App`

**Objetivo:** consumir el patrón `const Vista = withData(Componente, url)`.

Sustituye **`src/App.tsx`**:

```tsx
import { withData } from './hoc/withData'
import { InfoUsuario } from './components/InfoUsuario'

const InfoUsuarioConDatos = withData(
  InfoUsuario,
  'https://jsonplaceholder.typicode.com/users/1'
)

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>HOC withData</h1>
      <InfoUsuarioConDatos />
    </div>
  )
}

export default App
```

**Comprobación:** usuario con id 1 de JSONPlaceholder (nombre y email reales de la API).

---

## Paso 6 — Repasar responsabilidades

**Objetivo:** separar capas.

| Pieza | Responsabilidad |
|-------|-----------------|
| `InfoUsuario` | Presentación (qué pintar con `data`) |
| `withData` | Petición HTTP, loading, inyectar `data` |
| `App` | Elegir URL y componente envuelto |

**Comprobación:** puedes reutilizar `withData` con otra URL y otro componente que acepte `data`.

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| Siempre «Cargando…» | `setCargando(false)` en `finally`; URL correcta. |
| CORS / red | JSONPlaceholder permite GET desde el navegador. |
| Props en rojo | El envuelto debe aceptar `{ data: Usuario \| null }`. |

---

## Retos

| Reto | Criterio de éxito |
|------|-------------------|
| A | Muestra mensaje de error si `fetch` falla (estado `error: string \| null`). | Texto de error visible. |
| B | Crea `withDataLista` que devuelva un array (`/users`) y un `ListaUsuarios`. | Lista de 10 usuarios. |
| C | Compara mentalmente: ¿qué hook personalizado reemplazaría este HOC? | Respuesta escrita: `useFetch(url)`. |

---

## Anexo — `withData.tsx` completo

```tsx
import { useEffect, useState, type ComponentType } from 'react'
import type { Usuario } from '../components/InfoUsuario'

export function withData<P extends object>(
  Wrapped: ComponentType<P & { data: Usuario | null }>,
  url: string
) {
  return function WithData(props: P) {
    const [data, setData] = useState<Usuario | null>(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
      let cancelado = false

      async function cargar() {
        try {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const json: Usuario = await res.json()
          if (!cancelado) setData(json)
        } catch {
          if (!cancelado) setData(null)
        } finally {
          if (!cancelado) setCargando(false)
        }
      }

      cargar()
      return () => {
        cancelado = true
      }
    }, [])

    if (cargando) return <p>Cargando datos…</p>
    return <Wrapped {...props} data={data} />
  }
}
```

---

## Qué has practicado

- Patrón HOC: función que devuelve un componente envuelto.
- Reutilizar fetch + loading en un solo sitio.
- Inyectar datos como props al componente presentacional.

**Siguiente:** [7.5 Lab useReducer contador](07-05-lab-useReducer-contador.md).
