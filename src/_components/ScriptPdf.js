import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const Script = ({ data }) => {
  return (
    <Document>
      {data.map(d => (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{d.name}</Text>
          </View>
          <View style={styles.section}>
            <Text>{d.product}</Text>
            <Text>{d.addon}</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export const ScriptPdf = ({ data }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<Script data={data} />}
        fileName="somename.pdf"
        onClick={() => console.log("I clicked!")}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Save File"
        }
      </PDFDownloadLink>
    </div>
  );
};
