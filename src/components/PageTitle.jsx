import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";

function PageTitle({ title }) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>{`trinet | ${title}`}</title>
        </Helmet>
      </HelmetProvider>
    );
  }
  
  PageTitle.propTypes = {
    title: PropTypes.string,
  };
  
  export default PageTitle;