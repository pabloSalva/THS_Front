import React from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import Layout from "../layout/Layout";

const CerramientoTemplate = ({
  register,
  handleSubmit,
  handleSubmit2,
  register2,
  handleChangeTipo,
  handleChangeOrientacion,
  tipoValue,
  handleChangeMaterial,
  materiales,
  tipoTecho,
  tipoPared,
  tipoPuerta,
  tipoVentana,
  tipoCerramiento,
  verCerramientos,
  verArtefactos,
  paperArtefacto,
  paperCerramiento,
  ambienteDescripcion,
}) => {
  const classes = useStyles();

  const tipo = [
    { id: "VENTANTA", label: "Ventana" },
    { id: "TECHO", label: "Techo" },
    { id: "PARED", label: "Pared" },
    { id: "PUERTA", label: "Puerta" },
  ];

  const orientacion = [
    { id: "NORTE", label: "Norte" },
    { id: "SUR", label: "Sur" },
    { id: "ESTE", label: "Este" },
    { id: "OESTE", label: "Oeste" },
    { id: "NOROESTE", label: "Noroeste" },
    { id: "SUROESTE", label: "Suroeste" },
    { id: "NORESTE", label: "Noreste" },
    { id: "SURESTE", label: "Sureste" },
  ];
  return (
    <Layout>
      <div>
        <Typography className={classes.categoriaTittle} variant="h3">
          Seleccione el tipo de cerramiento
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
                process.env.PUBLIC_URL + "/icons/cerramientos/ParedLadrillo.png"
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

        <Paper className={classes.paperInterno}>
          <form onSubmit={handleSubmit} className={classes.ambienteForm}>
            <Typography className={classes.categoriaTittle}>
              Crear un cerramiento
            </Typography>
            <div className={classes.form}>
              <InputLabel id="denominacion">Denominacion</InputLabel>
              <TextField
                fullWidth
                // label="denominacion domicilio"
                name="denominacion"
                variant="outlined"
                margin="dense"
                {...register("denominacion", {
                  required: true,
                  maxLength: 30,
                })}
              />
              <InputLabel id="ancho">Ancho del cerramiento</InputLabel>
              <TextField
                fullWidth
                type="number"
                // label="Cantidad de habitantes"
                name="ancho"
                variant="outlined"
                margin="dense"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                {...register("ancho", {
                  required: true,
                  maxLength: 4,
                })}
              />
              <InputLabel id="alto">Alto del cerramiento</InputLabel>
              <TextField
                fullWidth
                type="number"
                // label="Cantidad de habitantes"
                name="alto"
                variant="outlined"
                margin="dense"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                {...register("alto", {
                  required: true,
                  maxLength: 4,
                })}
              />
              <InputLabel id="tipo">Tipo</InputLabel>
              <TextField
                fullWidth
                type="text"
                disabled
                // label="Cantidad de habitantes"
                name="tipo"
                variant="outlined"
                margin="dense"
                value={tipoCerramiento}
                {...register("tipo", { required: true, maxLength: 30 })}
              />
              <InputLabel id="orientacion">Orientacion</InputLabel>
              <Select
                labelId="orientacion"
                label="orientacion"
                name="orientacion"
                variant="outlined"
                fullWidth
                margin="dense"
                className={classes.select}
                onChange={handleChangeOrientacion}
                {...register("orientacion")}
              >
                {orientacion.map((nodo) => (
                  <MenuItem value={nodo.id}>{nodo.label}</MenuItem>
                ))}
              </Select>
              <InputLabel id="material">Material</InputLabel>
              <Select
                labelId="material"
                label="material"
                name="material"
                variant="outlined"
                fullWidth
                margin="dense"
                className={classes.select}
                onChange={handleChangeMaterial}
                {...register("material")}
              >
                {materiales &&
                  materiales.map((nodo) => (
                    <MenuItem value={nodo.id}>{nodo.nombre}</MenuItem>
                  ))}
              </Select>
              <Button
                className={classes.select}
                variant="contained"
                color="success"
                fullWidth={true}
                type="submit"
              >
                Crear Cerramiento
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </Layout>
  );
};

export default CerramientoTemplate;
