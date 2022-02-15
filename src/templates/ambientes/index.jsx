import React from "react";
import {
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import Layout from "../layout/Layout";

const AmbientesTemplate = ({
  verCerramientos,
  verArtefactos,
  paperArtefacto,
  paperCerramiento,
  ambienteDescripcion,
  nuevoCerramiento,
  cerramientos,
  verCerramiento,
}) => {
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
            <div className={classes.titleAmbiente}>
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

        {paperArtefacto && <Paper>Hola</Paper>}
      </div>
    </Layout>
  );
};

export default AmbientesTemplate;
