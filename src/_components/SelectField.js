import React from "react";
import { Field } from "react-final-form";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { RenderSelect } from "./";

const SelectField = props => {
  const { name, options, label } = props;

  return (
    <Field
      label={label}
      name={name}
      options={options}
      component={RenderSelect}
    />
  );
};

export { SelectField };
