import React, { useState } from "react";
import RightPanel from "../../components/rightPanel";
import PropTypes from "prop-types";
import Layout from "../layout/Layout";
import TextField from "../../components/textField";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./styles";
import clsx from "clsx";
// import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import swal from "sweetalert";
import { DataGrid } from "@mui/x-data-grid";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const CalculadoraElectricaTemplate = ({
  openDrawer,
  handleCloseRightPanel,
  aireButton,
  heladeraButton,
  iluminacionButton,
  lavarropaButton,
  cocinaButton,
  electronicaButton,
  hayArtefacto,
  handleChangeEntidad,
  entidad,
  tarifa,
  tipoArtefacto,
  categoriaTarifa,
  handleChangeTarifa,
  calcular,
  columns,
  // editRowsModel,
  // handleEditRowsModelChange,
  rows,
  hayCalculo,
  handleSearchBar,
  nodos,
  entidadEnergia,
  agregarEnTabla,
  entidadEnergiaTarifa,
  handleEditRowsModelChange,
  editRowsModel,
  precio,
  consumoTotalMensual,
  // handleCellEditCommit,
  limpiar,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  // const [editRowsModel, setEditRowsModel] = useState({});
  // const handleEditRowsModelChange = useCallback((model) => {
  //   setEditRowsModel(model);
  //   console.log(model);
  // }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  console.log(checked);


  return (
    <Layout titulo="Calculadora de consumo electrico" openDrawer={openDrawer}>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}
      >
        <Typography variant="h2" className={classes.subtitle}>
          Seleccione el tipo de artefacto que quiere cargar para la simulación
        </Typography>
        <div className={classes.papers}>
          <Paper className={classes.paperInterno}>
            <Typography className={classes.categoriaTittle}>Aires</Typography>
            <Button onClick={aireButton}>
              <img
                alt="aire-acondicionado"
                src={process.env.PUBLIC_URL + "/icons/aire-acondicionado.svg"}
                className={classes.logo}
              />
            </Button>
          </Paper>

          <Paper>
            <Typography className={classes.categoriaTittle}>
              Lavarropas
            </Typography>
            <Button onClick={lavarropaButton}>
              <img
                alt="lavarropas"
                src={process.env.PUBLIC_URL + "/icons/lavaropa.svg"}
                className={classes.logo}
              />
            </Button>
          </Paper>
          <Paper>
            <Typography className={classes.categoriaTittle}>
              Iluminación
            </Typography>
            <Button onClick={iluminacionButton}>
              <img
                alt="Luz"
                src={process.env.PUBLIC_URL + "/icons/luz.svg"}
                className={classes.logo}
              />
            </Button>
          </Paper>
        </div>
        <div className={classes.papers}>
          <Paper>
            <Typography className={classes.categoriaTittle}>Cocina</Typography>
            <Button onClick={cocinaButton}>
              <img
                alt="microondas"
                src={process.env.PUBLIC_URL + "/icons/microonda.svg"}
                className={classes.logo}
              />
            </Button>
          </Paper>
          <Paper>
            <Typography className={classes.categoriaTittle}>
              Electronica
            </Typography>
            <Button onClick={electronicaButton}>
              <img
                alt="electronica"
                src={process.env.PUBLIC_URL + "/icons/monitor.svg"}
                className={classes.logo}
              />
            </Button>
          </Paper>
          <Paper>
            <Typography className={classes.categoriaTittle}>
              Heladeras
            </Typography>
            <Button onClick={heladeraButton}>
              <img
                alt="heladeras"
                src={process.env.PUBLIC_URL + "/icons/refrigerador.svg"}
                className={classes.logo}
              />
            </Button>
          </Paper>
        </div>
        <div>
          <Typography variant="h2">Seleccione Entidad y tarifa</Typography>
          <div className={classes.entidad}>
            <InputLabel>
              Entidad
            </InputLabel>
            <Select
              label="Entidades"
              id="entidades"
              value={entidad}
              onChange={handleChangeEntidad}
            >
              {entidadEnergia &&
                entidadEnergia.map((nodo) => (
                  <MenuItem value={nodo.id}>{nodo.nombre_entidad}</MenuItem>
                ))}
            </Select>
            <br />
            <InputLabel>
              Tarifa
            </InputLabel>
            <Select
              labelId="Entidades"
              id="entidades"
              value={tarifa}
              onChange={handleChangeTarifa}
            >
              {entidadEnergiaTarifa &&
                entidadEnergiaTarifa.map((nodo) => (
                  <MenuItem value={nodo.id}>{nodo.categoria}</MenuItem>
                ))}
            </Select>
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            editRowsModel={editRowsModel}
            // editMode="row"
            onEditRowsModelChange={handleEditRowsModelChange}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={limpiar}
        >
          Limpiar tabla
        </Button>

        <Button
          className={classes.calcular}
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={calcular}
        >
          Calcular
        </Button>
        {hayCalculo && (
          <Paper className={classes.paperConsumo}>
            <Typography className={classes.consumo}>
              {`Su consumo es de: ${consumoTotalMensual}Kw por mes.`}
              <br />
              {`El precio para la tarifa seleccionada es de: $${precio} pesos`}
            </Typography>
            {categoriaTarifa &&
              categoriaTarifa.map((nodo) => (
                <Typography className={classes.consumo}>
                  Categoria segun consumo: {nodo.descripcion}
                </Typography>
              ))}
          </Paper>
        )}
      </div>
      <div>
      {openDrawer && (
          <div>
            <RightPanel className={classes.rightPanel} tituloGeneral={tipoArtefacto} openDrawer={true} handleClose={handleCloseRightPanel}>
              <div>
                <TextField label={""} icon={<SearchIcon />} placeholder={"Ingrese artefacto a buscar"}
                  onKeyUp={(event) =>
                    event.keyCode === 13 && handleSearchBar(event)
                  }
                />
                {hayArtefacto ? (
                  <List className={classes.rootright}>
                    {nodos.map((value) => {
                      const labelId = `checkbox-list-label-${value.id}`;
                      return (
                        <ListItem
                          key={value.id}
                          role={undefined}
                          dense
                          button
                          onClick={handleToggle(value.id)}
                        >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={`${value.nombre}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() =>
                              swal("Informacion", `${value.nombre}` +
                                  ", \n " +
                                  `Consumo: ${value.consumo}` +
                                  "W/h" +
                                  ", \n Etiqueta: " +
                                  `${value.etiqueta}`,
                                  "info")
                            }
                            edge="end"
                            aria-label="comments"
                          >
                          <InfoIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                  <Typography variant="h4">
                    No se encontraron Artefactos
                  </Typography>
                )}
                <Button onClick={() => agregarEnTabla(checked)}>Agregar</Button>
              </div>
            </RightPanel>
          </div>
        )}
      </div>
    </Layout>
  );
};

CalculadoraElectricaTemplate.propTypes = {
  openDrawer: PropTypes.bool,
  handleCloseRightPanel: PropTypes.func,
  aireButton: PropTypes.func,
  heladeraButton: PropTypes.func,
  iluminacionButton: PropTypes.func,
  lavarropaButton: PropTypes.func,
  cocinaButton: PropTypes.func,
  electronicaButton: PropTypes.func,
  hayArtefacto: PropTypes.bool,
  tipoArtefacto: PropTypes.string,
  calcular: PropTypes.func,
  editRowsModel: PropTypes.object,
  handleChangeEntidad: PropTypes.func,
  rows: PropTypes.array,
  columns: PropTypes.array,
  hayCalculo: PropTypes.bool,
  handleSearchBar: PropTypes.func,
  nodos: PropTypes.array,
  info: PropTypes.func,
  entidadEnergia: PropTypes.array,
  agregarEnTabla: PropTypes.func,
  entidad: PropTypes.number,
  handleChangeTarifa: PropTypes.func,
  tarifa: PropTypes.number,
  entidadEnergiaTarifa: PropTypes.array,
  handleEditRowsModelChange: PropTypes.func,
  // editRowsModel: PropTypes.array,
  // handleCellEditCommit: PropTypes.func,
};

export default CalculadoraElectricaTemplate;
