import { makeStyles } from "@material-ui/core/styles";

const fontConfig = {
  fontWeight: 'bold',
  lineHeight: "25px",
};

export const useStyles = makeStyles((theme) => ({
    paper: {
      border: "1px solid #E1E1E1",
      backgroundColor: "#FFFFFF",
      width: 225,
      top: "inherit",
      bottom: 0,
      height: "100%",
      marginRight: 0,
    },
    button: {
      display: "flex",
      padding: "16px 24px 16px 16px",
      justifyContent: "flex-end",
    },
    fondo: {
      margin: 24,
      height: "100%",
    },

    icono: {
      position: "absolute",
      right: "20px",
    },

    tituloDetalle: {
      marginBottom: "35px ",
      marginTop: "30px",
      fontSize: "18px",
      ...fontConfig,
    },
    Divider: {
      backgroundColor: "#C4C4C4",
    },
    FlexContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
  }));
export default useStyles;
