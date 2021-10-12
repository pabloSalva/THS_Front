import { Button, Paper, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../layout/Layout";
import { useStyles } from "./styles";

const EtiquetadoTemplate = ({
  crearDomiciclio,
  verDomicilios,
  calcularEficienciapage,
  openDrawer,
}) => {
  const classes = useStyles();
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
          <Button onClick={calcularEficienciapage}>
            <img
              alt="Luz"
              src={process.env.PUBLIC_URL + "/icons/houses.svg"}
              className={classes.logo_calculo}
            />
          </Button>
        </Paper>
      </div>
    </Layout>
  );
};

export default EtiquetadoTemplate;
