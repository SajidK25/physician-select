import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { orange, blue } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ConfirmProvider } from "./Confirmation";
import { Main } from "./_pages/Main";

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        //    padding: 6
      },
    },
    MuiFormHelperText: {
      root: {
        marginLeft: 12,
        color: "rgba(0, 0, 0, 0.75)",
      },
    },
  },
  palette: {
    //  primary: teal,
    primary: blue,
    secondary: orange,
    background: {
      default: "#fafafa",
    },
  },
  //  breakpoints: {
  //    values: {
  //      sm: 425,
  //      md: 768
  //    }
  //  },
  typography: {
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontSize: "0.96em",
      fontWeight: 300,
      lineHeight: "1.35rem",
    },
    h6: {
      fontSize: "1.5em",
      lineHeight: "1.66rem",
      letterSpacing: 0,
      fontWeight: 500,
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ConfirmProvider>
        <Main />
      </ConfirmProvider>
    </MuiThemeProvider>
  );
};

export { App };
