import Environment from "../environment";

import Api from "./ApiService";

export const EntidadesService = {
  getEntidades: async () => {
    const getResult = await Api.fetch(`${Environment.api}entidades/`, "GET");
    return getResult;
  },
  getTarifas: async (id) => {
    const getResult = await Api.fetch(`${Environment.api}tarifas/${id}`, "GET");
    return getResult;
  },
  getAllTarifas: async (id) => {
    const getResult = await Api.fetch(`${Environment.api}tarifas/`, "GET");
    return getResult;
  },
};
