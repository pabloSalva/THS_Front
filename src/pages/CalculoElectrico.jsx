import React, { useEffect } from "react";
import CalculadoraElectricaTemplate from "../templates/calculadoraElectricaTemplate";
import { ArtefactoService } from "../services/ArtefactoService";

const CalculoElectrico = () => {
  const Artefactos = () => {
    ArtefactoService.getArtefactos()
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    Artefactos();
  }, []);
  return <CalculadoraElectricaTemplate openDrawer={true} />;
};

export default CalculoElectrico;
