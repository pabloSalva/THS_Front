import React, { useCallback, useEffect, useState } from "react";
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
  const [entidad, setEntidad] = useState();
  const [entidadEnergiaTarifa, setEntidadEnergiaTarifa] = useState([]);

  const [editRowsModel, setEditRowsModel] = useState({});
  const [precio, setPrecio] = useState(0);
  const [consumoTotalMensual, setConsumoTotalMensual] = useState(0);

  /*
    AIRES = 0
    HELADERAS = 1
    ELECTRONICA = 2
    ILUMINACION = 3
    COCINA = 4categoria
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
    // handleEditRowsModelChange;
    setOpen(true);
    setTipoArtefacto("Cocina");
    setCategoria(4);
  };
  const electronicaButton = () => {
    setOpen(true);
    setTipoArtefacto("Electronica");
    setCategoria(2);
  };

  const calcularConsumo = () => {
    const tarifaEntidad = entidadesEnergia.filter(
      (value) => value.id === entidad
    );
    if (tarifaEntidad.length > 0) {
      setHayCalculo(true);
      let consumoTotal = 0;
      rows.forEach((nodo) => {
        if (nodo.nombre.includes("Aire")) {
          let consumoAire;
          switch (nodo.eficiencia) {
            case "A+++":
              consumoAire = nodo.consumo * (1 / 8);
              break;
            case "A++":
              consumoAire = nodo.consumo * (1 / 7);
              break;
            case "A+":
              consumoAire = nodo.consumo * (1 / 6);
              break;
            case "A":
              consumoAire = nodo.consumo * (1 / 5);
              break;
            case "B":
              consumoAire = nodo.consumo * (1 / 4.5);
              break;
            case "C":
              consumoAire = nodo.consumo * (1 / 4);
              break;
            case "D":
              consumoAire = nodo.consumo * (1 / 3.7);
              break;
            case "E":
              consumoAire = nodo.consumo * (1 / 3.5);
              break;

            default:
              consumoAire = nodo.consumo * (1 / 3);
              break;
          }
          consumoTotal += consumoAire * nodo.horas * nodo.cantidad;
        } else {
          consumoTotal += nodo.consumo * nodo.horas * nodo.cantidad;
        }
      });
      const consumoMensual = (consumoTotal * 30) / 1000;
      const tarifaEspecifica = tarifaEntidad[0]["tarifa"].filter(
        (value) =>
          consumoMensual >= value.consumo_minimo &&
          consumoMensual < value.consumo_maximo
      );
      const precioConsumo =
        tarifaEspecifica[0].cargo_fijo +
        tarifaEspecifica[0].precio_unitario * consumoMensual;
      setConsumoTotalMensual(consumoMensual);
      setPrecio(precioConsumo);
    } else {
      alert("Debe seleccionar Entidad y tarifa");
    }
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

  useEffect(() => {
    setRows([
      ...rows,
      ...agregados.flat().map((value) => ({
        id: value.id,
        nombre: value.nombre,
        marca: value.marca,
        consumo: value.consumo,
        eficiencia: value.etiqueta,
        horas: 1,
        cantidad: 1,
      })),
    ]);
  }, [agregarEffect]);
  console.log(rows);
  console.log(nodos);

  const handleEditRowsModelChange = useCallback((model) => {
    setEditRowsModel(model);
  }, []);

  useEffect(() => {
    if (Object.keys(editRowsModel).length > 0 && rows.length > 0) {
      // Recupero el valor de la clave del editRowsModel que equivale al valor del id del elemento en la fila
      const clave = Object.keys(editRowsModel)[0];
      const rowAux = rows;
      const indice = rowAux.findIndex((fila) => fila.id === Number(clave));

      /**
       * si cambio la hora actualizo la fila en la hora
       * si no, si actualizo la cantidad, modifico la fila en la cantidad
       */
      if (
        editRowsModel[clave]["horas"] &&
        editRowsModel[clave]["horas"]["value"]
      ) {
        const horas = editRowsModel[clave]["horas"]["value"];
        rowAux[indice].horas = horas;
      } else if (
        editRowsModel[clave]["cantidad"] &&
        editRowsModel[clave]["cantidad"]["value"]
      ) {
        const cantidad = editRowsModel[clave]["cantidad"]["value"];
        rowAux[indice].cantidad = cantidad;
      } else if (
        editRowsModel[clave]["eficiencia"] &&
        editRowsModel[clave]["eficiencia"]["value"]
      ) {
        const eficiencia = editRowsModel[clave]["eficiencia"]["value"];
        rowAux[indice].eficiencia = eficiencia;
      }
      setRows([...rowAux]);
    }
  }, [editRowsModel]);

  const handleChangeTarifa = (e) => console.log(e);
  const handleChangeEntidad = (e) => {
    setEntidad(e.target.value);
  };

  /**
   * Cada vez que se cambia el valor de la entidad se ejecuta este effect
   * para cambiar el valor de las tarifas que se muestran.
   */
  useEffect(
    (e) => {
      const filtradoTarifa = entidadesEnergia.filter(
        (value) => value.id === entidad
      );

      if (filtradoTarifa.length > 0) {
        const tarifasMap = filtradoTarifa[0]["tarifa"].map((item) => {
          return [item.categoria, item];
        });

        var tarifasMapArr = new Map(tarifasMap); // Pares de clave y valor

        let unicos = [...tarifasMapArr.values()]; // Conversión a un array

        setEntidadEnergiaTarifa(unicos);
      }

      handleChangeTarifa(e);
    },
    [entidad]
  );

  // Funcion para el borrado de la tabla. donde está el 2 iria el id del elemento a eliminar
  // const filtrado = rows.filter((value) => value.id !== 2);
  // console.log(filtrado);
  const columns = [
    { field: "nombre", headerName: "Nombre", flex: 0.2, editable: false },
    { field: "marca", headerName: "Marca", flex: 0.1, editable: false },
    {
      field: "consumo",
      headerName: "Consumo",
      type: "number",
      flex: 0.1,
      editable: false,
    },
    {
      field: "eficiencia",
      headerName: "Eficiencia",

      flex: 0.1,
      editable: false,
    },
    {
      field: "horas",
      headerName: "Horas de uso diario",
      type: "number",
      flex: 0.16,
      editable: true,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      type: "number",
      flex: 0.1,
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
      handleChangeEntidad={handleChangeEntidad}
      entidad={entidad}
      handleChangeTarifa={handleChangeTarifa}
      entidadEnergiaTarifa={entidadEnergiaTarifa}
      // handleCellEditCommit={handleCellEditCommit}
      handleEditRowsModelChange={handleEditRowsModelChange}
      editRowsModel={editRowsModel}
      precio={precio}
      consumoTotalMensual={consumoTotalMensual}
    />
  );
};

export default CalculoElectrico;
