import React from "react";
import PropTypes from "prop-types";
import useStyles from "./styles";
import clsx from "clsx";

const Layout = ({children, openDrawer, titulo }) => {
  const classes = useStyles();
  return (
      <div className={clsx(classes.layoutContainer, { [classes.containerReduce]: openDrawer, })} >
        <h1 style={{textAlign: "center"}}>{titulo}</h1>
        {children}
      </div>
  );
};

Layout.propTypes = {
  titulo: PropTypes.string,
  children: PropTypes.node,
  openDrawer: PropTypes.bool,
};

export default Layout;
