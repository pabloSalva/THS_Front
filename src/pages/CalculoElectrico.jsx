import React, { useState } from "react";
import CalculadoraElectricaTemplate from "../templates/calculadoraElectricaTemplate";
import { ArtefactoService } from "../services/ArtefactoService";

const CalculoElectrico = () => {
  const [open, setOpen] = useState(false);
  const [existe, setExiste] = useState(true);
  const [valueSearch, setValueSearch] = useState("");
  const [tipoArtefacto, setTipoArtefacto] = useState("");
  const [hayCalculo, setHayCalculo] = useState(false);

  // const [editRowsModel, setEditRowsModel] = useState({});
  // const handleEditRowsModelChange = useCallback((model) => {
  //   setEditRowsModel(model);
  //   console.log(model);
  // }, []);

  const Artefactos = (categoria) => {
    const params = `?search=${valueSearch}&categoria=${categoria}`;
    ArtefactoService.getArtefactos(params)
      .then((response) => {
        response.length > 0 ? setExiste(true) : setExiste(false);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const handleCloseRightPanel = () => {
    setOpen(false);
  };
  const aireButton = () => {
    const categoria = 0;
    setValueSearch("hy");
    Artefactos(categoria);
    setOpen(true);
    setTipoArtefacto("Aires");
  };
  const heladeraButton = () => {
    setOpen(true);
    setTipoArtefacto("Heladeras");
  };
  const iluminacionButon = () => {
    setOpen(true);
    setTipoArtefacto("Iluminacion");
  };
  const lavarropaButton = () => {
    setOpen(true);
    setTipoArtefacto("Lavarropas");
  };
  const cocinaButton = () => {
    setOpen(true);
    setTipoArtefacto("Cocina");
  };
  const electronicaButton = () => {
    setOpen(true);
    setTipoArtefacto("Electronica");
  };
  console.log(existe);
  const calcularConsumo = () => {
    setHayCalculo(true);
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
      // handleCellEditCommit={handleCellEditCommit}
    />
  );
};

export default CalculoElectrico;
