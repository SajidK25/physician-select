import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";

const useStyles = makeStyles(theme => ({
  button: {
    textAlign: "center",
    color: theme.palette.primary,
    textDecoration: "none"
  }
}));

// Create styles
const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 100,
    fontSize: 12,
    fontWeight: 300
  },
  heading: {
    fontSize: 28,
    fontWeight: 600
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 4
  },
  patientInfo: {
    borderStyle: "solid",
    borderColor: "lightgray",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
  instructions: {
    borderStyle: "solid",
    borderColor: "lightgray",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 25,
    paddingTop: 8,
    paddingBottom: 8
  },
  patientName: {
    fontSize: 18,
    fontWeight: 600
  },
  push: {
    marginLeft: "auto"
  },
  drug: {
    fontSize: 18,
    fontWeight: 600,
    paddingBottom: 8
  },
  signature: {
    borderStyle: "solid",
    borderColor: "darkgray",
    borderTopWidth: 1,
    marginTop: 60,
    marginBottom: 15,
    paddingTop: 8,
    paddingBottom: 8
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4"
  }
});

const Report = ({ data }) => (
  <Page size="A4">
    <View style={styles.section}>
      {data.map(d => (
        <Text key={d.id}>
          {d.name} {d.product} {d.addon}
        </Text>
      ))}
    </View>
  </Page>
);

const Prescriptions = ({ data }) => (
  <>
    {data.map(d => (
      <Page key={d.id} size="A4">
        <View style={styles.body}>
          <Text style={styles.heading}>Prescription</Text>
          <Text>{d.approvedDate}</Text>

          <View style={styles.patientInfo}>
            <View style={styles.row}>
              <Text style={styles.patientName}>{d.name}</Text>
              <Text style={styles.push}>DoB: 09/09/1959</Text>
            </View>
            <Text>352 Ambroise, Newport Coast, CA 71803</Text>
          </View>

          <View style={styles.drugSection}>
            <Text style={styles.drug}>{d.product}</Text>
            <View style={styles.row}>
              <Text>Quantity: 8</Text>
              <Text style={styles.push}>Date Rx Written: 03/17/2020</Text>
            </View>
            <View style={styles.row}>
              <Text>Refills: 11</Text>
              <Text style={styles.push}>Expires on: 03/17/2021</Text>
            </View>
            <View style={styles.instructions}>
              <Text>Instructions for Romeo go here.</Text>
            </View>
          </View>

          <View style={styles.drugSection}>
            <Text style={styles.drug}>{d.addon}</Text>
            <View style={styles.row}>
              <Text>Quantity: 30</Text>
              <Text style={styles.push}>Date Rx Written: 03/17/2020</Text>
            </View>
            <View style={styles.row}>
              <Text>Refills: 11</Text>
              <Text style={styles.push}>Expires on: 03/17/2021</Text>
            </View>
            <View style={styles.instructions}>
              <Text>Take three capsules by mouth daily.</Text>
            </View>
          </View>
          <View style={styles.signature}>
            <Text>Signature</Text>
          </View>
        </View>
      </Page>
    ))}
  </>
);

// Create Document Component
const Script = ({ data }) => {
  return (
    <Document>
      <Prescriptions data={data} />
    </Document>
  );
};

export const ScriptPdf = ({ data, handleClick }) => {
  const classes = useStyles();

  return (
    <Button color="primary" onClick={handleClick}>
      <PDFDownloadLink
        document={<Script data={data} />}
        fileName="somename.pdf"
        className={classes.button}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Process Prescriptions"
        }
      </PDFDownloadLink>
    </Button>
  );
};
