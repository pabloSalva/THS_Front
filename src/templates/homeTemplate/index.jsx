import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import Layout from "../layout/Layout";
import { useStyles } from "./styles";

const HomeTemplate = ({ openDrawer }) => {
  const classes = useStyles();
  return (
    <Layout titulo="Bienvenido!" openDrawer={openDrawer}>
      <Carousel fade className={classes.root}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "/icons/primeraPagina.png"}
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "/icons/slide1.jpg"}
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "/icons/slide2.jpg"}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Layout>
  );
};

export default HomeTemplate;
