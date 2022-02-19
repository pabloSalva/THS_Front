import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LocalidadService } from "../services/LocalidaService";
import { DomicilioService } from "../services/DomicilioService";
import EditarDomicilioTemplate from "../templates/editarDomicilio";
import { useHistory, useParams } from "react-router";
import { useAlert } from "react-alert";
import { ArtefactoService } from "../services/ArtefactoService";

import swal from "sweetalert";

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
  const [hayArtefacto, setHayArtefacto] = useState(false);
  const [node, setNode] = useState([]);
  const [ambientes, setAmbientes] = useState([]);

  const alert = useAlert();
  const { id } = useParams();
  const history = useHistory();

  const traerAmbientes = () => {
    DomicilioService.getAmbientes(id)
      .then((response) => setAmbientes(response))
      .catch((error) => console.log(error));
  };

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
        setValue("direccion", response.direccion);
        setValue("antiguedad", response.antiguedad);
        setValue("cantidad_personas", response.cantidad_personas);
        setValue("localidad", response.localidad.id);
      })
      .catch((error) => console.log(error));
    traerAmbientes(id);
  }, []);
  console.log(ambientes);
  const editarDomiciclio = () => {
    setDomicilioEdit(true);
    setDomicilioView(false);
    setEficienciaCreate(false);
    setArtefactos(false);
    setAmbienteView(false);
  };
  const agregarArtefacto = () => {
    setDomicilioEdit(false);
    setAmbienteView(false);
    setArtefactos(true);
  };
  const verAmbientes = () => {
    setDomicilioEdit(false);
    setAmbienteView(true);
    setArtefactos(false);
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

  const {
    register: register2,
    getValues: getValues2,
    handleSubmit: handleSubmit2,
  } = useForm({
    defaultValues: {
      descripcion: "",
    },
  });

  const onSubmit2 = (data) => {
    const nuevaData = { ...data, inmueble: domicilio.id, volumen: 0 };
    DomicilioService.createAmbientes(nuevaData)
      .then((response) => {
        swal("Exito!", "Nuevo domicilio creado", "success");
      })
      .catch((error) => console.log(error));
    traerAmbientes();
  };

  const watchAllFields = watch();
  console.log(watchAllFields);
  const onSubmitEdit = (data) => {
    DomicilioService.editDomicilio(id, data)
      .then((response) => {
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
  const editarAmbiente = (idAmbiente, descripcion) => {
    history.push({
      pathname: `/ambientes/${idAmbiente}`,
      state: { descripcion: descripcion, idDomicilio: id },
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
        response.length > 0 ? setHayArtefacto(true) : setHayArtefacto(false);
        setNode(response);
      })
      .catch((error) => console.log(error));
  };
  console.log(node);
  console.log(hayArtefacto);
  const handleSearchBar = (event) => {
    Artefactos();
    setValueSearch(event.target.value);
  };
  const agregarEnTabla = (checked) => {
    alert.success("Artefactos agregados con éxito");
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
      verAmbientes={verAmbientes}
      ambienteView={ambienteView}
      tipoCerramiento={tipoCerramiento}
      tipoTecho={tipoTecho}
      tipoPared={tipoPared}
      tipoVentana={tipoVentana}
      tipoPuerta={tipoPuerta}
      materiales={materiales}
      handleSubmit2={handleSubmit2(onSubmit2)}
      register2={register2}
      handleSearchBar={handleSearchBar}
      artefactos={artefactos}
      agregarArtefacto={agregarArtefacto}
      nodos={node}
      hayArtefacto={hayArtefacto}
      agregarEnTabla={agregarEnTabla}
      ambientes={ambientes}
      editarAmbiente={editarAmbiente}
    />
  );
};

export default EditarDomicilioPage;
