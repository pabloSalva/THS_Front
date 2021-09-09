import React from "react";
import { useStyles } from "./styles";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Divider } from "@material-ui/core";

const RightPanel = ({
  tituloGeneral,
  button,
  buttonDelete,
  handleClose,
  openDrawer,
  children,
}) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="right"
      classes={{
        paper: classes.paper,
      }}
      variant="persistent"
      open={openDrawer}
      onClose={handleClose}
    >
      <div className={classes.fondo}>
        <Typography className={classes.tituloDetalle}>
          {tituloGeneral}
        </Typography>
        {children}
      </div>
      <Divider className={classes.Divider} />
      <div className={classes.FlexContainer}>
        {buttonDelete && (
          <div className={classes.button}>
            <Button
              label={buttonDelete.label}
              size={buttonDelete.size || "small"}
              type={"submit"}
              handleClick={buttonDelete.handleClick}
              variant={buttonDelete.variant}
              color={buttonDelete.color}
              disabled={buttonDelete.disabled}
              form={buttonDelete.form}
            />
          </div>
        )}
        {button && (
          <div className={classes.button}>
            <Button
              label={button.label}
              size={button.size || "small"}
              type={"submit"}
              handleClick={button.handleClick}
              variant={button.variant}
              color={button.color}
              disabled={button.disabled}
              form={button.form}
            />
          </div>
        )}
      </div>
    </Drawer>
  );
};

RightPanel.propTypes = {
  tituloGeneral: PropTypes.string,
  children: PropTypes.node,
  button: PropTypes.any,
  buttonDelete: PropTypes.any,
  handleClose: PropTypes.func,
  openDrawer: PropTypes.bool,
};

export default RightPanel;
