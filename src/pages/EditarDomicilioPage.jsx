import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LocalidadService } from "../services/LocalidaService";
import { DomicilioService } from "../services/DomicilioService";
import EditarDomicilioTemplate from "../templates/editarDomicilio";
import { useHistory, useParams } from "react-router";
import { useAlert } from "react-alert";
import { ArtefactoService } from "../services/ArtefactoService";

const EditarDomicilioPage = () => {
  const [domicilioEdit, setDomicilioEdit] = useState(true);
  const [dimicilioView, setDomicilioView] = useState(false);
  const [ambienteView, setAmbienteView] = useState(false);
  const [artefactos, setArtefactos] = useState(false);
  const [existe, setExiste] = useState(true);
  const [valueSearch, setValueSearch] = useState("");
  const [domicilio, setDomicilio] = useState([]);
  const [eficienciaCreate, setEficienciaCreate] = useState(false);
  const [localidad, setLocalidad] = useState("");
  const [localidades, setLocalidades] = useState([]);
  const [tipoCerramiento, setTipoCerramiento] = useState("TECHO");
  const alert = useAlert();
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
  const agregarArtefacto = () => {
    setDomicilioEdit(false);
    setAmbienteView(false);
    setArtefactos(true);
  };
  const crearAmbiente = () => {
    setDomicilioEdit(false);
    setAmbienteView(true);
    setEficienciaCreate(false);
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
    mode: "onBlur",
  });

  const watchAllFields = watch();
  console.log(watchAllFields);
  const onSubmitEdit = (data) => {
    console.log(data);
    DomicilioService.editDomicilio(id, data)
      .then((response) => {
        console.log(response);
        alert.success("Domicilio Editado con exito");
      })
      .catch((error) => {
        console.log(error);
        alert.error("Error al Editar domicilio");
      });
  };

  const tipoTecho = () => {
    setTipoCerramiento("TECHO");
  };
  const tipoPared = () => {
    setTipoCerramiento("PARED");
  };
  const tipoPuerta = () => {
    setTipoCerramiento("PUERTA");
  };
  const tipoVentana = () => {
    setTipoCerramiento("VENTANA");
  };

  const buttonVolver = () => {
    history.push({
      pathname: "/domicilios",
    });
  };

  /** Sección de crear cerramiento */

  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    DomicilioService.getMateriales()
      .then((response) => setMateriales(response))
      .catch((error) => console.log(error));
  }, []);

  // const {
  //   register: register2,
  //   getValues,
  //   handleSubmit: handleSubmit2,
  // } = useForm({
  //   defaultValues: {
  //     denominacion: "",
  //     superficie: "",
  //     tipo: "",
  //     orientacion: "",
  //     material: "",
  //   },
  //   mode: "onBlur",
  // });
  // const superficie = () => getValues("ancho") * getValues("alto");
  // const onSubmitCerramiento = (data) => console.log(data, superficie());

  const Artefactos = () => {
    const params = `?search=${valueSearch}`;
    ArtefactoService.getArtefactos(params)
      .then((response) => {
        response.length > 0 ? setExiste(true) : setExiste(false);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  console.log(existe);
  const handleSearchBar = (event) => {
    Artefactos();
    setValueSearch(event.target.value);
  };
  return (
    <EditarDomicilioTemplate
      editarDomiciclio={editarDomiciclio}
      domicilioEdit={domicilioEdit}
      dimicilioView={dimicilioView}
      eficienciaCreate={eficienciaCreate}
      handleSubmit={handleSubmit(onSubmitEdit)}
      register={register}
      handleChangeLocalidad={handleChangeLocalidad}
      localidad={localidad}
      localidades={localidades}
      buttonVolver={buttonVolver}
      crearAmbiente={crearAmbiente}
      ambienteView={ambienteView}
      tipoCerramiento={tipoCerramiento}
      tipoTecho={tipoTecho}
      tipoPared={tipoPared}
      tipoVentana={tipoVentana}
      tipoPuerta={tipoPuerta}
      materiales={materiales}
      // handleSubmit2={handleSubmit2(onSubmitCerramiento)}
      // register2={register2}
      handleSearchBar={handleSearchBar}
      artefactos={artefactos}
      agregarArtefacto={agregarArtefacto}
    />
  );
};

export default EditarDomicilioPage;
