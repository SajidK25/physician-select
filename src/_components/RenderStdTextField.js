import React from "react";
import TextField from "@material-ui/core/TextField";

const RenderStdTextField = props => {
  const {
    input,
    meta: { touched, error },
    ...rest
  } = props;

  return (
    <TextField
      {...input}
      {...rest}
      error={error && touched}
      helperText={touched && error}
    />
  );
};

export { RenderStdTextField };
