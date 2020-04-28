import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TabPanel, a11yProps } from "./";
import { Prescriptions } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 50,
  },
  paper: {
    marginTop: 4,
    width: "100%",
    maxWidth: 1000,
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const Pharmacy = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.paper}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="To Be Processed" {...a11yProps(0)} />
          <Tab label="In Process" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <Prescriptions status="PENDING" />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Prescriptions status="PROCESSING" />
      </TabPanel>
    </div>
  );
};
