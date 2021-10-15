import Environment from "../environment";

import Api from "./ApiService";

export const DomicilioService = {
  getDomicilios: async () => {
    const getResult = await Api.fetch(`${Environment.api}inmuebles/`, "GET");
    return getResult;
  },
  createDomicilios: async (data) => {
    const getResult = await Api.fetch(
      `${Environment.api}inmuebles/`,
      "POST",
      data
    );
    return getResult;
  },
};
