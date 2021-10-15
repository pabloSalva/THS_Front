import {
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import Layout from "../layout/Layout";
import { useStyles } from "./styles";

const EtiquetadoTemplate = ({
  crearDomiciclio,
  verDomicilios,
  calcularEficienciaPage,
  openDrawer,
  domicilioCreate,
  dimicilioView,
  eficienciaCreate,
  nuevoDomicilio,
  register,
  handleSubmit,
  localidades,
  domicilios,
  localidad,
  handleChangeLocalidad,
}) => {
  const classes = useStyles();

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre domicilio",
      flex: 0.2,
      editable: false,
    },
    {
      field: "cantidad_personas",
      headerName: "Cantidad de personas",
      flex: 0.1,
      editable: false,
    },
    {
      field: "antiguedad",
      headerName: "Antiguedad",
      type: "number",
      flex: 0.1,
      editable: false,
    },
    { field: "localidad", headerName: "Localidad", flex: 0.1, editable: false },
  ];

  return (
    <Layout titulo="Gestión de domicilios" openDrawer={openDrawer}>
      <div className={classes.papers}>
        <Paper className={classes.paperInterno}>
          <Typography className={classes.categoriaTittle}>
            Crear Domicilio
          </Typography>
          <Button onClick={crearDomiciclio}>
            <img
              alt="crear-casa"
              src={process.env.PUBLIC_URL + "/icons/Casa1.png"}
              className={classes.logo}
            />
          </Button>
        </Paper>

        <Paper>
          <Typography className={classes.categoriaTittle}>
            Ver domiciclios
          </Typography>
          <Button onClick={verDomicilios}>
            <img
              alt="domicilios"
              src={process.env.PUBLIC_URL + "/icons/editarCasas.png"}
              className={classes.logo}
            />
          </Button>
        </Paper>
        <Paper>
          <Typography className={classes.categoriaTittle}>
            Calcular Eficiencia en domicilio
          </Typography>
          <Button onClick={calcularEficienciaPage}>
            <img
              alt="Luz"
              src={process.env.PUBLIC_URL + "/icons/houses.svg"}
              className={classes.logo_calculo}
            />
          </Button>
        </Paper>
      </div>

      {domicilioCreate && (
        <Paper className={classes.paperInterno}>
          <form onSubmit={handleSubmit}>
            <Typography className={classes.categoriaTittle}>
              Crear Domicilio
            </Typography>
            <InputLabel id="nombre">Nombre domicilio</InputLabel>
            <TextField
              fullWidth
              // label="Nombre domicilio"
              variant="outlined"
              margin="dense"
              {...register("nombre", { required: true, maxLength: 30 })}
            />
            <InputLabel id="cantidad_habitantes">
              Cantidad de habitantes
            </InputLabel>
            <TextField
              fullWidth
              type="number"
              // label="Cantidad de habitantes"
              variant="outlined"
              margin="dense"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              {...register("cantidad_personas", {
                required: true,
                maxLength: 3,
              })}
            />
            <InputLabel id="antiguedad">Antigüedad del domicilio</InputLabel>
            <TextField
              fullWidth
              type="number"
              // label="Antigüedad del domicilio"
              variant="outlined"
              margin="dense"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              {...register("antiguedad", {
                required: true,
                maxLength: 3,
              })}
            />
            <InputLabel id="localidad">Localidades</InputLabel>
            <Select
              labelId="Localidades"
              // label="Localidades"
              variant="outlined"
              fullWidth
              margin="dense"
              className={classes.select}
              onChange={handleChangeLocalidad}
              {...register("localidad")}
            >
              {localidades &&
                localidades.map((nodo) => (
                  <MenuItem value={nodo.id}>{nodo.nombre_localidad}</MenuItem>
                ))}
            </Select>
            <Button
              className={classes.select}
              variant="contained"
              color="secondary"
              fullWidth={true}
              type="submit"
            >
              Crear nuevo domicilio
            </Button>
          </form>
        </Paper>
      )}

      {dimicilioView && (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={domicilios} columns={columns} />
        </div>
      )}

      {eficienciaCreate && (
        <Paper className={classes.paperInterno}>
          <Typography className={classes.categoriaTittle}>
            Calcular Eficiencia energética en domicilio
          </Typography>
          <Button onClick={crearDomiciclio}>
            <img
              alt="crear-casa"
              src={process.env.PUBLIC_URL + "/icons/Casa1.png"}
              className={classes.logo}
            />
          </Button>
        </Paper>
      )}
    </Layout>
  );
};

export default EtiquetadoTemplate;
