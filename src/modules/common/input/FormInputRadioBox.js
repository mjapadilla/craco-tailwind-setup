import React from "react";
import PropTypes from "prop-types";

const FormInputRadioBox = React.forwardRef((props, ref) => {
  const { name, label, className, labelClassName, ...rest } = props;

  return (
    <label className="flex justify-center items-center text-sm">
      <input
        type="radio"
        id={name || rest?.id}
        className={className}
        {...ref}
        {...rest}
      />
      {label && (
        <span id={name || rest?.id} className={labelClassName}>
          {label}
        </span>
      )}
    </label>
  );
});

FormInputRadioBox.defaultProps = {
  label: "Radio Name",
  className: "h-4 w-4 text-primary-500 border-gray-300 focus:ring-primary-500",
  labelClassName: "ml-3 font-base text-gray-500",
  name: false,
};

FormInputRadioBox.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.instanceOf(Object),
    PropTypes.bool,
  ]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  labelClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default FormInputRadioBox;
