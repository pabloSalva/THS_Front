import React from "react";
import EtiquetadoTemplate from "../templates/etiquetadoTemplate";

const Etiquetado = () => {
  const crearDomiciclio = () => alert("domicilio nuevo");
  const verDomicilios = () => alert("ver domicilios");
  const eficienciaPage = () => alert("pagina eficiencia");
  return (
    <EtiquetadoTemplate
      crearDomiciclio={crearDomiciclio}
      verDomicilios={verDomicilios}
      calcularEficieenciaPage={eficienciaPage}
    />
  );
};

export default Etiquetado;
