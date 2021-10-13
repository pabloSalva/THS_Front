import React, { useEffect, useState } from "react";
import EtiquetadoTemplate from "../templates/etiquetadoTemplate";
import { useForm } from "react-hook-form";
import { LocalidadService } from "../services/LocalidaService";

const Etiquetado = () => {
  const [domicilioCreate, setDomicilioCreate] = useState(false);
  const [dimicilioView, setDomicilioView] = useState(false);
  const [eficienciaCreate, setEficienciaCreate] = useState(false);
  useEffect(() => {
    LocalidadService.getLocalidades()
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  const crearDomiciclio = () => {
    setDomicilioCreate(true);
    setDomicilioView(false);
    setEficienciaCreate(false);
  };
  const verDomicilios = () => {
    setDomicilioCreate(false);
    setDomicilioView(true);
    setEficienciaCreate(false);
  };
  const eficienciaPage = () => {
    setDomicilioCreate(false);
    setDomicilioView(false);
    setEficienciaCreate(true);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    alert(data.nombre, data.cantidad_personas, data.antiguedad);
  };
  return (
    <EtiquetadoTemplate
      crearDomiciclio={crearDomiciclio}
      verDomicilios={verDomicilios}
      calcularEficienciaPage={eficienciaPage}
      domicilioCreate={domicilioCreate}
      dimicilioView={dimicilioView}
      eficienciaCreate={eficienciaCreate}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
    />
  );
};

export default Etiquetado;
