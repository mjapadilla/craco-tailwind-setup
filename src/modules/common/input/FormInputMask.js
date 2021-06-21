import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import InputMask from "react-input-mask";
import { IconMobile } from "../icons";

const FormInputMask = React.forwardRef((props, ref) => {
  const {
    name,
    label,
    containerClassName,
    labelClassName,
    className,
    required,
    type,
    error,
    withIcon,
    isLowerCase,
    ...rest
  } = props;

  const handleOnFocus = (e) => {
    e.preventDefault();
    document.getElementById(_.get(rest, "id") || name).focus();
  };

  return (
    <div>
      <div className="w-full relative" ref={ref}>
        <div
          className={containerClassName}
          onClick={handleOnFocus}
          role="presentation"
        >
          {label && (
            <label
              className={labelClassName}
              htmlFor={_.get(rest, "id") || name}
            >
              {label} {required ? <span className="text-red-500">*</span> : ""}
            </label>
          )}
          <div className="relative">
            <InputMask
              id={_.get(props, "id") || name}
              type={type}
              autoComplete="off"
              name={name}
              maskChar={null}
              mask="99-99-9999"
              placeholder={label}
              className={className}
              {...rest}
            />
            {withIcon && (
              <span className="absolute right-2 h-full top-0 flex items-center">
                {withIcon}
              </span>
            )}
          </div>
        </div>
        {error && (
          <small className="flex text-xs absolute -bottom-2 right-2 px-2 bg-red-50 rounded text-red-500">
            {error?.message ?? ""}
          </small>
        )}
      </div>
    </div>
  );
});

FormInputMask.defaultProps = {
  label: "Name",
  containerClassName: "mb-2 relative",
  labelClassName: "block text-xs font-medium text-gray-500",
  className:
    "mt-1 focus:ring-primary-500 focus:ring-2 block w-full text-gray-500 border border-gray-400 sm:text-sm rounded-md pl-3 pr-12 py-2 disabled:bg-gray-200",
  required: false,
  type: "text",
  error: false,
  isLowerCase: false,
  withIcon: <IconMobile />,
};

FormInputMask.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.bool,
  ]),
  name: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  withIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.instanceOf(Object),
    PropTypes.bool,
  ]),
  isLowerCase: PropTypes.bool,
};

export default React.memo(FormInputMask);
