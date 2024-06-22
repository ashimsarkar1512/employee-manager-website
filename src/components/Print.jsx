
import { Document, PDFViewer, Page, Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";

function Print({ item }) {
    const MyDoc = (
      <Document>
        <Page>
          <Text>Company Name: {item?.requester_company}</Text>
          <Text>Asset Name: {item?.asset_name}</Text>
          <Text>Asset Type: {item?.asset_type}</Text>
          <Text>
            REQUESTED DATE: {new Date(item?.request_date).toLocaleDateString()}
          </Text>
          <Text>
            APPROVAL DATE:{" "}
            {item?.approval_date
              ? new Date(item?.approval_date).toLocaleDateString()
              : "Pending"}
          </Text>
          <Text>ASSET REQUESTED BY: {item?.requester_name}</Text>
          <Text>PRINT DATE: {new Date().toLocaleDateString()}</Text>
        </Page>
      </Document>
    );
  
    return (
      <div className="pdf-viewer">
        <PDFViewer width="100%" height="600">
          {MyDoc}
        </PDFViewer>
      </div>
    );
  }
  
  Print.propTypes = {
    item: PropTypes.shape({
      asset_name: PropTypes.string.isRequired,
      asset_type: PropTypes.string.isRequired,
      requester_company: PropTypes.string.isRequired,
      request_date: PropTypes.string.isRequired,
      approval_date: PropTypes.string,
      requester_name: PropTypes.string.isRequired,
    }).isRequired,
  };
  
  export default Print;