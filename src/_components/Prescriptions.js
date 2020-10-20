import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { formatDate, formatPhoneNumber } from "../_helpers";
import Print from "@material-ui/icons/Print";
import { ErrorMessage, ScriptPdf, Loading } from "./";
import { tableIcons } from "./";
import { ORDERLIST, PROCESS_ORDERS, SHIP_ORDERS } from "../Graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  visitBox: {
    flex: 1,
  },
  container: {
    overflow: "auto",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 13,
  },
  detailContainer: {
    padding: "5px 30px",
    fontSize: 13,
    lineHeight: "15px",
    fontWeight: 400,
  },
  address: {
    marginLeft: 67,
  },
}));

const ShowDetail = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.detailContainer}>
      <div>{data.addressOne}</div>
      {data.addressTwo && <div>{data.addressTwo}</div>}
      <div>{data.cityStateZip}</div>
      <div>{data.telephone}</div>
      <br />
      <div>{data.birthDate}</div>
    </div>
  );
};

export const Prescriptions = ({ status }) => {
  const [open, setOpen] = React.useState(false);
  const [pdfData, setPdfData] = useState([]);

  const { data, loading, error } = useQuery(ORDERLIST, {
    variables: { status },
    pollInterval: 2000,
  });

  const [processOrders, { error: processError }] = useMutation(PROCESS_ORDERS);
  //const [createBatch, {error: batchError }] = useMutation(CREATE_BATCH);
  const [shipOrders, { error: shipError }] = useMutation(SHIP_ORDERS);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const updateList = async () => {
    let idList = [];
    idList = pdfData.map((p) => p.id);

    if (status === "PENDING") {
      await processOrders({
        variables: { idList: idList },
      });
    } else {
      await shipOrders({
        variables: { idList: idList },
      });
    }

    setOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <p>No new visits</p>;
  if (processError) return <ErrorMessage error={processError} />;

  let tableData = [];
  let columns = [];
  if (data.orders) {
    tableData = data.orders.map((p) => ({
      id: p.id,
      status: p.status,
      name:
        p.status === "PAYMENT_DECLINED"
          ? `<<< ${p.user.lastName}, ${p.user.firstName} >>>`
          : `${p.user.lastName}, ${p.user.firstName}`,
      lastName: p.user.lastName,
      firstName: p.user.firstName,
      addressOne: p.addressOne,
      addressTwo: p.addressTwo,
      cityStateZip: `${p.city}, ${p.state} ${p.zipcode}`,
      birthDate: formatDate(p.user.birthDate),
      telephone: formatPhoneNumber(p.telephone),
      product:
        p.prescription.type === "SUPPLEMENT" ? p.prescription.product.productName : p.prescription.product.display,
      productQuantity:
        p.prescription.timesPerMonth *
        (p.prescription.shippingInterval === 0 ? 1 : p.prescription.shippingInterval) *
        p.prescription.product.pillsPerDose,
      productDirections: p.prescription.product.directions,
      addon: p.prescription.addon ? p.prescription.addon.display : "",
      addonQuantity: p.prescription.addon
        ? p.prescription.addonTimesPerMonth * p.prescription.shippingInterval * p.prescription.addon.pillsPerDose
        : 0,
      addonDirections: p.prescription.addon ? p.prescription.addon.directions : "",
      approvedDate: formatDate(p.prescription.approvedDate),
      refills: p.prescription.refillsRemaining,
      startDate: formatDate(p.prescription.startDate),
      expireDate: formatDate(p.prescription.expireDate),
      shippedDate: formatDate(p.shipDate),
      nextDelivery: formatDate(p.prescription.nextDelivery),
      trackingNumber: p.trackingNumber,
    }));
    columns.push({ title: "Name", field: "name" });
    columns.push({ title: "Product", field: "product" });
    if (status !== "SHIPPED") {
      columns.push({
        title: "Qty",
        field: "productQuantity",
        type: "numeric",
        width: 60,
        sorting: false,
      });
      columns.push({ title: "Addon", field: "addon" });
      columns.push({ title: "Qty", field: "addonQuantity", type: "numeric", sorting: false, width: 60 });
    } else {
      columns.push({
        title: "Approved",
        field: "approvedDate",
        type: "date",
        width: 120,
      });
      columns.push({ title: "Shipped", field: "shippedDate", type: "date", width: 120 });
      columns.push({ title: "Next", field: "nextDelivery", type: "date", width: 120 });
      columns.push({
        title: "Tracking No",
        field: "trackingNumber",
        render: (rowData) => (
          <a
            href={`https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=${rowData.trackingNumber}%2C&tABt=false`}
            target="_blank"
            rel="noreferrer"
          >
            {rowData.trackingNumber}
          </a>
        ),
      });
    }
  }

  return (
    <div className={classes.container}>
      <Dialog fullScreen={false} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {status === "PENDING" ? "Process Prescriptions" : "Ship Prescriptions"}
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
            ? "Orders to be processed"
            : status === "SHIPPED"
            ? "Shipped Orders"
            : "Orders to be shipped"
        }
        icons={tableIcons}
        columns={columns}
        data={tableData}
        options={{
          //     actionsCellStyle: {
          //       width: 50,
          //       backgroundColor: "white",
          //     },
          actionsColumnIndex: 2,
          selection: true,
          //     selectionColumnProps: { style: { width: 75 } },
          search: false,
          padding: "dense",
          paging: false,
          filtering: false,
          maxBodyHeight: "calc(100vh - 200px)",
          draggable: false,
          showTextRowsSelected: false,
          //          tableLayout: "fixed",
          //          headerStyle: {
          //            backgroundColor: "#039be5",
          //            borderRightStyle: "solid",
          //            borderRightWidth: 1,
          //            color: "white",
          //          },
        }}
        detailPanel={[
          {
            tooltip: "Show Patient Info",
            render: (rowData) => {
              return <ShowDetail data={rowData} />;
            },
          },
        ]}
        actions={[
          {
            tooltip: status === "PENDING" ? "Print Prescriptions" : "Ship Packages",
            icon: () => <Print />,
            onClick: (evt, data) => {
              setPdfData(data);
              setOpen(true);
            },
          },
        ]}
      />
    </div>
  );
};
