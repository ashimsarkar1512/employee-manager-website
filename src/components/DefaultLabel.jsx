import PropTypes from "prop-types";

function DefaultLabel({ labelName }) {
    return (
      <div className="text-left">
        <label className="font-medium text-lg text-black/[0.7]">{`${labelName}`}</label>
      </div>
    );
  }
  
  DefaultLabel.propTypes = {
    labelName: PropTypes.string,
  };
  
  export default DefaultLabel;