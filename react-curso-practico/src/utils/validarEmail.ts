export function validarEmail(email: string): boolean {
  const texto = email.trim();
  const arroba = texto.indexOf("@");
  const punto = texto.lastIndexOf(".");

  if (texto.length < 5) return false;

  return arroba > 1 && punto > arroba + 1 && punto < texto.length - 1;
}
