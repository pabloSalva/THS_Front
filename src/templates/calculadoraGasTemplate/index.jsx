import React, { useCallback, useState } from "react";
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

import { DataGrid } from "@mui/x-data-grid";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const CalculadoraGasTemplate = ({
  openDrawer,
  handleCloseRightPanel,
  calefaccionButton,
  cocinaButton,
  electronicaButton,
  hayArtefacto,
  handleChangeEntidad,
  entidad,
  tarifa,
  handleChangeTarifa,
  calcular,
  columns,
  // editRowsModel,
  // handleEditRowsModelChange,
  rows,
  hayCalculo,
  handleSearchBar,
  nodos,
  entidadGas,
  tarifasGas,
  // handleCellEditCommit,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);

  const [editRowsModel, setEditRowsModel] = useState({});
  const handleEditRowsModelChange = useCallback((model) => {
    setEditRowsModel(model);
    console.log(model);
  }, []);

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

  return (
    <Layout titulo="Calculadora de consumo de Gas" openDrawer={openDrawer}>
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
            <Typography
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              Calefaccion
            </Typography>
            <Button onClick={calefaccionButton}>
              <img
                alt="calefaccion"
                src={process.env.PUBLIC_URL + "/icons/calefaccion.png"}
                className={classes.logo2}
              />
            </Button>
          </Paper>

          <Paper>
            <Typography
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              Cocina
            </Typography>
            <Button onClick={cocinaButton}>
              <img
                alt="microondas"
                src={process.env.PUBLIC_URL + "/icons/microonda.svg"}
                className={classes.logo}
              />
            </Button>
          </Paper>
          <Paper>
            <Typography
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              Electro-Hogar
            </Typography>
            <Button onClick={electronicaButton}>
              <img
                alt="electronica"
                src={process.env.PUBLIC_URL + "/icons/monitor.svg"}
                className={classes.logo}
              />
            </Button>
          </Paper>
        </div>

        {openDrawer && (
          <div>
            <RightPanel
              className={classes.rightPanel}
              tituloGeneral="seleccione Artefactos"
              button={{
                label: "Guardar",
              }}
              openDrawer={true}
              handleClose={handleCloseRightPanel}
            >
              <div>
                <TextField
                  label={""}
                  icon={<SearchIcon />}
                  placeholder={"Ingrese Artefacto a buscar"}
                  onKeyUp={(event) =>
                    event.keyCode === 13 && handleSearchBar(event)
                  }
                />
                {hayArtefacto ? (
                  <List className={classes.rootright}>
                    {console.log(nodos)}
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
                                alert(
                                  `${value.nombre}` +
                                    " " +
                                    `${value.consumo}` +
                                    " Calorias" +
                                    " Etiqueta: " +
                                    `${value.etiqueta}`
                                )
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
                <Button>Agregar</Button>
              </div>
            </RightPanel>
          </div>
        )}
        <div>
          <Typography variant="h2">Seleccione Entidad y tarifa</Typography>
          <div className={classes.entidad}>
            <InputLabel id="demo-simple-select-outlined-label">
              Entidad
            </InputLabel>
            <Select
              label="Entidades"
              id="entidades"
              value={entidad}
              onChange={handleChangeEntidad}
            >
              {entidadGas &&
                entidadGas.map((nodo) => (
                  <MenuItem value={nodo.id}>{nodo.nombre_entidad}</MenuItem>
                ))}
            </Select>

            <InputLabel id="demo-simple-select-outlined-label">
              Tarifa
            </InputLabel>
            <Select
              labelId="Entidades"
              id="entidades"
              value={tarifa}
              onChange={handleChangeTarifa}
            >
              {tarifasGas &&
                tarifasGas.map((nodo) => (
                  <MenuItem value={nodo.id}>{nodo.descripcion}</MenuItem>
                ))}
            </Select>
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            editRowsModel={editRowsModel}
            onEditRowsModelChange={handleEditRowsModelChange}
          />
        </div>

        <Button
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={calcular}
        >
          Calcular
        </Button>
        {hayCalculo && (
          <Typography variant="h1">
            Su consumo es de 160Kw por mes. El precio para la tarifa
            seleccionada es de $5000 pesos
          </Typography>
        )}
      </div>
    </Layout>
  );
};

CalculadoraGasTemplate.propTypes = {
  openDrawer: PropTypes.bool,
  handleCloseRightPanel: PropTypes.func,
  calefaccionButton: PropTypes.func,
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
  entidadGas: PropTypes.array,
  tarifasGas: PropTypes.array,
  // handleCellEditCommit: PropTypes.func,
};

export default CalculadoraGasTemplate;
