/* eslint-disable camelcase */
class User {
  id = null;
  username = null;
  email = null;
  is_confirmed = null;
  is_staff = null;
  is_active = null;
  last_login = null;
  account = null;
  groups = [];
  roles = [];
  language = "es";

  constructor(obj) {
    // Inicializo el objeto usuario si lo recibo como paramtetro
    for (const prop in obj) {
      obj[prop] && (this[prop] = obj[prop]);
    }
  }

  fullName() {
    return `${this.persona.first_name} ${this.persona.last_name}`;
  }
}

export default User;
