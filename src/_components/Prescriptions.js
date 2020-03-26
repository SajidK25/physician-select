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
import { ORDERLIST, PROCESS_ORDERS, SHIP_ORDERS } from "../Graphql";

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

  const { data, loading, error } = useQuery(ORDERLIST, {
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
  if (data.orders) {
    tableData = data.orders.map(p => ({
      id: p.id,
      status: p.status,
      name: `${p.user.lastName}, ${p.user.firstName}`,
      lastName: p.user.lastName,
      firstName: p.user.firstName,
      addressOne: p.address.addressOne,
      addressTwo: p.address.addressTwo,
      cityStateZip: `${p.address.city}, ${p.address.state} ${p.address.zipcode}`,
      birthDate: formatDate(p.user.birthDate),
      product: p.prescription.product.display,
      productQuantity:
        p.prescription.timesPerMonth *
        p.prescription.shippingInterval *
        p.prescription.product.pillsPerDose,
      productDirections: p.prescription.product.directions,
      addon: p.prescription.addon ? p.prescription.addon.display : "",
      addonQuantity: p.prescription.addon
        ? p.prescription.addonTimesPerMonth *
          p.prescription.shippingInterval *
          p.prescription.addon.pillsPerDose
        : 0,
      addonDirections: p.prescription.addon
        ? p.prescription.addon.directions
        : "",
      approvedDate: formatDate(p.prescription.approvedDate),
      refills: p.prescription.refillsRemaining,
      startDate: formatDate(p.prescription.startDate),
      expireDate: formatDate(p.prescription.expireDate)
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
