import { useState } from "react";

type Tarea = { id: number; texto: string; hecha: boolean };

const tareasIniciales: Tarea[] = [
  { id: 1, texto: "Configurar Vite", hecha: true },
  { id: 2, texto: "Practicar TSX", hecha: false },
  { id: 3, texto: "Añadir router", hecha: false },
  { id: 4, texto: "Utiizar useState", hecha: false },
];

function ListaDemo() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [soloPendientes, setSoloPendientes] = useState(false);

  const visibles = soloPendientes ? tareas.filter((t) => !t.hecha) : tareas;

  return (
    <section>
      <h2>Tareas</h2>
      <label>
        <input
          type="checkbox"
          checked={soloPendientes}
          onChange={(e) => setSoloPendientes(e.target.checked)}
        />
        Solo pendientes
      </label>
      <ul>
        {visibles.map((t) => (
          <li key={t.id}>
            {t.hecha ? "✓ " : "○ "}
            {t.texto}
          </li>
        ))}
      </ul>
      {visibles.length === 0 && <p>No hay tareas que mostrar.</p>}
    </section>
  );
}

export default ListaDemo;
