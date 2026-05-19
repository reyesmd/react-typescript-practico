import { useEffect, useState } from "react";

function formatearHora(fecha: Date): string {
  return fecha.toLocaleTimeString("es-ES", { hour12: false });
}

export function Reloj() {
  //const [hora, setHora] = useState(new Date().toLocaleTimeString() // Valor directo, se evalua en cada render
  //const [hora, setHora] = useState(() => new Date().toLocaleTimeString()); // Función inicializadora, se evalua solo en el PRIMER render

  const [hora, setHora] = useState(() => formatearHora(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setHora(formatearHora(new Date()));
    }, 1000);

    return () => {
      window.clearInterval(id); // cleanup al desmontar
    };
  }, []); // [] = solo al montar

  return (
    <div>
      <p>Hora: {hora}</p>
    </div>
  );
}
