import "./App.css";

import { useState } from "react";
import { Contador } from "./components/Contador";
import { Reloj } from "./components/Reloj";

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <h1>useState</h1>
      <Contador />

      <hr />

      <h1>Reloj con useEffect</h1>
      <button type="button" onClick={() => setVisible((v) => !v)}>
        {visible ? "Ocultar" : "Mostrar"} reloj
      </button>
      {visible ? <Reloj /> : <p>Reloj desmontado</p>}
    </div>
  );
}

// import { ListaProductos } from "./components/ListaProductos";
// import { productos } from "./data/productos";
// function App() {
//   return (
//     <div style={{ padding: "1rem" }}>
//       <h1>Catálogo</h1>
//       <ListaProductos items={productos} />
//     </div>
//   );
// }

//import noticias from "./data/noticias.json";
//import { Noticia } from "./components/Noticia";
//function App() {
//  return (
//    <div>
//      <h1>Noticias</h1>
//      {noticias.length === 0 && <p>No hay noticias publicadas.</p>}
//      {noticias.map((noticia) => (
//        <Noticia
//          key={noticia.id}
//          noticia={noticia}
//          mostrarContenido={noticia.id === "n1"}
//        />
//      ))}
//    </div>
//  );
//}

// import { Tarjeta } from "./components/Tarjeta";
// function App() {
//   return (
//     <div>
//       <h1>Composición</h1>
//       <Tarjeta titulo="Prueba">
//         <p>Contenido dentro de la tarjeta.</p>
//       </Tarjeta>
//     </div>
//   );
// }

export default App;
