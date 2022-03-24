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
  etiquetaDomicilio: async (data) => {
    const getResult = await Api.fetch(
      `${Environment.api}inmuebles/etiqueta/`,
      "GET",
      data
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
  deleteAmbientes: async (id) => {
    const getResult = await Api.fetch(
      `${Environment.api}ambientes/${id}/`,
      "DELETE"
    );
    return getResult;
  },
  createCerramiento: async (data) => {
    const getResult = await Api.fetch(
      `${Environment.api}cerramientos/`,
      "POST",
      data
    );
    return getResult;
  },
  updateCerramiento: async (data, id) => {
    const getResult = await Api.fetch(
      `${Environment.api}cerramientos/${id}/`,
      "PATCH",
      data
    );
    return getResult;
  },
  deleteCerramiento: async (id) => {
    const getResult = await Api.fetch(
      `${Environment.api}cerramientos/${id}/`,
      "DELETE"
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
  updateAmbienteArtefacto: async (data) => {
    // {
    //   "ambiente":1,
    //   "artefactos":[2,3]
    // }
    const getResult = await Api.fetch(
      `${Environment.api}ambientes/artefactos/`,
      "PUT",
      data
    );
    return getResult;
  },
  getArtefactoAmbiente: async (data) => {
    const getResult = await Api.fetch(
      `${Environment.api}ambientes/artefactos-ambiente/`,
      "GET",
      data
    );
    return getResult;
  },
  eliminarArtefactoAmbiente: async (data) => {
    const getResult = await Api.fetch(
      `${Environment.api}ambientes/artefactos-ambiente-delete/`,
      "PATCH",
      data
    );
    return getResult;
  },
  crearEtiqueta: async (id) => {
    const getResult = await Api.fetch(
      `${Environment.api}inmuebles/etiqueta-create/`,
      "POST",
      id
    );
    return getResult;
  },
};
