import PropTypes from "prop-types";

function PrimaryButton({
  buttonType,
  buttonName,
  buttonTextColor,
  buttonBGColor,
}) {
  return (
    <button
      type={`${buttonType}`}
      className={` px-5 py-2 font-bold font-roboto ${buttonTextColor} ${buttonBGColor}`}
    >{`${buttonName}`}</button>
  );
}

PrimaryButton.propTypes = {
  buttonType: PropTypes.string,
  buttonName: PropTypes.string,
  buttonTextColor: PropTypes.string,
  buttonBGColor: PropTypes.string,
};

export default PrimaryButton;