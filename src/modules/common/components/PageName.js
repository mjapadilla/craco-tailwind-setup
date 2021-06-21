import React from "react";
import PropTypes from "prop-types";

function PageName({ name }) {
  return (
    <h4 className="text-secondary-600 text-lg xl:text-xl font-medium">
      {name}
    </h4>
  );
}

PageName.defaultProps = {
  name: "Page Name",
};

PageName.propTypes = {
  name: PropTypes.string,
};

export default PageName;
