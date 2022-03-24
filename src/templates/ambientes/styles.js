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
    fontWeight: "black",
    fontSize: "20px",
    paddingBottom: 20,
  },
  papersAmbientes: {
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    justifyContent: "space-evenly",
    paddingBottom: "10%",
    paddingTop: 40,
  },
  papers: {
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    justifyContent: "space-evenly",
    paddingBottom: 60,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    justifyContent: "space-evenly",
    paddingTop: 40,
    paddingBottom: 40,
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
  paperInternoAmbientes: {
    display: "flex",
    flexDirection: "rows",
    justifyContent: "space-evenly",
  },
  titleAmbiente: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 40,
    paddingTop: 40,
    alignItems: "center",
  },
  seleccionTitle: { display: "flex" },
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
  ambienteForm: {
    margin: theme.spacing(3),
    alignItems: "center",
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
  artefactosList: {
    display: "flex",
    flexDirection: "column",
  },
  noAmbiente: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default useStyles;
