import React, { useEffect, useState } from "react";
import CalculadoraElectricaTemplate from "../templates/calculadoraElectricaTemplate";
import { ArtefactoService } from "../services/ArtefactoService";
import { EntidadesService } from "../services/EntidadesService";

const CalculoElectrico = () => {
  const [open, setOpen] = useState(false);
  const [existe, setExiste] = useState(true);
  const [valueSearch, setValueSearch] = useState("");
  const [tipoArtefacto, setTipoArtefacto] = useState("");
  const [hayCalculo, setHayCalculo] = useState(false);
  const [categoria, setCategoria] = useState(0);
  const [nodos, setNodos] = useState([]);
  const [entidadesEnergia, setEntidadesEnergia] = useState([]);
  const [agregados, setAgregados] = useState([]);
  const [rows, setRows] = useState([]);

  /*
    AIRES = 0
    HELADERAS = 1
    ELECTRONICA = 2
    ILUMINACION = 3
    COCINA = 4
    LAVARROPAS = 5
    CALEFACCION = 6
    BAÑO = 7
  */

  const Artefactos = (categoria) => {
    const params = `?search=${valueSearch}&categoria=${categoria}`;
    ArtefactoService.getArtefactos(params)
      .then((response) => {
        response.length > 0 ? setExiste(true) : setExiste(false);
        setNodos(response);
      })
      .catch((error) => console.log(error));
  };
  const entidades = () => {
    EntidadesService.getEntidades()
      .then((response) => {
        setEntidadesEnergia(response);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    entidades();
  }, []);
  console.log(entidadesEnergia);
  const handleCloseRightPanel = () => {
    setOpen(false);
  };
  const aireButton = () => {
    setOpen(true);
    setTipoArtefacto("Aires");
    setCategoria(0);
  };
  const heladeraButton = () => {
    setOpen(true);
    setTipoArtefacto("Heladeras");
    setCategoria(1);
  };
  const iluminacionButon = () => {
    setOpen(true);
    setTipoArtefacto("Iluminacion");
    setCategoria(3);
  };
  const lavarropaButton = () => {
    setOpen(true);
    setTipoArtefacto("Lavarropas");
    setCategoria(5);
  };
  const cocinaButton = () => {
    setOpen(true);
    setTipoArtefacto("Cocina");
    setCategoria(4);
  };
  const electronicaButton = () => {
    setOpen(true);
    setTipoArtefacto("Electronica");
    setCategoria(2);
  };
  console.log(existe);
  const calcularConsumo = () => {
    setHayCalculo(true);
  };
  const handleSearchBar = (event) => {
    Artefactos(categoria);
    setValueSearch(event.target.value);
  };
  const [agregarEffect, setAgregarEffect] = useState(false);
  const agregarEnTabla = (value) => {
    setAgregados(
      value.map((valor) => nodos.filter((nodo) => nodo.id === valor))
    );
    setAgregarEffect(!agregarEffect);
  };
  console.log(agregados.flat());

  useEffect(() => {
    setRows([
      ...rows,
      ...agregados.flat().map((value) => ({
        id: value.id,
        nombre: value.nombre,
        marca: value.marca,
        consumo: value.consumo,
        horas: 1,
        cantidad: 1,
      })),
    ]);
  }, [agregarEffect]);
  console.log(rows);

  // Funcion para el borrado de la tabla. donde está el 2 iria el id del elemento a eliminar
  // const filtrado = rows.filter((value) => value.id !== 2);
  // console.log(filtrado);
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 180, editable: false },
    { field: "marca", headerName: "Marca", width: 180, editable: false },
    {
      field: "consumo",
      headerName: "Consumo",
      type: "number",
      width: 180,
      editable: false,
    },
    {
      field: "horas",
      headerName: "Horas de uso",
      type: "number",
      width: 180,
      editable: true,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      type: "number",
      width: 220,
      editable: true,
    },
  ];

  return (
    <CalculadoraElectricaTemplate
      openDrawer={open}
      aireButton={aireButton}
      heladeraButton={heladeraButton}
      iluminacionButton={iluminacionButon}
      lavarropaButton={lavarropaButton}
      cocinaButton={cocinaButton}
      electronicaButton={electronicaButton}
      handleCloseRightPanel={handleCloseRightPanel}
      hayArtefacto={existe}
      calcular={calcularConsumo}
      // editRowsModel={editRowsModel}
      // handleEditRowsModelChange={handleEditRowsModelChange}
      rows={rows}
      columns={columns}
      tipoArtefacto={tipoArtefacto}
      hayCalculo={hayCalculo}
      handleSearchBar={handleSearchBar}
      nodos={nodos}
      entidadEnergia={entidadesEnergia}
      agregarEnTabla={agregarEnTabla}
      // handleCellEditCommit={handleCellEditCommit}
    />
  );
};

export default CalculoElectrico;
