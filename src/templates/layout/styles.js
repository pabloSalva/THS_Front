import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  left: {
    maxWidth: 352,
  },
  right: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  layoutContainer: {
    overflowY: "auto",
    width: "100%",
    flex: 1,
    backgroundColor: "rgb(238,243,249,0.56)",
    display: "flex",
    flexDirection: "column",
    padding: "24px 24px 0px 24px",
    boxSizing: "border-box",
    height: "100%",
  },
  containerReduce: {
    paddingRight: 336,
  },
  footer: {
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
