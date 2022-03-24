import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { DomicilioService } from "../services/DomicilioService";
import AmbientesTemplate from "../templates/ambientes";
import { ArtefactoService } from "../services/ArtefactoService";
import swal from "sweetalert";
import { IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const AmbientesPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [materiales, setMateriales] = useState([]);
  const [paperArtefacto, setPaperArtefacto] = useState(false);
  const [paperCerramiento, setPaperCerramiento] = useState(true);
  const [ambienteDescripcion, setAmbienteDescripcion] = useState(
    location?.state?.descripcion
  );
  const [hayArtefacto, setHayArtefacto] = useState(false);
  const [cerramientos, setCerramientos] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [node, setNode] = useState([]);
  const [rows, setRows] = useState([]);

  const Artefactos = () => {
    const params = `?search=${valueSearch}`;
    ArtefactoService.getArtefactos(params)
      .then((response) => {
        response.length > 0 ? setHayArtefacto(true) : setHayArtefacto(false);
        setNode(response);
      })
      .catch((error) => console.log(error));
  };

  const ArtefactosAmbiente = () => {
    DomicilioService.getArtefactoAmbiente({ ambiente: id })
      .then((response) => {
        setRows(response["data"]);
      })
      .catch((error) => console.log(error));
  };

  const handleSearchBar = (event) => {
    Artefactos();
    setValueSearch(event.target.value);
  };
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
    console.log(location);
    location?.state?.exito && swal(location?.state?.exito, "success");
    ArtefactosAmbiente();
  }, []);

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
      state: { ambienteId: id, idDomicilio: location?.state?.idDomicilio },
    });
  };
  const verCerramiento = (idCerramiento) => {
    history.push({
      pathname: `/cerramiento/${idCerramiento}`,
      state: {
        editar: "editar",
        ambienteId: id,
        idDomicilio: location?.state?.idDomicilio,
      },
    });
  };

  const volver = () => {
    history.push({
      pathname: `/domicilios/editar/${location?.state?.idDomicilio}`,
    });
  };
  const agregarEnTabla = (checked) => {
    console.log(checked);
    DomicilioService.updateAmbienteArtefacto({
      ambiente: id,
      artefactos: checked,
    })
      .then((response) => {
        swal("Artefactos agregados con éxito", "success");
        ArtefactosAmbiente();
      })
      .catch((error) => console.log(error));
  };

  const eliminarArtefacto = (idArtefacto) => {
    const data = {
      idArtefacto: idArtefacto,
      idAmbiente: id,
    };
    DomicilioService.eliminarArtefactoAmbiente(data)
      .then((response) => {
        swal("Artefacto eliminado con éxito", "success");
        ArtefactosAmbiente();
      })
      .catch((error) => console.log(error));
  };
  const renderActionButtons = (params) => {
    return (
      <div>
        <IconButton
          onClick={() => {
            eliminarArtefacto(params.row.id);
          }}
        >
          <DeleteOutlined />
        </IconButton>
      </div>
    );
  };
  const columns = [
    { field: "nombre", headerName: "Nombre", flex: 0.2, editable: false },

    {
      field: "consumo",
      headerName: "Consumo Kw/h",
      type: "number",
      flex: 0.1,
      editable: false,
    },
    {
      field: "etiqueta",
      headerName: "Eficiencia",

      flex: 0.1,
      editable: false,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 0.15,
      renderCell: renderActionButtons,
    },
  ];
  const eliminarAmbiente = () => {
    DomicilioService.deleteAmbientes(id)
      .then((response) => {
        history.push({
          pathname: `/domicilios/editar/${location?.state?.idDomicilio}`,
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <AmbientesTemplate
      materiales={materiales}
      verCerramientos={verCerramientos}
      verArtefactos={verArtefactos}
      paperArtefacto={paperArtefacto}
      paperCerramiento={paperCerramiento}
      ambienteDescripcion={ambienteDescripcion}
      nuevoCerramiento={nuevoCerramiento}
      cerramientos={cerramientos}
      verCerramiento={verCerramiento}
      hayArtefacto={hayArtefacto}
      handleSearchBar={handleSearchBar}
      nodos={node}
      agregarEnTabla={agregarEnTabla}
      columns={columns}
      rows={rows}
      volver={volver}
      eliminarAmbiente={eliminarAmbiente}
    />
  );
};

export default AmbientesPage;
