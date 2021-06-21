import React from 'react';
import PropTypes from 'prop-types';
import { renderColor } from './constants';

function Loader({ type, timer }) {
  const [pBar, setPBar] = React.useState(100);

  React.useEffect(() => {
    const timeInterval = (timer / 100) * 1;
    const interval = setInterval(() => {
      setPBar(pBar - 1);
    }, timeInterval);
    return () => clearInterval(interval);
  }, [pBar, timer]);

  return (
    <div
      className={`h-1 ${renderColor[`loader-${type}`]}`}
      style={{
        width: `${pBar}%`,
      }}
    />
  );
}
Loader.defaultProps = {};

Loader.propTypes = {
  type: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};

export default Loader;
