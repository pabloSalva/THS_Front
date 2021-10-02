import React, { useEffect, useState } from "react";
import CalculadoraGasTemplate from "../templates/calculadoraGasTemplate"
import { ArtefactoService } from "../services/ArtefactoService";
import { EntidadesService } from "../services/EntidadesService";

const CalculoGas = () => {
  const [open, setOpen] = useState(false);
  const [existe, setExiste] = useState(true);
  const [valueSearch, setValueSearch] = useState("");
  const [tipoArtefacto, setTipoArtefacto] = useState("");
  const [hayCalculo, setHayCalculo] = useState(false);
  const [categoria, setCategoria] = useState(0);
  const [nodos, setNodos] = useState([]);
  const [entidadesGas, setEntidadesGas] = useState([]);
  const [tarifasGas, setTarifasGas] = useState([]);

  // const [editRowsModel, setEditRowsModel] = useState({});
  // const handleEditRowsModelChange = useCallback((model) => {
  //   setEditRowsModel(model);
  //   console.log(model);
  // }, []);
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
        setEntidadesGas(response);
      })
      .catch((error) => console.log(error));
  };
  const tarifas = () => {
    EntidadesService.getAllTarifas()
      .then((response) => {
        setTarifasGas(response);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    entidades();
    tarifas();
  }, []);
  const handleCloseRightPanel = () => {
    setOpen(false);
  };
  const calefaccionButton = () => {
    setOpen(true);
    setTipoArtefacto("Calefaccion");
    setCategoria(6);
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
    console.log(event.target.value);
  };

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

  const rows = [
    {
      id: 1,
      nombre: "Aire Acondicionado",
      marca: "BGH",
      consumo: 3300,
      horas: 1,
      cantidad: 1,
    },
    {
      id: 2,
      nombre: "Lavarropas",
      marca: "Drean",
      consumo: 300,
      horas: 1,
      cantidad: 1,
    },
    {
      id: 3,
      nombre: "Lampara Led",
      marca: "Jeluz",
      consumo: 7,
      horas: 1,
      cantidad: 1,
    },
    {
      id: 4,
      nombre: "Aire Acondicionado",
      marca: "BGH",
      consumo: 2300,
      horas: 1,
      cantidad: 1,
    },
    {
      id: 5,
      nombre: "Televisor 49 pulgadas",
      marca: "Philips",
      consumo: 200,
      horas: 1,
      cantidad: 1,
    },
  ];

  // const [rows, setRows] = useState(row);

  // const handleCellEditCommit = useCallback(
  //   ({ id, field, value }) => {
  //     if (field === "horas" || field === "cantidad") {
  //       console.log(value);
  //       const updatedRows = rows.map((row) => {
  //         if (row.id === id) {
  //           return { ...row };
  //         }
  //         return row;
  //       });
  //       setRows(updatedRows);
  //     }
  //   },
  //   [rows]
  // );

  return (
    <CalculadoraGasTemplate
      openDrawer={open}
      calefaccionButton={calefaccionButton}
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
      entidadGas={entidadesGas}
      tarifasGas={tarifasGas}
      // handleCellEditCommit={handleCellEditCommit}
    />
  );
};

export default CalculoGas;
