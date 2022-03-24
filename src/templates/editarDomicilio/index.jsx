import {
  Button,
  Checkbox,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useStyles } from "./styles";
// import AmbienteForm from "./AmbienteForm/AmbienteForm";

import SearchIcon from "@material-ui/icons/Search";
import swal from "sweetalert";
import InfoIcon from "@material-ui/icons/Info";

const EditarDomicilioTemplate = ({
  editarDomiciclio,
  verAmbientes,
  editarAmbiente,
  agregarArtefacto,
  domicilioEdit,
  ambienteView,
  eficienciaCreate,
  nuevoDomicilio,
  register,
  handleSubmit,
  localidades,
  localidad,
  handleChangeLocalidad,
  buttonVolver,
  tipoCerramiento,
  tipoTecho,
  tipoPared,
  tipoPuerta,
  tipoVentana,
  materiales,
  handleSubmit2,
  register2,
  handleSearchBar,
  artefactos,
  nodos,
  hayArtefacto,
  agregarEnTabla,
  ambientes,
  buttonAmbientes,
}) => {
  const classes = useStyles();

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
  console.log(checked);
  return (
    <Layout titulo="Modificación de domicilios">
      <div className={classes.papers}>
        <Paper className={classes.paperInterno}>
          <Typography className={classes.categoriaTittle}>
            Editar Domicilio
          </Typography>
          <Button onClick={editarDomiciclio}>
            <img
              alt="crear-casa"
              src={process.env.PUBLIC_URL + "/icons/Casa1.png"}
              className={classes.logo}
            />
          </Button>
        </Paper>

        <Paper>
          <Typography className={classes.categoriaTittle}>
            Ver Ambientes
          </Typography>
          <Button onClick={verAmbientes}>
            <img
              alt="ambientes"
              src={process.env.PUBLIC_URL + "/icons/editarCasas.png"}
              className={classes.logo}
            />
          </Button>
        </Paper>
      </div>

      {domicilioEdit && (
        <Paper className={classes.paperInterno}>
          <form onSubmit={handleSubmit}>
            <Typography className={classes.categoriaTittle}>
              Editar Domicilio
            </Typography>
            <div className={classes.form}>
              <InputLabel id="direccion">Dirección domicilio</InputLabel>
              <TextField
                fullWidth
                // label="direccion domicilio"
                name="Editar domicilio"
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
                name="Cantidad de habitantes"
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
                name="Antigüedad del domicilio"
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
                label="Localidades"
                name="Localidades"
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
                color="success"
                fullWidth={true}
                type="submit"
              >
                Editar Domicilio
              </Button>
            </div>
          </form>
        </Paper>
      )}

      {ambienteView && (
        <div>
          <Paper className={classes.paperInterno}>
            <form key={2} onSubmit={handleSubmit2}>
              <Typography className={classes.categoriaTittle}>
                Ingrese el nombre del ambiente a crear (Cocina, Living, etc...)
              </Typography>
              <div className={classes.form}>
                <InputLabel id="descripcion">Descripción</InputLabel>
                <TextField
                  fullWidth
                  // label="descripcion domicilio"
                  name="descripcion"
                  variant="outlined"
                  margin="dense"
                  {...register2("descripcion", {
                    required: true,
                    maxLength: 30,
                  })}
                />
                <Button
                  className={classes.select}
                  variant="contained"
                  color="success"
                  fullWidth={true}
                  type="submit"
                >
                  Crear Ambiente
                </Button>
              </div>
            </form>
          </Paper>
          <div className={classes.papersAmbientes}>
            {ambientes.map((ambiente) => (
              <Paper>
                <Typography className={classes.categoriaTittle}>
                  {ambiente.descripcion}
                </Typography>
                <Button
                  onClick={() =>
                    editarAmbiente(ambiente.id, ambiente.descripcion)
                  }
                >
                  <img
                    alt="ambiente"
                    src={
                      process.env.PUBLIC_URL +
                      "/icons/cerramientos/ambientes.jpg"
                    }
                    className={classes.logo}
                  />
                </Button>
              </Paper>
            ))}
          </div>
        </div>
      )}

      <div className={classes.volver}>
        <Button
          color="info"
          label="Volver"
          variant="outlined"
          fullWidth={true}
          onClick={buttonVolver}
        >
          Volver
        </Button>
      </div>
    </Layout>
  );
};

export default EditarDomicilioTemplate;
