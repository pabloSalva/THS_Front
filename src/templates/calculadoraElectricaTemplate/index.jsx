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
import CommentIcon from "@material-ui/icons/Comment";

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
  handleChangeTarifa,
  calcular,
  columns,
  // editRowsModel,
  // handleEditRowsModelChange,
  rows,
  tipoArtefacto,
  hayCalculo,
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
            <Typography
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              Aires
            </Typography>
            <Button onClick={aireButton}>
              <img
                alt="aire-acondicionado"
                src={process.env.PUBLIC_URL + "/icons/aire-acondicionado.svg"}
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
            <Typography
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
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
            <Typography
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
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
                />
                {hayArtefacto && (
                  <List className={classes.rootright}>
                    {[0, 1, 2, 3].map((value) => {
                      const labelId = `checkbox-list-label-${value}`;

                      return (
                        <ListItem
                          key={value}
                          role={undefined}
                          dense
                          button
                          onClick={handleToggle(value)}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={`${tipoArtefacto} ${value + 1}`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                              <CommentIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
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
              {/* <MenuItem value="Entidad">
                <em>Entidad</em>
              </MenuItem> */}
              <MenuItem value={"EDELAP"}>EDELAP</MenuItem>
              <MenuItem value={"EDESUR"}>EDESUR</MenuItem>
              <MenuItem value={"EDEA"}>EDEA</MenuItem>
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
              {/* <MenuItem value="Tarifa">
                <em>Tarifa</em>
              </MenuItem> */}
              <MenuItem value={"EDELAP"}>T1-R1</MenuItem>
              <MenuItem value={"EDESUR"}>T1-R2</MenuItem>
              <MenuItem value={"EDEA"}>T2-R1</MenuItem>
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
  // handleCellEditCommit: PropTypes.func,
};

export default CalculadoraElectricaTemplate;
