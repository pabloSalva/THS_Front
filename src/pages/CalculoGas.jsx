import React, { useCallback, useEffect, useState } from "react";
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
  const [agregados, setAgregados] = useState([]);
  const [rows, setRows] = useState([]);
  const [entidad, setEntidad] = useState();
  const [entidadGasTarifa, setEntidadGasTarifa] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [precio, setPrecio] = useState(0);
  const [consumoTotalMensual, setConsumoTotalMensual] = useState(0);
  const [tarifa, setTarifa] = useState();

  /*
    ## CATEGORIAS:
    AIRES = 0
    HELADERAS = 1
    ELECTRONICA = 2
    ILUMINACION = 3
    COCINA = 4
    LAVARROPAS = 5
    CALEFACCION = 6
    BAÑO = 7
    AGUA = 8
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
        const aux = response.filter(
          (value) => value.tipo_entidad === 'GS');
        setEntidadesGas(aux);
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
  const aguaButton = () => {
    setOpen(true);
    setTipoArtefacto("Agua");
    setCategoria(8);
  };
  const calcularConsumo = () => {
    const tarifaEntidad = entidadesGas.filter(
      (value) => value.id === entidad
    );
    console.log('TarifaEntidad: ', tarifaEntidad);
    if (tarifaEntidad.length > 0) {
      setHayCalculo(true);
      let consumoTotal = 0;
      rows.forEach((nodo) => {
      consumoTotal += nodo.consumo * nodo.horas * nodo.cantidad;
      });
      const consumoMensual = (consumoTotal * 30) / 1000;
      const tarifaEspecifica = tarifaEntidad[0]["tarifa"].filter(
        (value) =>
          consumoMensual >= value.consumo_minimo &&
          consumoMensual < value.consumo_maximo &&
          value.id === tarifa
      );
      console.log('TarifaEspecifica: ', tarifaEspecifica)
      console.log('#Tarifa: ', tarifa)
      const precioConsumo =
        tarifaEspecifica[0].cargo_fijo +
        tarifaEspecifica[0].precio_unitario * consumoMensual;
      console.log('Cargo fijo: ', tarifaEspecifica[0].cargo_fijo)
      console.log('Precio_unitario: ', tarifaEspecifica[0].precio_unitario)
      setConsumoTotalMensual(consumoMensual);
      setPrecio(precioConsumo);
    } else {
      alert("Debe seleccionar Entidad y tarifa");
    }
  };
  const handleSearchBar = (event) => {
    Artefactos(categoria);
    setValueSearch(event.target.value);
    console.log(event.target.value);
  };

  const [agregarEffect, setAgregarEffect] = useState(false);
  const agregarEnTabla = (value) => {
    setAgregados(
      value.map((valor) => nodos.filter((nodo) => nodo.id === valor))
    );
    setAgregarEffect(!agregarEffect);
  };

  const checkEtiqueta = (value) => {
    switch (value) {
      case "0":
        return 'A+++'
      case "1":
        return 'A++'
      case "2":
        return 'A+'
      case "3":
        return 'A'
      case "4":
        return 'B'
      case "5":
        return 'C'
      case "6":
        return 'D'
      case "7":
        return 'E'
      case "8":
        return 'F'
      case "9":
        return 'G'
      default:
        return 'B'
  }};
  
  useEffect(() => {
    setRows([
      ...rows,
      ...agregados.flat().map((value) => ({
        id: value.id,
        nombre: value.nombre,
        marca: value.marca,
        consumo: value.consumo,
        eficiencia: checkEtiqueta(value.etiqueta),
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

  /**
   * Cada vez que modifico el valor de "dias" o "cantidad" en la tabla de artefactos
   * se invoca a este effect que setea al array rows con los valores nuevos para luego
   * utilizarlo en el calculo de consumo
   */
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
      // seteo el nuevo rows con los ultimos datos agregados
      setRows([...rowAux]);
    }
  }, [editRowsModel]);


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

  const handleChangeTarifa = (e) => {
    setTarifa(e.target.value);
  };
  const handleChangeEntidad = (e) => {
    setEntidad(e.target.value);
  };

  /**
   * Cada vez que se cambia el valor de la entidad se ejecuta este effect
   * para cambiar el valor de las tarifas que se muestran.
   */
  useEffect(
    (e) => {
      const auxTarifas = tarifasGas.filter(
        (value) => value.categoria === 'Gas' && value.entidad === entidad
      );
      setEntidadGasTarifa(auxTarifas);
    },
    [entidad]
  );

  return (
    <CalculadoraGasTemplate
      openDrawer={open}
      calefaccionButton={calefaccionButton}
      cocinaButton={cocinaButton}
      aguaButton={aguaButton}
      handleCloseRightPanel={handleCloseRightPanel}
      hayArtefacto={existe}
      calcular={calcularConsumo}
      editRowsModel={editRowsModel}
      handleEditRowsModelChange={handleEditRowsModelChange}
      precio={precio}
      consumoTotalMensual={consumoTotalMensual}
      rows={rows}
      columns={columns}
      tipoArtefacto={tipoArtefacto}
      hayCalculo={hayCalculo}
      handleSearchBar={handleSearchBar}
      nodos={nodos}
      entidadGas={entidadesGas}
      entidad={entidad}
      tarifa={tarifa}
      entidadGasTarifa={entidadGasTarifa}
      handleChangeTarifa={handleChangeTarifa}
      handleChangeEntidad={handleChangeEntidad}
      agregarEnTabla={agregarEnTabla}
      tarifasGas={tarifasGas}
      // handleCellEditCommit={handleCellEditCommit}
    />
  );
};

export default CalculoGas;
