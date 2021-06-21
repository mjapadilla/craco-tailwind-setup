import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { IconPencil } from "../icons";

const FormInputNumber = React.forwardRef((props, ref) => {
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
            <input
              id={_.get(rest, "id") || name}
              type="text"
              autoComplete="none"
              placeholder={label}
              name={name}
              onKeyDown={(e) => {
                const key = e.charCode || e.keyCode || 0;
                if (key !== 190 && key !== 8 && (key < 48 || key > 57)) {
                  e.preventDefault();
                }
              }}
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

FormInputNumber.defaultProps = {
  label: "Name",
  containerClassName: "mb-2 relative",
  labelClassName: "block text-xs font-medium text-gray-500",
  className:
    "mt-1 focus:ring-primary-500 focus:ring-2 block w-full text-gray-500 border border-gray-400 sm:text-sm rounded-md pl-3 pr-12 py-2",
  required: false,
  type: "text",
  error: false,
  withIcon: <IconPencil />,
};

FormInputNumber.propTypes = {
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
};

export default React.memo(FormInputNumber);
