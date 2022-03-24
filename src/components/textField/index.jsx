import React from "react";
import { useStyles } from "./styles";
import PropTypes from "prop-types";
import TextFieldMUI from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";

const TextField = ({
  id,
  label,
  variant = "outlined",
  items = [],
  onChange,
  onClick,
  onKeyUp,
  value,
  name,
  error = false,
  autosFocus = false,
  color = "primary",
  disabled = false,
  defaultValue,
  fullWidth = true,
  helperText,
  margin,
  placeholder,
  required,
  select,
  size = "small",
  type,
  icon,
  iconPosition = "start",
  autoComplete,
  inputRef,
  multiline = false,
  rows = 1,
  rowsMax = 1,
}) => {
  const classes = useStyles();

  return (
    <TextFieldMUI
      id={id}
      label={label}
      variant={variant}
      onChange={onChange}
      onKeyUp={onKeyUp}
      value={value}
      name={name}
      error={error}
      autoFocus={autosFocus}
      color={color}
      disabled={disabled}
      defaultValue={defaultValue}
      fullWidth={fullWidth}
      helperText={helperText}
      margin={margin}
      multiline={multiline}
      placeholder={placeholder}
      required={required}
      select={select}
      type={type}
      size={size}
      onClick={onClick}
      classes={{ root: classes.root }}
      autoComplete={autoComplete}
      InputProps={
        icon && iconPosition === "start"
          ? {
              startAdornment: error ? (
                <InputAdornment
                  classes={{ root: classes.error }}
                  position={"start"}
                >
                  {icon}
                </InputAdornment>
              ) : (
                <InputAdornment position={"start"}>{icon}</InputAdornment>
              ),
            }
          : icon && {
              endAdornment: error ? (
                <InputAdornment
                  classes={{ root: classes.error }}
                  position={"end"}
                >
                  {icon}
                </InputAdornment>
              ) : (
                <InputAdornment position={"end"}>{icon}</InputAdornment>
              ),
            }
      }
      inputRef={inputRef}
      rows={rows}
      rowsMax={rowsMax}
    >
      {items}
    </TextFieldMUI>
  );
};

TextField.propTypes = {
  autosFocus: PropTypes.bool,
  color: PropTypes.oneOf(["primary", "secondary"]),
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.node,
  id: PropTypes.string,
  items: PropTypes.array,
  label: PropTypes.string,
  margin: PropTypes.oneOf(["dense", "none", "normal"]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  select: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),
  type: PropTypes.string,
  variant: PropTypes.oneOf(["outlined", "standard", "filled"]),
  value: PropTypes.any,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["start", "end"]),
  inputProps: PropTypes.object,
  autoComplete: PropTypes.string,
  inputRef: PropTypes.func,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
};

export default TextField;
