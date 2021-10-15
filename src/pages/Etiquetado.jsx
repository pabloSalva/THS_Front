import React, { useEffect, useState } from "react";
import EtiquetadoTemplate from "../templates/etiquetadoTemplate";
import { useForm } from "react-hook-form";
import { LocalidadService } from "../services/LocalidaService";
import { DomicilioService } from "../services/DomicilioService";

const Etiquetado = () => {
  const [domicilioCreate, setDomicilioCreate] = useState(false);
  const [dimicilioView, setDomicilioView] = useState(false);
  const [eficienciaCreate, setEficienciaCreate] = useState(false);
  const [localidad, setLocalidad] = useState("");
  const [localidades, setLocalidades] = useState([]);

  useEffect(() => {
    LocalidadService.getLocalidades()
      .then((response) => {
        setLocalidades(response);
      })
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

  const handleChangeLocalidad = (e) => {
    console.log(e);
    setLocalidad(e.target.value);
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    DomicilioService.createDomicilios(data)
      .then((response) => {
        console.log(response);
        alert("Nuevo domicilio creado");
        reset({
          nombre: "",
          antiguedad: "",
          cantidad_personas: "",
          localidad: "",
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error al crear domicilio");
      });
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
      handleChangeLocalidad={handleChangeLocalidad}
      localidad={localidad}
      localidades={localidades}
    />
  );
};

export default Etiquetado;
