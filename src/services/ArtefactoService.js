import Environment from "../environment";

import Api from "./ApiService";

export const ArtefactoService = {
  getArtefactos: async () => {
    const getResult = await Api.fetch(`${Environment.api}artefactos`, "GET");
    return getResult;
  },
};
