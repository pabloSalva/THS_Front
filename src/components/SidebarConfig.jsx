// import { Icon } from "@iconify/react";
// import pieChart2Fill from "@iconify-icons/eva";
// import peopleFill from "@iconify-icons/eva";
// import shoppingBagFill from "@iconify-icons/eva";
// import fileTextFill from "@iconify-icons/eva";
// import lockFill from "@iconify-icons/eva";
// import personAddFill from "@iconify-icons/eva";
// import alertTriangleFill from "@iconify-icons/eva";

// ----------------------------------------------------------------------

// const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Inicio",
    path: "/dashboard/app",
    // icon: getIcon(pieChart2Fill),
  },
  {
    title: "Simulador Electrico",
    path: "/simuladores/electrico",
    // icon: getIcon(peopleFill),
  },
  {
    title: "Simulador Gas",
    path: "/simuladores/gas",
    // icon: getIcon(shoppingBagFill),
  },
  {
    title: "Simulador Etiquetas",
    path: "/simuladores/etiqueta",
    // icon: getIcon(fileTextFill),
  },
  // {
  //   title: "login",
  //   path: "/login",
  //   // icon: getIcon(lockFill),
  // },
  // {
  //   title: "register",
  //   path: "/register",
  //   // icon: getIcon(personAddFill),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   // icon: getIcon(alertTriangleFill),
  // },
];

export default sidebarConfig;
