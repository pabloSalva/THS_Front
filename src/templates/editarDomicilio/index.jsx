import {
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import Layout from "../layout/Layout";
import { useStyles } from "./styles";
// import AmbienteForm from "./AmbienteForm/AmbienteForm";
import CerramientoForm from "./CerramientoForm/CerramientoForm";

const EditarDomicilioTemplate = ({
  editarDomiciclio,
  crearAmbiente,
  calcularEficienciaPage,
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
}) => {
  const classes = useStyles();
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
            Crear Ambientes
          </Typography>
          <Button onClick={crearAmbiente}>
            <img
              alt="ambientes"
              src={process.env.PUBLIC_URL + "/icons/editarCasas.png"}
              className={classes.logo}
            />
          </Button>
        </Paper>
        <Paper>
          <Typography className={classes.categoriaTittle}>
            Agregar Artefactos
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

      {domicilioEdit && (
        <Paper className={classes.paperInterno}>
          <form onSubmit={handleSubmit}>
            <Typography className={classes.categoriaTittle}>
              Editar Domicilio
            </Typography>
            <div className={classes.form}>
              <InputLabel id="nombre">Nombre domicilio</InputLabel>
              <TextField
                fullWidth
                // label="Nombre domicilio"
                name="Editar domicilio"
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
        <Paper className={classes.paperInterno}>
          <Typography className={classes.categoriaTittle}>
            Agregar Ambientes al domicilio
          </Typography>
          <div className={classes.paperInternoAmbientes}>
            <Button onClick={tipoTecho}>
              <img
                alt="techo"
                src={process.env.PUBLIC_URL + "/icons/cerramientos/Techo.png"}
                className={classes.logo}
              />
            </Button>
            <Button onClick={tipoPared}>
              <img
                alt="pared"
                src={
                  process.env.PUBLIC_URL +
                  "/icons/cerramientos/ParedLadrillo.png"
                }
                className={classes.logo}
              />
            </Button>
            <Button onClick={tipoPuerta}>
              <img
                alt="puerta"
                src={process.env.PUBLIC_URL + "/icons/cerramientos/Puerta.jpg"}
                className={classes.logo}
              />
            </Button>
            <Button onClick={tipoVentana}>
              <img
                alt="ventana"
                src={process.env.PUBLIC_URL + "/icons/cerramientos/Ventana.png"}
                className={classes.logo}
              />
            </Button>
          </div>
          <CerramientoForm
            // register2={register2}
            tipoValue={tipoCerramiento}
            materiales={materiales}
            // handleSubmit2={handleSubmit2}
          />
        </Paper>
      )}

      {eficienciaCreate && (
        <Paper className={classes.paperInterno}>
          <Typography className={classes.categoriaTittle}>
            Calcular Eficiencia energética en domicilio
          </Typography>
          <Button onClick={editarDomiciclio}>
            <img
              alt="crear-casa"
              src={process.env.PUBLIC_URL + "/icons/Casa1.png"}
              className={classes.logo}
            />
          </Button>
        </Paper>
      )}
      <div className={classes.volver}>
        <Button
          color="info"
          label="Volver"
          variant="outlined"
          onClick={buttonVolver}
        >
          Volver
        </Button>
      </div>
    </Layout>
  );
};

export default EditarDomicilioTemplate;
