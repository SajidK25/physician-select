import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "98%",
    marginRight: 8,
    marginLeft: 16,
    marginTop: 5,
    marginBottom: theme.spacing(1)
  },
  textRoot: {
    padding: 0,
    marginLeft: 30,
    marginRight: 8,
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  textInput: {
    backgroundColor: theme.palette.common.white,
    fontSize: 15,
    padding: "6px 8px",
    width: "100%"
  },
  formHelper: {
    marginLeft: 0,
    marginRight: 0,
    textAlign: "center"
  }
}));

export const RenderNoteField = ({
  input,
  meta: { touched, error },
  ...custom
}) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        variant="outlined"
        error={error && touched}
        multiline
        rows={5}
        className={classes.textField}
        helperText={touched && error}
        InputProps={{
          classes: {
            root: classes.textRoot,
            input: classes.textInput
          }
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.textLabel
        }}
        FormHelperTextProps={{
          classes: {
            root: classes.formHelper
          }
        }}
        {...input}
        {...custom}
      />
    </div>
  );
};
