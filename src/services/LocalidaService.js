import Environment from "../environment";

import Api from "./ApiService";

export const LocalidadService = {
  getLocalidades: async () => {
    const getResult = await Api.fetch(`${Environment.api}localidades/`, "GET");
    return getResult;
  },
};
