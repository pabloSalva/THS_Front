import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { useStyles } from "./styles";
import FlashAutoIcon from "@material-ui/icons/FlashAuto";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
  eliminarDomicilio,
  calcularEtiqueta,
  verEtiqueta,
}) => {
  const classes = useStyles();

  const renderActionButtons = (params) => {
    return (
      <div className={classes.action}>
        <IconButton
          component={Link}
          to={{
            pathname: `/domicilios/editar/${params.row.id}`,
          }}
        >
          <CreateOutlinedIcon className={classes.edit} />
        </IconButton>
        <IconButton
          onClick={() => {
            eliminarDomicilio(params.row.id);
          }}
        >
          <DeleteOutlined />
        </IconButton>
      </div>
    );
  };
  const renderActionButtonsEtiqueta = (params) => {
    return (
      <div className={classes.action}>
        <IconButton
          onClick={() => {
            calcularEtiqueta(params.row.id);
          }}
        >
          <FlashAutoIcon />
        </IconButton>
      </div>
    );
  };
  const renderActionButtonsEtiquetaVer = (params) => {
    return (
      <div className={classes.action}>
        <IconButton
          onClick={() => {
            verEtiqueta(params.row.id);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      </div>
    );
  };

  const columns = [
    {
      field: "direccion",
      headerName: "Dirección domicilio",
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
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 0.15,
      renderCell: renderActionButtons,
    },
  ];

  const columnsEtiqueta = [
    {
      field: "direccion",
      headerName: "Dirección domicilio",
      flex: 0.2,
      editable: false,
    },

    { field: "localidad", headerName: "Localidad", flex: 0.1, editable: false },
    {
      field: "acciones",
      headerName: "Crear Etiqueta",
      flex: 0.15,
      renderCell: renderActionButtonsEtiqueta,
    },
    {
      field: "acciones2",
      headerName: "Ver Etiqueta",
      flex: 0.15,
      renderCell: renderActionButtonsEtiquetaVer,
    },
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
            <InputLabel id="direccion">Dirección domicilio</InputLabel>
            <TextField
              fullWidth
              // label="direccion domicilio"
              variant="outlined"
              margin="dense"
              {...register("direccion", { required: true, maxLength: 30 })}
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
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={domicilios} columns={columnsEtiqueta} />
          </div>
        </Paper>
      )}
    </Layout>
  );
};

export default EtiquetadoTemplate;
