import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export const Error = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <Typography align="center" color="error" key={i}>
        {error.message.replace("GraphQL error: ", "")}
      </Typography>
    ));
  }
  return (
    <Typography align="center" color="error">
      {error.message.replace("GraphQL error: ", "")}
    </Typography>
  );
};

Error.defaultProps = {
  error: {}
};

Error.propTypes = {
  error: PropTypes.object
};
