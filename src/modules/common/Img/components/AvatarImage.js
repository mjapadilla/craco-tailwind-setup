import React from 'react';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
// import placeholder from "assets/images/placeholder.svg";

function AvatarImage({ className, name, testSize, src, ...rest }) {
  return (
    <>
      <Avatar
        name={name}
        alt={name}
        className={className}
        textSizeRatio={testSize}
        src={src}
        {...rest}
      />
    </>
  );
}
AvatarImage.defaultProps = {
  className: '',
  name: 'Name',
  testSize: 2,
  src: null,
};

AvatarImage.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string,
  testSize: PropTypes.number,
  src: PropTypes.oneOfType([PropTypes.string]),
};

export default AvatarImage;
