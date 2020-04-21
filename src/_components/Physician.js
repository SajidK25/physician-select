import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TabPanel, a11yProps } from "./";
import { PrescriptionList, MessageList } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
    minHeight: "100%",
    padding: theme.spacing(1),
  },
  gridItem: {
    overflow: "auto",
    height: "auto",
  },
  tabPanel: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
  paper: {
    display: "flex",
    width: "100%",
    height: "calc(99vh - 40px)",
    padding: 4,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 4,
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flex: 1,
  },
}));

export const Physician = () => {
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
          <Tab label="Office Visits" {...a11yProps(0)} />
          <Tab label="Patient Messages" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel
        className={classes.tabPanel}
        value={value}
        index={0}
        dir={theme.direction}
      >
        <PrescriptionList />
      </TabPanel>

      <TabPanel
        className={classes.tabPanel}
        value={value}
        index={1}
        dir={theme.direction}
      >
        <MessageList />
      </TabPanel>
    </div>
  );
};

{
  /* <AppBar position="static" color="default">
<Tabs
  value={value}
  onChange={handleChange}
  indicatorColor="primary"
  textColor="primary"
  variant="fullWidth"
  aria-label="full width tabs example"
>
  <Tab label="Patients" {...a11yProps(0)} />
  <Tab label="New Tasks" {...a11yProps(1)} />
</Tabs>
</AppBar>

<TabPanel
className={classes.tabPanel}
value={value}
index={0}
dir={theme.direction}
>
<PrescriptionList />
</TabPanel>
<TabPanel
className={classes.tabPanel}
value={value}
index={1}
dir={theme.direction}
>
<div>New Tasks!</div>
</TabPanel> */
}
