import User from "./User";

/* eslint-disable camelcase */
class Artefacto {
  id = null;
  etiqueta = null;
  nombre = null;
  consumo = null;
  calor_residual = null;
  categoria = null;
  descripcion = null;
  marca = null;
  modelo = [];
  tipo = [];
  users = User;
  ambientes = null;

  constructor(obj) {
    // Inicializo el objeto Artefacto si lo recibo como paramtetro
    for (const prop in obj) {
      obj[prop] && (this[prop] = obj[prop]);
    }
  }
}

export default Artefacto;
