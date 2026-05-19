import { useState } from "react";

export function Contador() {
  const [cuenta, setCuenta] = useState(0); // declara el estado del componente,
  // react hook para crear estado, devuelve array de 2 componentes (destructuring)
  // al llamar a setCuenta, react sabe que algo cambio y actualiza pantalla
  // usa narrowing Typscript: vble de tipo number

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <button
        type="button"
        onClick={
          () => setCuenta((c) => (c > 0 ? c - 1 : 0)) // evita valores negativos comprobando el valor actual antes de decrementar
        }
      >
        −
      </button>
      <span>Cuenta: {cuenta}</span> {/* bind prop con UI */}
      <button type="button" onClick={() => setCuenta((c) => c + 1)}>
        {/* onClick react Prop, recibe funcion
      user hace click, 
      se ejecuta la arrow function, se ejecuta setCuenta(cuenta+1), 
      se actualiza el estado y re-renderiza el componente  
      usa la forma funcional: (c) => c - 1 en lugar de cuenta - 1 
      usa funcion a la que se le pasa el valor previo c, para evitar valores obsoletos en actualizaciones rapidas*/}
        +
      </button>
      <button type="button" onClick={() => setCuenta(0)}>
        Reiniciar
      </button>
      {/* Mensaje condicional si cuenta = 10*/}
      {cuenta === 10 && (
        <p style={{ color: "red", fontWeight: "bold" }}>¡Máximo alcanzado!</p>
      )}
    </div>
  );
}
