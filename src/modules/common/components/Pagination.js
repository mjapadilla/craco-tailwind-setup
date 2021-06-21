import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ onChange, value, small, disabled }) {
  const prevElem = document.activeElement;

  const handlePrev = () => {
    const newPage = value.current_page - 1;
    if (newPage <= 0) return;
    prevElem.blur();
    onChange(newPage);
  };
  const handleNext = () => {
    const newPage = value.current_page + 1;
    if (newPage > value.last_page) return;
    prevElem.blur();
    onChange(newPage);
  };

  return (
    <div className="flex justify-between items-center">
      {!small ? (
        <div className="text-gray-500 text-sm">{value.total || 0} item(s)</div>
      ) : (
        <div className="text-gray-500 text-xs">{value.total || 0} item(s)</div>
      )}
      <div className="btn-group flex items-center">
        <button
          className="btn xs border border-gray-400 rounded"
          type="button"
          onClick={handlePrev}
          disabled={disabled}
        >
          <svg
            className="h-4 w-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {!small && <span>Prev</span>}
        </button>
        {!small ? (
          <button
            className="btn xs border border-gray-400 rounded text-gray-500"
            type="button"
            disabled={disabled}
          >
            <span className="text-xs font-medium">
              {value.current_page || 1} of {value.total_pages || 1}
            </span>
          </button>
        ) : (
          <button
            className="btn xs border border-gray-400 rounded text-gray-500"
            type="button"
            disabled={disabled}
          >
            <span className="text-xs font-medium">
              {value.current_page || 1}/{value.total_pages || 1}
            </span>
          </button>
        )}
        <button
          className="btn xs border border-gray-400 rounded"
          type="button"
          onClick={handleNext}
          disabled={disabled}
        >
          {!small && <span>Next</span>}
          <svg
            className="h-4 w-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Object),
  small: PropTypes.bool,
  disabled: PropTypes.bool,
};

Pagination.defaultProps = {
  onChange: () => {},
  value: {
    page: 1,
    last_page: 1,
    total: 1,
  },
  small: false,
  disabled: false,
};

export default Pagination;
