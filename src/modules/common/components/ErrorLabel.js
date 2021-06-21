import React from "react";
import PropTypes from "prop-types";

function ErrorLabel({ error }) {
  return (
    <>
      {error && (
        <small className="flex text-xs px-2 bg-red-50 rounded text-red-500">
          {error?.message ?? ""}
        </small>
      )}
    </>
  );
}

ErrorLabel.defaultProps = {
  error: false,
};

ErrorLabel.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.instanceOf(Object),
    PropTypes.bool,
  ]),
};

export default ErrorLabel;
