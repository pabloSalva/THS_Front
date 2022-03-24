import React from "react";
import { useStyles } from "./styles";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

const RightPanel = ({
  tituloGeneral,
  handleClose,
  openDrawer,
  children,
}) => {
  const classes = useStyles();
  return (
    <Drawer anchor="right" classes={{ paper: classes.paper }} variant="persistent" open={openDrawer} onClose={handleClose} >
      <div className={classes.fondo}>
        <CancelOutlinedIcon className={classes.icono} color="error" fontSize="medium" onClick={handleClose} />
        <Typography className={classes.tituloDetalle}> Artefactos de: {tituloGeneral} </Typography>
        {children}
      </div>
    </Drawer>
  );
};

RightPanel.propTypes = {
  tituloGeneral: PropTypes.string,
  children: PropTypes.node,
  handleClose: PropTypes.func,
  openDrawer: PropTypes.bool,
};

export default RightPanel;
