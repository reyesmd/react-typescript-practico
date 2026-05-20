# 7.7. Lab — Hook personalizado `useLang`

[← Capítulo 7](07-comunicacion-componentes.md) | [← Lab 7.6](07-06-lab-useReducer-caja.md) | [Índice](README.md) | [Siguiente: Cap. 8 →](08-routing.md) | [Lab 8.1 →](08-01-lab-react-router.md)

---

## Objetivo del laboratorio

Extraer la lógica del [lab 7.1](07-01-lab-useContext.md) al hook **`useLang()`**: encapsula `useContext`, validación y tipos. Patrón habitual frente a HOC en código moderno.

## Tiempo estimado

30–40 minutos.

## Archivos

| Archivo | Acción |
|---------|--------|
| `src/hooks/useLang.ts` | Crear |
| `src/context/LangContext.tsx` | Ajustar (si hace falta) |
| `src/components/Header.tsx` | Modificar |

## Prerrequisitos

- [7.1 Lab useContext](07-01-lab-useContext.md) completado (o equivalente con `LangProvider`).
- `npm run dev` en tu proyecto.

## Resultado esperado

`Header` usa `useLang()` en lugar de `useContext(LangContext)` directo; mismo comportamiento de idiomas.

---

## Paso 1 — Hook `useLang`

**Objetivo:** API clara para consumir el contexto.

Crea **`src/hooks/useLang.ts`**:

```tsx
import { useContext } from 'react'
import { LangContext, type Traducciones } from '../context/LangContext'

export function useLang(): Traducciones {
  const ctx = useContext(LangContext)
  if (!ctx) {
    throw new Error('useLang debe usarse dentro de <LangProvider>')
  }
  return ctx
}
```

**Comprobación:** exporta función tipada como `Traducciones`.

---

## Paso 2 — Refactorizar `Header`

**Objetivo:** consumir el hook.

En **`src/components/Header.tsx`**, sustituye `useContext` por:

```tsx
import { useLang } from '../hooks/useLang'

export function Header() {
  const t = useLang()

  return (
    <header style={{ margin: '1rem 0', borderBottom: '1px solid #ccc' }}>
      <h1>{t.bienvenida}</h1>
      <p>{t.despedida}</p>
    </header>
  )
}
```

Elimina el `if (!t)` manual: el hook ya lanza error si falta Provider.

**Comprobación:** cambio de idioma sigue actualizando textos.

---

## Paso 3 — (Opcional) `useTheme` paralelo

**Objetivo:** repetir el patrón del [7.2](07-02-lab-context-tema.md).

Si completaste el 7.2, confirma que `useTheme` en `ThemeContext.tsx` sigue el mismo diseño que `useLang`.

**Comprobación:** dos hooks de contexto con nombres coherentes.

---

## Paso 4 — Comparar HOC vs hook

**Objetivo:** cerrar el bloque 7.

| Enfoque | Ventaja |
|---------|---------|
| HOC (`withData`, `withHover`) | Reutiliza envoltorio en componentes clase / legacy |
| Hook (`useLang`, `useFetch`) | Composable, mejor inferencia TS, menos anidación |

**Comprobación:** una frase tuya sobre cuándo elegirías cada uno.

---

## Si algo falla

| Síntoma | Qué revisar |
|---------|-------------|
| Error useLang fuera de Provider | `App` envuelto con `<LangProvider>`. |
| Tipos distintos | Exporta `Traducciones` desde `LangContext.tsx`. |

---

## Retos

| Reto | Criterio |
|------|----------|
| A | Crea `useFetch<T>(url)` y úsalo en lugar del HOC del 7.4 para un usuario. | Fetch sin `withData`. |
| B | Combina `useLang` + `useTheme` en un componente `BarraPreferencias`. | Dos contextos, un panel. |
| C | Documenta en README del proyecto la tabla de hooks del curso. | Lista `useLang`, etc. |

---

## Qué has practicado

- Custom hooks que envuelven Context.
- Alternativa moderna a parte de la lógica que antes iba en HOC.

**Siguiente:** [Capítulo 8 Routing](08-routing.md) → [8.1 Lab React Router](08-01-lab-react-router.md).
