import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { fromDate, calculateDeadline } from "../_helpers";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green, red } from "@material-ui/core/colors";
import Print from "@material-ui/icons/Print";
import { ErrorMessage, ScriptPdf, Loading } from "./";
import { tableIcons } from "./";
import { PENDING_PRESCRIPTIONS } from "../Graphql";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  visitBox: {
    flex: 1
  },
  container: {
    overflow: "auto",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  orange: {
    height: 30,
    width: 30,
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}));

const useAvatarStyles = makeStyles(theme => ({
  orange: {
    height: 30,
    width: 30,
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}));

const useStatusAvatarStyles = makeStyles(theme => ({
  statusAvatar: {
    fontSize: 14,
    fontWeight: 500
  },

  pending: {
    height: 20,
    width: 20,
    fontSize: 12,
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[500]
  },
  active: {
    height: 20,
    width: 20,
    fontSize: 12,
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[800]
  },
  denied: {
    height: 20,
    width: 20,
    fontSize: 12,
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500]
  }
}));

const StatusAvatar = ({ status }) => {
  const classes = useStatusAvatarStyles();
  console.log("Status", status);

  return (
    <div className={classes.statusAvatar}>
      {status === "ACTIVE" && (
        <Avatar variant="square" className={classes.active}>
          A
        </Avatar>
      )}
      {status === "PENDING" && (
        <Avatar variant="square" className={classes.pending}>
          P
        </Avatar>
      )}
      {status === "DENIED" && (
        <Avatar variant="square" className={classes.denied}>
          D
        </Avatar>
      )}
    </div>
  );
};

const TypeAvatar = ({ type }) => {
  const classes = useAvatarStyles();

  if (type !== "ED") return null;

  return <Avatar className={classes.orange}>{type}</Avatar>;
};

const EnteredDate = ({ enteredDate }) => {
  if (!enteredDate) return "";

  return (
    <Typography
      color={calculateDeadline(enteredDate) > 0 ? "error" : "textPrimary"}
    >
      {fromDate(enteredDate)}
    </Typography>
  );
};

export const NewVisits = ({ status }) => {
  const [open, setOpen] = React.useState(false);
  const [pdfData, setPdfData] = useState([]);
  const history = useHistory();

  const { data, loading, error, fetchMore } = useQuery(PENDING_PRESCRIPTIONS, {
    variables: { status },
    pollInterval: 2000
  });
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const updateList = () => {
    console.log("Status: ", status);
    console.log("UpdateList", pdfData);
    setOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <p>No new visits</p>;

  console.log("Data:", data);

  let tableData = [];
  if (data.pendingPrescriptions) {
    tableData = data.pendingPrescriptions.map(p => ({
      id: p.id,
      type: p.type,
      status: p.status,
      name: `${p.user.lastName}, ${p.user.firstName}`,
      lastName: p.user.lastName,
      firstName: p.user.firstName,
      product: p.product.display,
      addon: p.addon ? p.addon.display : "",
      added: p.createdAt
    }));
  }

  return (
    <div className={classes.container}>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Download Prescription File"}
        </DialogTitle>
        <DialogActions>
          <ScriptPdf data={pdfData} handleClick={updateList} />
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialTable
        title={status === "PENDING" ? "New Visits" : "New Visits"}
        icons={tableIcons}
        onRowClick={(event, rowData) => {
          history.push("/visit/" + rowData.id);
        }}
        columns={[
          {
            title: "Type",
            field: "type",
            width: 60,
            render: rowData => <TypeAvatar type={rowData.type} />
          },
          {
            title: "Stat",
            field: "status",
            width: 60,
            render: rowData => <StatusAvatar status={rowData.status} />
          },
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Product",
            field: "product"
          },
          {
            title: "Addon",
            field: "addon"
          },
          {
            title: "Entered",
            field: "added",
            width: 150,
            render: rowData => <EnteredDate enteredDate={rowData.added} />
          }
        ]}
        data={tableData}
        options={{
          search: false,
          padding: "dense",
          draggable: false,
          toolbar: false,
          pageSize: 10,
          showTextRowsSelected: false,
          showTitle: false,
          tableLayout: "auto",
          headerStyle: {
            backgroundColor: "#039be5",
            borderRightStyle: "solid",
            borderRightWidth: 1,
            color: "white"
          }
        }}
      />
    </div>
  );
};
