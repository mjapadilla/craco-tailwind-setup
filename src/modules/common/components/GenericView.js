import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import moment from "moment";

const ViewContext = React.createContext();

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateIfDate = (value, isDate) => {
  if (isDate) {
    return moment(value, moment.ISO_8601, true).format("ll");
  }
  return value;
};

export const ViewItem = ({
  label,
  name,
  labelClassName,
  className,
  isDate,
}) => {
  const { data, labelWidth, trClassName } = React.useContext(ViewContext);
  const val = typeof data[name] === "undefined" ? "-" : data[name];
  const value =
    typeof name === "function" ? name(data) : validateIfDate(val, isDate);

  return (
    <tr
      className={cn({
        [`${trClassName}`]: trClassName,
      })}
    >
      <td className={labelClassName} width={labelWidth}>
        <span>{label}</span>
      </td>
      <td
        className={cn("text-sm text-gray-500 pr-2 py-2", {
          [`${className}`]: className,
          capitalize: !validateEmail(value),
        })}
      >
        {(!value || typeof value === "object") && typeof name !== "function" ? (
          <span>&nbsp;</span>
        ) : (
          value
        )}
      </td>
    </tr>
  );
};

ViewItem.defaultProps = {
  labelClassName: "text-xs text-gray-400 pl-2 py-1.5",
  className: false,
  isDate: false,
  label: "",
};

ViewItem.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.instanceOf(Function),
    PropTypes.element,
  ]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  labelClassName: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isDate: PropTypes.bool,
};

function GenericView({ data, labelWidth, trClassName, children }) {
  return (
    <ViewContext.Provider value={{ data, labelWidth, trClassName }}>
      <div className="relative w-full h-full">
        <table className="table-auto w-full h-full">
          <tbody>{children}</tbody>
        </table>
      </div>
    </ViewContext.Provider>
  );
}

GenericView.defaultProps = {
  children: null,
  labelWidth: "auto",
  trClassName: false,
  data: {},
};

GenericView.propTypes = {
  data: PropTypes.instanceOf(Object),
  children: PropTypes.instanceOf(Object),
  trClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  labelWidth: PropTypes.string,
};

export default GenericView;
