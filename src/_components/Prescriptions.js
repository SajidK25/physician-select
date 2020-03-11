import React from "react";
import ReactPDF from "@react-pdf/renderer";
import { forwardRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Print from "@material-ui/icons/Print";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { ErrorMessage, ScriptPdf, PrescriptionTile, Loading } from "./";
import { PHARMACYLIST_QUERY } from "../Graphql";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  visitBox: {
    flex: 1
  },
  container: {
    overflow: "auto",
    minWidth: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(1)
  }
}));

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Print {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export const Prescriptions = () => {
  const [open, setOpen] = React.useState(false);
  const [pdfData, setPdfData] = useState([]);

  const { data, loading, error, fetchMore } = useQuery(PHARMACYLIST_QUERY, {
    pollInterval: 1500
  });
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <p>No new visits</p>;

  console.log("Data:", data);

  let tableData = [];
  if (data.prescriptions && data.prescriptions.edges) {
    tableData = data.prescriptions.edges.map(p => ({
      name: `${p.node.user.lastName}, ${p.node.user.firstName}`,
      product: `${p.node.product.display}`,
      productQuantity: `${p.node.timesPerMonth * p.node.shippingInterval}`,
      addon: `${p.node.addon.display}`,
      addonQuantity: `${p.node.addonTimesPerMonth * p.node.shippingInterval}`,
      approvedDate: "3/10/2020"
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
          <ScriptPdf data={pdfData} />
          <Button onClick={handleClose} color="primary" autoFocus>
            Update Status
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialTable
        title="Prescriptions to be processed"
        icons={tableIcons}
        columns={[
          { title: "Name", field: "name" },
          { title: "Product", field: "product" },
          { title: "Quantity", field: "productQuantity" },
          { title: "Addon", field: "addon" },
          { title: "Quantity", field: "addonQuantity" },
          {
            title: "Approved Date",
            field: "approvedDate"
          }
        ]}
        data={tableData}
        options={{ selection: true, search: false }}
        actions={[
          {
            tooltip: "Print Prescriptions",
            icon: () => <Print />,
            onClick: (evt, data) => {
              setPdfData(data);
              setOpen(true);
            }
          }
        ]}
      />
    </div>
  );
};
