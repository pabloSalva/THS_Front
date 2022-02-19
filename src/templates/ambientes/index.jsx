import React, { useState } from "react";
import {
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./styles";
import Layout from "../layout/Layout";
import swal from "sweetalert";
import InfoIcon from "@material-ui/icons/Info";
import { DataGrid } from "@mui/x-data-grid";

const AmbientesTemplate = ({
  verCerramientos,
  verArtefactos,
  paperArtefacto,
  paperCerramiento,
  ambienteDescripcion,
  nuevoCerramiento,
  cerramientos,
  verCerramiento,
  handleSearchBar,
  hayArtefacto,
  nodos,
  agregarEnTabla,
  columns,
  rows,
  volver,
  eliminarAmbiente,
}) => {
  const [checked, setChecked] = useState([]);

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
  const classes = useStyles();

  return (
    <Layout>
      <div>
        <Typography className={classes.title} variant="h1">
          {ambienteDescripcion}
        </Typography>
        <div className={classes.papers}>
          <Paper>
            <Typography className={classes.categoriaTittle}>
              Cerramientos
            </Typography>
            <Button onClick={verCerramientos}>
              <img
                alt="ambientes"
                src={process.env.PUBLIC_URL + "/icons/editarCasas.png"}
                className={classes.logo}
              />
            </Button>
          </Paper>
          <Paper>
            <Typography className={classes.categoriaTittle}>
              Artefactos
            </Typography>
            <Button onClick={verArtefactos}>
              <img
                alt="Luz"
                src={process.env.PUBLIC_URL + "/icons/houses.svg"}
                className={classes.logo_calculo}
              />
            </Button>
          </Paper>
        </div>

        {paperCerramiento && (
          <div>
            <Typography className={classes.categoriaTittle} variant="h2">
              Administrar Cerramientos
            </Typography>
            <Divider />
            <Button
              color="success"
              variant="contained"
              fullWidth={true}
              onClick={nuevoCerramiento}
            >
              Nuevo Cerramiento
            </Button>

            <Button
              color="success"
              variant="contained"
              fullWidth={true}
              onClick={eliminarAmbiente}
            >
              Eliminar Ambiente
            </Button>
            <div className={classes.papersAmbientes}>
              {cerramientos.map((cerramiento) => (
                <Paper className={classes.paperInterno}>
                  <Typography className={classes.categoriaTittle}>
                    {cerramiento.denominacion}
                  </Typography>
                  <Button onClick={() => verCerramiento(cerramiento.id)}>
                    <img
                      alt="Luz"
                      src={process.env.PUBLIC_URL + "/icons/houses.svg"}
                      className={classes.logo_calculo}
                    />
                  </Button>
                </Paper>
              ))}
            </div>
          </div>
        )}

        {paperArtefacto && (
          <Paper className={classes.paperInterno}>
            <Typography className={classes.categoriaTittle}>
              Buscar artefactos para cargar en el ambiente
            </Typography>
            <TextField
              variant="outlined"
              label={""}
              fullWidth
              icon={<SearchIcon />}
              placeholder={"Ingrese artefacto a buscar"}
              onKeyUp={(event) =>
                event.keyCode === 13 && handleSearchBar(event)
              }
            />

            {hayArtefacto ? (
              <List className={classes.artefactosList}>
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
                      <ListItemText id={labelId} primary={`${value.nombre}`} />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() =>
                            swal(
                              "Informacion",
                              `${value.nombre}` +
                                ", \n " +
                                `Consumo: ${value.consumo}` +
                                "W/h" +
                                ", \n Etiqueta: " +
                                `${value.etiqueta}`,
                              "info"
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
              <Typography variant="h4">No se encontraron Artefactos</Typography>
            )}
            <Button onClick={() => agregarEnTabla(checked)}>Agregar</Button>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                // editRowsModel={editRowsModel}
                // editMode="row"
                // onEditRowsModelChange={handleEditRowsModelChange}
              />
            </div>
          </Paper>
        )}
        <Button fullWidth onClick={volver}>
          Volver
        </Button>
      </div>
    </Layout>
  );
};

export default AmbientesTemplate;
