import React from 'react';
import PropTypes from 'prop-types';

const Button = React.forwardRef((props, ref) => {
  const { label, isLoading, ...rest } = props;
  return (
    <button ref={ref} type="button" disabled={isLoading} {...rest}>
      {isLoading ? 'Loading...' : label}
    </button>
  );
});

Button.defaultProps = {
  label: 'Name',
  isLoading: false,
};

Button.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.element,
    PropTypes.instanceOf(Function),
  ]),
  isLoading: PropTypes.bool,
};

export default Button;
