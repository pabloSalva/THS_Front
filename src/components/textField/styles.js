import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid inherit",
  },
  error: {
    color: theme.palette.error.main,
  },
}));

export default useStyles;
