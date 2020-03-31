import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Signature from "../_images/BFsignature.jpg";
import {
  Page,
  Text,
  View,
  Image,
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
    marginTop: 30,
    fontSize: 12,
    fontWeight: 300
  },
  heading: {
    fontSize: 30,
    marginTop: 40,
    fontWeight: "extrabold"
  },
  victoryFooter: {
    marginTop: 25,
    borderBottomStyle: "solid",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 2,
    paddingTop: 1,
    fontSize: 10,
    color: "gray",
    fontWeight: "light"
  },
  doctor: {
    fontSize: 11,
    fontWeight: "bold",
    color: "black"
  },
  victory: {
    borderBottomStyle: "solid",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 20,
    textAlign: "center",
    marginBottom: 0
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
  centered: {
    textAlign: "center"
  },
  phone: {
    marginTop: 6,
    fontSize: 9
  },
  signatureSection: {
    marginTop: "auto",
    marginBottom: 40
  },
  signature: {
    borderStyle: "solid",
    borderColor: "darkgray",
    borderBottomWidth: 1,
    marginBottom: 0,
    paddingTop: 8,
    paddingBottom: 0
  },
  image: {
    width: "50%",
    padding: 0
  },
  centerImage: {
    alignItems: "center",
    flexGrow: 1
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

const PrescriptionFooter = () => (
  <View style={styles.victoryFooter}>
    <View style={styles.victory}>
      <Text>VICTORY MEDICAL & FAMILY CARE</Text>
      <Text style={styles.doctor}>WILLIAM G. FRANKLIN, M.D.</Text>
      <Text>4303 VICTORY DRIVE</Text>
      <Text>AUSTIN, TX 78704</Text>
      <Text style={styles.phone}>(512) 462-3627</Text>
    </View>
  </View>
);

const PatientSection = ({ data }) => {
  const address =
    data.addressOne +
    (data.addressTwo ? " " + data.address.to : "") +
    ", " +
    data.cityStateZip;

  return (
    <View style={styles.patientInfo}>
      <View style={styles.row}>
        <Text style={styles.patientName}>
          {data.firstName} {data.lastName}
        </Text>
        <Text style={styles.push}>DoB: {data.birthDate}</Text>
      </View>
      <Text>{address}</Text>
    </View>
  );
};

const SignatureSection = () => (
  <View style={styles.signatureSection}>
    <View style={styles.signature}>
      <Image src={Signature} style={styles.image} />
    </View>
    <Text>Signature</Text>
  </View>
);

const DrugInfo = ({ data, product, quantity, refills, directions }) => {
  if (!product) return null;

  return (
    <View style={styles.drugSection}>
      <Text style={styles.drug}>{product}</Text>
      <View style={styles.row}>
        <Text>{`Quantity: ${quantity}`}</Text>
        <Text style={styles.push}>Date Rx Written: {data.startDate}</Text>
      </View>
      <View style={styles.row}>
        <Text>{`Refills: ${refills}`}</Text>
        <Text style={styles.push}>Expires on: {data.expireDate}</Text>
      </View>
      <View style={styles.instructions}>
        <Text>{directions}</Text>
      </View>
    </View>
  );
};

const Prescriptions = ({ data }) => {
  console.log("PDF data", data);

  return (
    <>
      {data.map(d => (
        <Page key={d.id} size="A4">
          <PrescriptionFooter />
          <View style={styles.body}>
            <Text style={styles.heading}>Prescription</Text>
            <Text>{d.approvedDate}</Text>

            <PatientSection data={d} />

            <DrugInfo
              data={d}
              product={d.product}
              refills={d.refills}
              quantity={d.productQuantity}
              directions={d.productDirections}
            />

            <DrugInfo
              data={d}
              product={d.addon}
              refills={d.refills}
              quantity={d.addonQuantity}
              directions={d.addonDirections}
            />

            <SignatureSection />
          </View>
        </Page>
      ))}
    </>
  );
};

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
