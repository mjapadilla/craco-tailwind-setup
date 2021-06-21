import React from "react";
import PropTypes from "prop-types";

function ScreenLoader({ label }) {
  return (
    <div className="w-full h-full bg-white bg-opacity-100 absolute inset-0">
      <div className="flex justify-center items-center h-full bg-opacity-50">
        <div className="text-lg text-gray-500 font-semibold">{label}</div>
      </div>
    </div>
  );
}

ScreenLoader.defaultProps = {
  label: "Loading...",
};

ScreenLoader.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default ScreenLoader;
