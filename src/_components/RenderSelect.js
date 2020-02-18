import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(theme => ({
  formControl: {
    paddingRight: 6
  },
  textRoot: {
    padding: 0,
    backgroundColor: "white"
  },
  textInput: {
    padding: "8px 10px",
    fontSize: 18
  },
  formHelper: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 4,
    marginBottom: 4,
    textAlign: "center"
  },
  select: {
    width: "calc(100% - 20px)"
  }
}));

const RenderSelect = props => {
  const {
    input,
    inputProps,
    type,
    placeholder,
    autoFocus,
    label,
    options,
    meta: { touched, error }
  } = props;
  const classes = useStyles();

  return (
    <FormControl
      className={classes.formControl}
      error={error && touched}
      fullWidth={true}
    >
      <InputLabel htmlFor={input.name}>{label}</InputLabel>
      <Select
        native
        id={input.name}
        {...input}
        type={type}
        autoFocus={autoFocus}
        classes={{ select: classes.select }}
        placeholder={placeholder}
        inputProps={inputProps}
      >
        {options.map(i => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
      </Select>
      {error && touched && (
        <FormHelperText
          id={`${input.name}-text`}
          classes={{ root: classes.formHelper }}
        >
          {touched && error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export { RenderSelect };

/* // input={
       //   <OutlinedInput
       //     name={input.name}
       //     id={input.name}
       //     classes={{ root: classes.textRoot, input: classes.textInput }}
       //   />
        } */
