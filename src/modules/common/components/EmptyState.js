import React from 'react';
import PropTypes from 'prop-types';

function EmptyState({ label }) {
  return (
    <div className="w-full h-full bg-white bg-opacity-50">
      <div className="flex justify-center items-center h-full bg-opacity-50">
        <span className="text-lg text-gray-500 font-semibold">{label}</span>
      </div>
    </div>
  );
}
EmptyState.defaultProps = {
  label: 'No data found.',
};

EmptyState.propTypes = {
  label: PropTypes.string,
};

export default EmptyState;
