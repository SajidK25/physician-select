import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { formatDate } from "../_helpers";
import Print from "@material-ui/icons/Print";
import { ErrorMessage, ScriptPdf, Loading } from "./";
import { tableIcons } from "./";
import { PHARMACYLIST_QUERY, PROCESS_ORDERS, SHIP_ORDERS } from "../Graphql";

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
  }
}));

export const Prescriptions = ({ status }) => {
  const [open, setOpen] = React.useState(false);
  const [pdfData, setPdfData] = useState([]);

  const { data, loading, error, fetchMore } = useQuery(PHARMACYLIST_QUERY, {
    variables: { status },
    pollInterval: 2000
  });

  const [processOrders, { error: processError }] = useMutation(PROCESS_ORDERS);
  const [shipOrders, { error: shipError }] = useMutation(SHIP_ORDERS);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const updateList = async () => {
    let idList = [];
    idList = pdfData.map(p => p.id);

    console.log("IdList:", idList);

    if (status === "PENDING") {
      await processOrders({
        variables: { idList: idList }
      });
    } else {
      await shipOrders({
        variables: { idList: idList }
      });
    }

    console.log("Status: ", status);
    console.log("UpdateList", pdfData);
    setOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <p>No new visits</p>;
  if (processError) return <ErrorMessage error={processError} />;

  console.log("Data:", data);

  let tableData = [];
  if (data.orders && data.orders.edges) {
    tableData = data.orders.edges.map(p => ({
      id: p.node.id,
      name: `${p.node.user.lastName}, ${p.node.user.firstName}`,
      lastName: p.node.user.lastName,
      firstName: p.node.user.firstName,
      addressOne: p.node.address.addressOne,
      addressTwo: p.node.address.addressTwo,
      cityStateZip: `${p.node.address.city}, ${p.node.address.state} ${p.node.address.zipcode}`,
      birthDate: formatDate(p.node.user.birthDate),
      product: p.node.prescription.product.display,
      productQuantity:
        p.node.prescription.timesPerMonth *
        p.node.prescription.shippingInterval *
        p.node.prescription.product.pillsPerDose,
      productDirections: p.node.prescription.product.directions,
      addon: p.node.prescription.addon ? p.node.prescription.addon.display : "",
      addonQuantity: p.node.prescription.addon
        ? p.node.prescription.addonTimesPerMonth *
          p.node.prescription.shippingInterval *
          p.node.prescription.addon.pillsPerDose
        : 0,
      addonDirections: p.node.prescription.addon
        ? p.node.prescription.addon.directions
        : "",
      approvedDate: formatDate(p.node.prescription.approvedDate),
      refills: p.node.prescription.refillsRemaining,
      startDate: formatDate(p.node.prescription.startDate),
      expireDate: formatDate(p.node.prescription.expireDate)
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
          {status === "PENDING"
            ? "Process Prescriptions"
            : "Ship Prescriptions"}
        </DialogTitle>
        <DialogActions>
          {status === "PENDING" ? (
            <ScriptPdf data={pdfData} handleClick={updateList} />
          ) : (
            <Button onClick={updateList} color="primary">
              Ship Selected Items
            </Button>
          )}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialTable
        title={
          status === "PENDING"
            ? "Prescriptions to be processed"
            : "Prescriptions to be shipped"
        }
        icons={tableIcons}
        columns={[
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Product",
            field: "product"
          },
          {
            title: "Qty",
            field: "productQuantity",
            type: "numeric",
            width: 60,
            sorting: false
          },
          {
            title: "Addon",
            field: "addon"
          },
          {
            title: "Qty",
            field: "addonQuantity",
            type: "numeric",
            sorting: false,
            width: 60
          },
          {
            title: "Approved",
            field: "approvedDate",
            type: "date",
            width: 120
          }
        ]}
        data={tableData}
        options={{
          actionsCellStyle: {
            width: 50,
            backgroundColor: "white"
          },
          selection: true,
          selectionColumnProps: { style: { width: 75 } },
          search: false,
          padding: "dense",
          draggable: false,
          showTextRowsSelected: false,
          tableLayout: "fixed",
          headerStyle: {
            backgroundColor: "#039be5",
            borderRightStyle: "solid",
            borderRightWidth: 1,
            color: "white"
          }
        }}
        actions={[
          {
            tooltip:
              status === "PENDING" ? "Print Prescriptions" : "Ship Packages",
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
