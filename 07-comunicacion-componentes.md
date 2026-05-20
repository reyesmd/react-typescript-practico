# 7. Comunicación entre componentes (avanzado)

[← Índice](README.md) | [← Anterior: 6. Eventos](06-eventos-formularios.md) | [Lab 7.0 →](07-00-lab-prop-drilling.md) | [Siguiente: 8. Routing →](08-routing.md)

---

En capítulos anteriores ya trabajaste **props**, **callbacks** y **`useState`** / **`useEffect`** (cap. 4–6 y 5). Este bloque ataca el **prop drilling** y la lógica compartida en árboles grandes.

| Herramienta | Para qué sirve |
|-------------|----------------|
| **Props + callbacks** | Comunicación directa padre ↔ hijo (repaso en 7.0) |
| **Context + `useContext`** | Valores globales de UI (idioma, tema) sin reenviar props |
| **HOC** (`with…`) | Envolver componentes y añadir comportamiento reutilizable |
| **`useReducer`** | Estado con acciones y reglas en un `reducer` |
| **Hooks personalizados** | Encapsular Context o fetch (`useLang`, `useTheme`) |

---

## Prop drilling

```
App (estado)
 └── Layout (solo reenvía props)
      └── Panel (usa props)
```

El lab **7.0** lo reproduce a propósito. Los labs **7.1** y **7.2** lo sustituyen por **Context**.

---

## Context API y `useContext`

1. `createContext`
2. `<Provider value={…}>`
3. `useContext` o un hook propio (`useLang`, `useTheme`)

**Cuándo usarlo:** tema, idioma, usuario de sesión. **Cuándo no:** estado de un solo input o de un formulario local.

---

## Higher Order Components (HOC)

Función `withAlgo(Componente)` → componente envuelto. Convención: nombre con prefijo **`with`**.

- **7.3** — `withHover` (UI transversal)
- **7.4** — `withData` (fetch + loading + inyectar `data`)

En código nuevo suele preferirse **custom hooks** (lab **7.7**), pero los HOC siguen en librerías y proyectos legacy.

---

## `useReducer`

`const [state, dispatch] = useReducer(reducer, initialState)`

- **7.5** — contador con acciones tipadas
- **7.6** — posición de una caja con teclado + `useEffect` para listeners

Útil cuando muchas transiciones comparten reglas en un solo `switch`.

---

## Hooks personalizados

Funciones `useX()` que pueden llamar a otros hooks. El lab **7.7** define `useLang()` sobre el contexto del **7.1**.

---

## Laboratorios (orden recomendado)

| Lab | Tema |
|-----|------|
| [7.0 Prop drilling](07-00-lab-prop-drilling.md) | El problema (callbacks por niveles) |
| [7.1 useContext — idioma](07-01-lab-useContext.md) | `LangProvider` + `Header` anidado |
| [7.2 Context — tema](07-02-lab-context-tema.md) | Claro / oscuro + `useTheme` |
| [7.3 HOC — withHover](07-03-lab-hoc-withHover.md) | Estilos hover + `{...props}` |
| [7.4 HOC — withData](07-04-lab-hoc-withData.md) | Fetch reutilizable |
| [7.5 useReducer — contador](07-05-lab-useReducer-contador.md) | Acciones tipadas |
| [7.6 useReducer — caja](07-06-lab-useReducer-caja.md) | Teclado + reducer + cleanup |
| [7.7 Hook — useLang](07-07-lab-hook-useLang.md) | Custom hook sobre Context |

Cada lab es un MD dedicado: objetivo por paso, comprobaciones, retos y «si algo falla».
