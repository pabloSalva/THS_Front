import React, { useState } from "react";
import PropTypes from "prop-types";
// import { Outlet } from "react-router-dom";
// material
// import { styled } from "@material-ui/core/styles";
// //
// import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from "../../components/DashboardSidebar";
import useStyles from "./styles";

// ----------------------------------------------------------------------

// const APP_BAR_MOBILE = 64;
// const APP_BAR_DESKTOP = 92;

// const RootStyle = styled("div")({
//   display: "flex",
//   minHeight: "100%",
//   overflow: "hidden",
// });

// const MainStyle = styled("div")(({ theme }) => ({
//   flexGrow: 1,
//   overflow: "auto",
//   minHeight: "100%",
//   paddingTop: APP_BAR_MOBILE + 24,
//   paddingBottom: theme.spacing(10),
//   [theme.breakpoints.up("lg")]: {
//     paddingTop: APP_BAR_DESKTOP + 24,
//     // paddingLeft: theme.spacing(2),
//     // paddingRight: theme.spacing(2),
//   },
// }));

// ----------------------------------------------------------------------

const Layout = ({ titulo, children }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <DashboardNavbar onOpenSidebar={() => setOpen(true)} /> */}
      <div className={classes.left}>
        <DashboardSidebar
          isOpenSidebar={open}
          onCloseSidebar={() => setOpen(false)}
        />
      </div>
      <div className={classes.right}>
        <h1>{titulo}</h1>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  titulo: PropTypes.string,
  children: PropTypes.node,
};

export default Layout;
