import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  layoutContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "24px 24px 0px 24px",
    boxSizing: "border-box",
    height: "100%",
    marginLeft: 220
  },
}));

export default useStyles;
