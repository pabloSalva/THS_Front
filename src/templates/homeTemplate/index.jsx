import React from "react";
import Layout from "../layout/Layout";
import { useStyles } from "./styles";

const HomeTemplate = ({ openDrawer }) => {
  const classes = useStyles();
  return (
    <Layout
      titulo="Bienvenido/a a Tu Hogar Sustentable THS"
      openDrawer={openDrawer}
    ></Layout>
  );
};

export default HomeTemplate;
