import PropTypes from "prop-types";

function DefaultInput({ inputType, inputName, inputPlaceholder }) {
    return (
      <input
        required
        type={`${inputType}`}
        name={`${inputName}`}
        placeholder={`${inputPlaceholder}`}
        className="w-full p-2 border rounded-md text-black font-normal text-base focus:outline-none"
      />
    );
  }
  
  DefaultInput.propTypes = {
    inputType: PropTypes.string,
    inputName: PropTypes.string,
    inputPlaceholder: PropTypes.string,
  };
  
  export default DefaultInput;