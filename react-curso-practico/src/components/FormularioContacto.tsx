import { useState, type FormEvent } from "react";
import { validarEmail } from "../utils/validarEmail";

type ResumenEnviado = { nombre: string; email: string; mensaje: string };

export function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [resumen, setResumen] = useState<ResumenEnviado | null>(null);

  const emailValido = validarEmail(email);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita la recarga de la pagina al enviar
    if (!emailValido) return;
    setEnviado(true);

    setResumen({ nombre, email, mensaje });
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contacto</h2>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:{" "}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      {!emailValido && email.length > 0 && (
        <p style={{ color: "crimson" }}>Introduce un email válido.</p>
      )}
      <br /> <br />
      <label>
        Mensaje:{" "}
        <textarea
          rows={4}
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" disabled={!emailValido}>
        Enviar
      </button>
      <br />
      {enviado && resumen && (
        <div
          style={{ marginTop: "1rem", padding: "1rem", background: "#f0f0f0" }}
        >
          <h3>Resumen enviado</h3>
          <p>
            <strong>Nombre:</strong> {resumen.nombre}
          </p>
          <p>
            <strong>Email:</strong> {resumen.email}
          </p>
          <p>
            <strong>Mensaje:</strong> {resumen.mensaje}
          </p>
        </div>
      )}
    </form>
  );
}
