import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/icons/primeraPagina.png"
    })`,
  },
}));
export default useStyles;
