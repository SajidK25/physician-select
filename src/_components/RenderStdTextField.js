import React from "react";
import TextField from "@material-ui/core/TextField";

const RenderStdTextField = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextField
      {...rest}
      name={name}
      inputProps={restInput}
      onChange={onChange}
      value={value}
    />
  );
};

export { RenderStdTextField };

/*helperText={showError ? meta.error || meta.submitError : undefined}
  error={showError} */
