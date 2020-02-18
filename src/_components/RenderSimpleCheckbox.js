import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    borderRadius: 4,
    border: 0,
    padding: 0,
    marginLeft: 20,
    paddingRight: 15
  },
  label: {
    fontSize: 15,
    marginBottom: 0
  }
});

export const RenderSimpleCheckbox = ({ input, label }) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label // class name, e.g. `classes-nesting-label-x`
      }}
      control={
        <Checkbox
          checked={input.checked}
          onChange={input.onChange}
          classes={{
            checked: classes.checked
          }}
          color="primary"
        />
      }
      label={label}
    />
  );
};
