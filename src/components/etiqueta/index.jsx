import React from "react";

const Etiqueta = ({ numero = 0 }) => {
  return (
    <img
      alt="etiquetas"
      src={process.env.PUBLIC_URL + `/icons/etiquetas/etiqueta-${numero}.png`}
    />
  );
};

export default Etiqueta;
