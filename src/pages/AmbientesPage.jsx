import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { DomicilioService } from "../services/DomicilioService";
import AmbientesTemplate from "../templates/ambientes";
const AmbientesPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [materiales, setMateriales] = useState([]);
  const [tipoCerramiento, setTipoCerramiento] = useState("TECHO");
  const [paperArtefacto, setPaperArtefacto] = useState(false);
  const [paperCerramiento, setPaperCerramiento] = useState(true);
  const [ambienteDescripcion, setAmbienteDescripcion] = useState(
    location?.state?.descripcion
  );
  const [cerramientos, setCerramientos] = useState([]);

  useEffect(() => {
    DomicilioService.getMateriales()
      .then((response) => setMateriales(response))
      .catch((error) => console.log(error));
    DomicilioService.getCerramientos(id)
      .then((response) => {
        console.log(response);
        setCerramientos(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const { handleSubmit, reset, watch, setValue, register, getValues } = useForm(
    {
      defaultValues: {
        denominacion: "",
        superficie: 0,
        tipo: tipoCerramiento,
        orientacion: "",
        material: "",
      },
      mode: "onChange",
    }
  );
  const superficie = () => getValues("ancho") * getValues("alto");
  const onSubmit = (data) => console.log(data, superficie());

  const tipoTecho = () => {
    setTipoCerramiento("TECHO");
    setValue("TECHO");
  };
  const tipoPared = () => {
    setTipoCerramiento("PARED");
    setValue("PARED");
  };
  const tipoPuerta = () => {
    setTipoCerramiento("PUERTA");
    setValue("PUERTA");
  };
  const tipoVentana = () => {
    setTipoCerramiento("VENTANA");
    setValue("VENTANA");
  };

  const verCerramientos = () => {
    setPaperArtefacto(false);
    setPaperCerramiento(true);
  };

  const verArtefactos = () => {
    setPaperArtefacto(true);
    setPaperCerramiento(false);
  };

  const nuevoCerramiento = () => {
    history.push({
      pathname: `/cerramientos/`,
    });
  };
  const verCerramiento = (id) => {
    history.push({
      pathname: `/cerramiento/${id}`,
    });
  };
  return (
    <AmbientesTemplate
      materiales={materiales}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      tipoTecho={tipoTecho}
      tipoPared={tipoPared}
      tipoVentana={tipoVentana}
      tipoPuerta={tipoPuerta}
      tipoCerramiento={tipoCerramiento}
      verCerramientos={verCerramientos}
      verArtefactos={verArtefactos}
      paperArtefacto={paperArtefacto}
      paperCerramiento={paperCerramiento}
      ambienteDescripcion={ambienteDescripcion}
      nuevoCerramiento={nuevoCerramiento}
      cerramientos={cerramientos}
      verCerramiento={verCerramiento}
    />
  );
};

export default AmbientesPage;
