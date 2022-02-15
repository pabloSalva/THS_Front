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
  getDomicilio: async (id) => {
    const getResult = await Api.fetch(
      `${Environment.api}inmuebles/${id}`,
      "GET"
    );
    return getResult;
  },
  editDomicilio: async (id, data) => {
    const getResult = await Api.fetch(
      `${Environment.api}inmuebles/${id}/`,
      "PUT",
      data
    );
    return getResult;
  },
  deleteDomicilio: async (id) => {
    const getResult = await Api.fetch(
      `${Environment.api}inmuebles/${id}/`,
      "DELETE"
    );
    return getResult;
  },
  getMateriales: async () => {
    const getResult = await Api.fetch(`${Environment.api}materiales/`, "GET");
    return getResult;
  },
  getAmbientes: async (id) => {
    const getResult = await Api.fetch(
      `${Environment.api}ambientes/?inmueble=${id}`,
      "GET"
    );
    return getResult;
  },
  createAmbientes: async (data) => {
    const getResult = await Api.fetch(
      `${Environment.api}ambientes/`,
      "POST",
      data
    );
    return getResult;
  },
  getCerramiento: async (id) => {
    const getResult = await Api.fetch(
      `${Environment.api}cerramientos/${id}`,
      "GET"
    );
    return getResult;
  },
  getCerramientos: async (id) => {
    const getResult = await Api.fetch(
      `${Environment.api}cerramientos/?ambiente=${id}`,
      "GET"
    );
    return getResult;
  },
};
