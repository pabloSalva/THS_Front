import React from "react";
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

const CalculadoraElectricaTemplate = ({
  openDrawer,
  handleCloseRightPanel,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

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
    <Layout titulo="Calculadora de consumo electrico">
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
            <img
              alt="aire-acondicionado"
              src={process.env.PUBLIC_URL + "/icons/aire-acondicionado.svg"}
              className={classes.logo}
            />
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
            <img
              alt="lavarropas"
              src={process.env.PUBLIC_URL + "/icons/lavaropa.svg"}
              className={classes.logo}
            />
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
            <img
              alt="Luz"
              src={process.env.PUBLIC_URL + "/icons/luz.svg"}
              className={classes.logo}
            />
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
            <img
              alt="microondas"
              src={process.env.PUBLIC_URL + "/icons/microonda.svg"}
              className={classes.logo}
            />
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
            <img
              alt="electronica"
              src={process.env.PUBLIC_URL + "/icons/monitor.svg"}
              className={classes.logo}
            />
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
            <img
              alt="heladeras"
              src={process.env.PUBLIC_URL + "/icons/refrigerador.svg"}
              className={classes.logo}
            />
          </Paper>
        </div>
        {openDrawer && (
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
                        primary={`Artefacto ${value + 1}`}
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
              <Button>Agregar</Button>
            </div>
          </RightPanel>
        )}
      </div>
    </Layout>
  );
};

CalculadoraElectricaTemplate.propTypes = {
  openDrawer: PropTypes.bool,
  handleCloseRightPanel: PropTypes.func,
};

export default CalculadoraElectricaTemplate;
