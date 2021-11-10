import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as GiIcons from "react-icons/gi"

export const sidebarConfig = [
  {
    title: "Inicio",
    path: "/dashboard/app",
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: "Simulador Electrico",
    path: "/simuladores/electrico",
    icon: <GiIcons.GiElectric />,
    cName: 'nav-text'
  },
  {
    title: "Simulador Gas",
    path: "/simuladores/gas",
    icon: <AiIcons.AiFillFire />,
    cName: 'nav-text'
  },
  {
    title: "Simulador Etiquetas",
    path: "/domicilios",
    icon: <FaIcons.FaHouseUser />,
    cName: 'nav-text'
  },
];

export default sidebarConfig;
