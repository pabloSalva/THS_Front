import Environment from "../environment";

import Api from "./ApiService";

export const ArtefactoService = {
  getArtefactos: async (params) => {
    const getResult = await Api.fetch(
      `${Environment.api}artefactos/${params}`,
      "GET"
    );
    return getResult;
  },
};
