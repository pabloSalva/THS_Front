import React, { useEffect, useState } from "react";
import EtiquetadoTemplate from "../templates/etiquetadoTemplate";
import { useForm } from "react-hook-form";
import { LocalidadService } from "../services/LocalidaService";
import { DomicilioService } from "../services/DomicilioService";
import swal from "sweetalert";

const Etiquetado = () => {
  const [domicilioCreate, setDomicilioCreate] = useState(false);
  const [dimicilioView, setDomicilioView] = useState(false);
  const [eficienciaCreate, setEficienciaCreate] = useState(false);
  const [localidad, setLocalidad] = useState("");
  const [localidades, setLocalidades] = useState([]);
  const [domicilios, setDomicilios] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    LocalidadService.getLocalidades()
      .then((response) => {
        setLocalidades(response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    DomicilioService.getDomicilios()
      .then((response) => {
        const rowsDomicilios = response.map((domicilio) => {
          return {
            id: domicilio.id,
            direccion: domicilio.direccion,
            cantidad_personas: domicilio.cantidad_personas,
            antiguedad: domicilio.antiguedad,
            localidad: domicilio.localidad.nombre_localidad,
          };
        });
        setDomicilios(rowsDomicilios);
      })
      .catch((error) => console.log(error));
  }, [actualizar]);

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
        swal("Exito!", "Nuevo domicilio creado", "success");
        reset({
          direccion: "",
          antiguedad: "",
          cantidad_personas: "",
          localidad: "",
        });
      })
      .catch((error) => {
        console.log(error);
        swal("Ha ocurrido un error", "Error al crear domicilio", "error");
      });
    setActualizar(!actualizar);
  };

  const eliminarDomicilio = (id) => {
    DomicilioService.deleteDomicilio(id)
      .then((response) =>
        swal("Exito!", "Domicilio eliminado correctamente", "success")
      )
      .catch((error) =>
        swal("Ha ocurrido un error", "Error al borrar domicilio", "error")
      );
    setActualizar(!actualizar);
  };
  console.log(domicilios);
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
      domicilios={domicilios}
      eliminarDomicilio={eliminarDomicilio}
    />
  );
};

export default Etiquetado;
