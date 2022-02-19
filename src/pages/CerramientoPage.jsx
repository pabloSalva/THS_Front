import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { DomicilioService } from "../services/DomicilioService";
import CerramientoTemplate from "../templates/cerramientos";
const CerramientoPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [materiales, setMateriales] = useState([]);
  const [tipoCerramiento, setTipoCerramiento] = useState("Techo");
  const [cerramiento, setCerramiento] = useState({});
  const [esEditar, setEsEditar] = useState(false);
  const buttonSubmit =
    location?.state?.editar === "editar"
      ? "Editar Cerramiento"
      : "Crear Cerramiento";
  console.log(history);
  console.log(location);

  useEffect(() => {
    DomicilioService.getMateriales()
      .then((response) => setMateriales(response))
      .catch((error) => console.log(error));
    id &&
      DomicilioService.getCerramiento(id)
        .then((response) => {
          setCerramiento(response);
          setValue("denominacion", response.denominacion);
          setValue("ancho", response.ancho);
          setValue("alto", response.alto);
          setValue("tipo", response.tipo);
          setValue("es_externo", response.es_externo);
          setValue("orientacion", response.orientacion);
          setValue("material", response.material);
        })
        .catch((error) => console.log(error));

    location?.state?.editar && setEsEditar(true);
  }, []);
  const booleano = true;
  const { handleSubmit, reset, watch, setValue, register, getValues } = useForm(
    {
      defaultValues: {
        denominacion: "",
        ancho: 0,
        alto: 0,
        tipo: tipoCerramiento,
        es_externo: true,
        orientacion: "",
        material: "",
      },
      mode: "onChange",
    }
  );

  const editarCerramiento = (data, id) => {
    console.log(data, id);
    DomicilioService.updateCerramiento(data, id)
      .then((response) => {
        history.push({
          pathname: `/ambientes/${location.state.ambienteId}/`,
          state: { exito: "La edición del cerramiento fue exitosa" },
        });
      })
      .catch((error) => console.log(error));
  };

  const crearCerramiento = (data) => {
    DomicilioService.createCerramiento(data)
      .then((response) => {
        history.push({
          pathname: `/ambientes/${location.state.ambienteId}/`,
          state: { exito: "La creación del cerramiento fue exitosa" },
        });
      })
      .catch((error) => console.log(error));
  };
  // const superficie = () => getValues("ancho") * getValues("alto");
  const onSubmit = (data) => {
    // console.log(data, superficie())
    const nuevaData = { ...data, ambiente: [location?.state?.ambienteId] };
    location?.state?.editar === "editar"
      ? editarCerramiento(nuevaData, id)
      : crearCerramiento(nuevaData);
  };

  const tipoTecho = () => {
    setTipoCerramiento("Techo");
    setValue("tipo", "Techo");
  };
  const tipoPared = () => {
    setTipoCerramiento("Pared");
    setValue("tipo", "Pared");
  };
  const tipoPuerta = () => {
    setTipoCerramiento("Puerta");
    setValue("tipo", "Puerta");
  };
  const tipoVentana = () => {
    setTipoCerramiento("Ventana");
    setValue("tipo", "Ventana");
  };

  const eliminarCerramiento = () => {
    DomicilioService.deleteCerramiento(id)
      .then((response) => {
        history.push({
          pathname: `/ambientes/${location.state.ambienteId}/`,
          state: { exito: "La Eliminación del cerramiento fue exitosa" },
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <CerramientoTemplate
      materiales={materiales}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      tipoTecho={tipoTecho}
      tipoPared={tipoPared}
      tipoVentana={tipoVentana}
      tipoPuerta={tipoPuerta}
      tipoCerramiento={tipoCerramiento}
      cerramientos={cerramiento}
      buttonSubmit={buttonSubmit}
      eliminarCerramiento={eliminarCerramiento}
      esEditar={esEditar}
    />
  );
};

export default CerramientoPage;
