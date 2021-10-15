import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LocalidadService } from "../services/LocalidaService";
import { DomicilioService } from "../services/DomicilioService";
import EditarDomicilioTemplate from "../templates/editarDomicilio";
import { useHistory, useParams } from "react-router";

const EditarDomicilioPage = () => {
  const [domicilioEdit, setDomicilioEdit] = useState(true);
  const [dimicilioView, setDomicilioView] = useState(false);
  const [domicilio, setDomicilio] = useState([]);
  const [eficienciaCreate, setEficienciaCreate] = useState(false);
  const [localidad, setLocalidad] = useState("");
  const [localidades, setLocalidades] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    LocalidadService.getLocalidades()
      .then((response) => {
        setLocalidades(response);
      })
      .catch((error) => console.log(error));
    console.log(id);
    DomicilioService.getDomicilio(id)
      .then((response) => {
        setDomicilio(response);
        console.log(response);
        setValue("nombre", response.nombre);
        setValue("antiguedad", response.antiguedad);
        setValue("cantidad_personas", response.cantidad_personas);
        setValue("localidad", response.localidad.id);
      })
      .catch((error) => console.log(error));
  }, []);

  const editarDomiciclio = () => {
    setDomicilioEdit(true);
    setDomicilioView(false);
    setEficienciaCreate(false);
  };
  const verDomicilios = () => {
    setDomicilioEdit(false);
    setDomicilioView(true);
    setEficienciaCreate(false);
  };
  const eficienciaPage = () => {
    setDomicilioEdit(false);
    setDomicilioView(false);
    setEficienciaCreate(true);
  };

  const handleChangeLocalidad = (e) => {
    console.log(e);
    setLocalidad(e.target.value);
  };
  console.log(domicilio);
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      nombre: domicilio.nombre,
      antiguedad: domicilio.antiguedad,
      cantidad_personas: domicilio.cantidad_personas,
      localidad: domicilio.localidad,
    },
  });

  const watchAllFields = watch();
  console.log(watchAllFields);
  const onSubmit = (data) => {
    console.log(data);
    DomicilioService.editDomicilio(id, data)
      .then((response) => {
        console.log(response);
        alert("Domicilio Editado con exito");
      })
      .catch((error) => {
        console.log(error);
        alert("Error al Editar domicilio");
      });
  };

  const buttonVolver = () => {
    history.push({
      pathname: "/domicilios",
    });
  };
  return (
    <EditarDomicilioTemplate
      editarDomiciclio={editarDomiciclio}
      verDomicilios={verDomicilios}
      calcularEficienciaPage={eficienciaPage}
      domicilioEdit={domicilioEdit}
      dimicilioView={dimicilioView}
      eficienciaCreate={eficienciaCreate}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      handleChangeLocalidad={handleChangeLocalidad}
      localidad={localidad}
      localidades={localidades}
      buttonVolver={buttonVolver}
    />
  );
};

export default EditarDomicilioPage;
