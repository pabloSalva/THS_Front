import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  inputs: {
    paddingTop: 33,
  },
  textArea: {
    paddingTop: 33,
  },
  logo: {
    width: 150,
    height: 100,
  },
  logo_calculo: {
    width: 300,
    height: 100,
  },
  categoriaTittle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "#5CA469",
    fontWeight: "bold",
    fontSize: "20px",
  },
  papers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "10%",
  },
  subtitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "10%",
  },
  paperInterno: {
    display: "flex",
    flexDirection: "column",
  },
  rightPanel: {
    width: "30%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 450,
  },
  rootright: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  entidad: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 30,
  },
  consumo: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    color: "#5CA4BB",
    fontWeight: "bold",
    fontSize: "20px",
  },
  paperConsumo: {
    marginTop: 50,
  },
  volver: {
    marginTop: 50,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  select: {
    marginTop: 10,
  },
}));
export default useStyles;
