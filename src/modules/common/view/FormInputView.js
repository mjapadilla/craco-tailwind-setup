import React from "react";
// import _ from 'lodash';
import PropTypes from "prop-types";

function FormInputView({
  value,
  label,
  containerClassName,
  className,
  labelClassName,
}) {
  return (
    <div className={containerClassName}>
      <span className={labelClassName}>{label}</span>
      <div className={className}>{value}</div>
    </div>
  );
}
FormInputView.defaultProps = {
  label: "Name",
  containerClassName: "mb-2",
  labelClassName: "block text-xs font-medium text-gray-500",
  className:
    "mt-1 focus:ring-primary-500 focus:ring-2 block w-full text-gray-500 border border-gray-400 sm:text-sm rounded-md pl-3 pr-12 py-2 disabled:bg-gray-50",
  value: "--",
};

FormInputView.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.bool,
  ]),
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
};

export default FormInputView;
