import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { esES } from "@material-ui/core/locale";
import palette from "./palette";

const theme = createMuiTheme(
  {
    palette: palette,
    typography: {
      fontFamily: ["Mada", "arial"].join(","),
      h1: { fontSize: "36px", fontWeight: 500 },
      h2: { fontSize: "24px", fontWeight: 600 },
      h3: { fontSize: "20px", fontWeight: 400 },
      h4: { fontSize: "16px", fontWeight: 400 },
      h5: { fontSize: "18px", fontWeight: 400 },
      h6: { fontSize: "14px", fontWeight: 500 },
      body1: { fontSize: "14px", fontWeight: 400 },
      subtitle1: { fontSize: "18px", fontWeight: 500 },
    },
    overrides: {
      MuiTextField: {
        root: {
          verticalAlign: "middle",
          "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: 8,
          color: palette.action.selected,
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: palette.action.hover,
            color: palette.action.hover,
          },
          "&$focused $notchedOutline": {
            borderColor: palette.primary.main,
            color: palette.primary.main,
          },
        },
      },
      MuiInputBase: {
        root: {
          "&:hover": {
            color: palette.action.hover,
          },
          "&$focused": {
            color: palette.primary.main,
          },
          "&::placeholder": {
            color: "inherit",
          },
        },
      },
      MuiFormLabel: {
        root: {
          "&:hover:not($disabled):not($focused):not($error)": {
            color: palette.action.hover,
          },
          "&$focused": {
            color: palette.primary.main,
          },
        },
      },
      MuiSvgIcon: {
        colorPrimary: {
          color: palette.primary.light,
          "&:hover": {
            color: palette.primary.main,
          },
          "&:active": {
            color: palette.primary.dark,
          },
        },
      },
      MuiCheckbox: {
        root: {
          color: palette.grey.light,
        },
      },
      MuiTable: {
        root: {
          "& tbody>.MuiTableRow-root:hover": {
            background: palette.secondary.light,
          },
        },
      },
      MuiTableCell: {
        root: {
          border: "1px solid #E1E1E1",
          borderBottom: "1px solid #E1E1E1",
          cursor: "default",
          padding: 0,
          "&:last-child": {
            borderRight: 0,
          },
          "&:first-child": {
            borderLeft: 0,
          },
        },
        head: {
          color: "#757575",
          fontSize: 18,
        },
        body: {
          color: "black",
          fontSize: 16,
        },
      },
      MuiDataGrid: {
        root: {
          fontSize: 14,
          border: "0px",
          "& .MuiDataGrid-colCellWrapper": {
            borderTop: `1px solid ${palette.grey.light}`,
          },
          "& .MuiDataGrid-colCellTitle": {
            color: palette.grey.dark,
            fontSize: 16,
            fontWeight: 500,
            cursor: "default",
          },
          "& .MuiDataGrid-cell, .MuiDataGrid-colCell, .MuiDataGrid-colCellWrapper":
            {
              borderRight: `1px solid ${palette.grey.light}`,
              "&:nth-last-child(1)": {
                borderRight: "none",
              },
              "&:focus": {
                outline: "unset",
              },
            },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey.light}`,
            "&:focus-within": {
              outline: "unset",
            },
          },
          "& .MuiDataGrid-columnsContainer": {
            border: "none",
            "&:first-child": {
              border: "none",
            },
            "&:last-child": {
              border: "none",
            },
          },
          "& .MuiDataGrid-colCellCheckbox, .MuiDataGrid-cellCheckbox": {
            borderRight: "0",
            borderLeft: "0",
            marginRight: "-16px",
          },
          "& .MuiDataGrid-iconSeparator": {
            color: "transparent",
            display: "none",
          },
          "& .MuiDataGrid-row": {
            "&:first-child": {
              borderTop: `1px solid ${palette.grey.light}`,
              borderBottom: `0px`,
            },
            "&:hover": {
              backgroundColor: "rgba(118, 143, 255, 0.15)", // no está en la paleta
            },
          },
          "& .MuiDataGrid-overlay": {
            backgroundColor: "transparent",
            borderTop: `1px solid ${palette.grey.light}`,
          },
        },
      },
      MuiTreeItem: {
        root: {
          "&:focus > $content $label": {
            backgroundColor: palette.secondary.main,
          },
        },
        label: {
          fontSize: "14px",
          fontWeight: 400,
          padding: 8,
          paddingLeft: 16,
          "&:hover": {
            backgroundColor: palette.secondary.light,
          },
        },
      },
    },
  },
  esES
);

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.element,
};

export default Theme;
