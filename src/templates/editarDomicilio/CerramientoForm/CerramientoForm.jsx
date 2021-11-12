import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../styles";

const CerramientoForm = ({
  // register,
  // handleSubmit2,
  handleChangeTipo,
  handleChangeOrientacion,
  tipoValue,
  handleChangeMaterial,
  materiales,
}) => {
  const classes = useStyles();

  const {
    register: register2,
    getValues: getValues2,
    handleSubmit: handleSubmit2,
  } = useForm({
    defaultValues: {
      denominacion: "",
      superficie: "",
      tipo: "",
      orientacion: "",
      material: "",
    },
    mode: "onBlur",
  });
  const superficie = () => getValues2("ancho") * getValues2("alto");
  const onSubmit = (data) => console.log("hola" + data, superficie());

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
    <Paper className={classes.paperInterno}>
      <form key={2} onSubmit={handleSubmit2(onSubmit)}>
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
            {...register2("denominacion", {
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
            {...register2("ancho", {
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
            {...register2("alto", {
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
            value={tipoValue}
            {...register2("tipo", { required: true, maxLength: 30 })}
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
            {...register2("orientacion")}
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
            {...register2("material")}
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
  );
};

export default CerramientoForm;
