import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { IconMail, IconEye, IconEyeHide } from '../icons';

const FormInput = React.forwardRef((props, ref) => {
  const {
    name,
    label,
    withShowPassword,
    containerClassName,
    labelClassName,
    className,
    required,
    type,
    error,
    withIcon,
    isLowerCase,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleOnFocus = (e) => {
    e.preventDefault();
    document.getElementById(_.get(rest, 'id') || name).focus();
  };

  const handleOnShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderClassName = () => {
    if (isLowerCase || type === 'password') {
      return '';
    }
    if (type === 'email') {
      return '';
    }
    return 'uppercase';
  };

  return (
    <div>
      <div className="w-full relative">
        <div
          className={containerClassName}
          onClick={handleOnFocus}
          role="presentation"
        >
          {label && (
            <label
              className={labelClassName}
              htmlFor={_.get(rest, 'id') || name}
            >
              {label} {required ? <span className="text-red-500">*</span> : ''}
            </label>
          )}
          <div className="relative">
            <input
              id={_.get(rest, 'id') || name}
              type={
                withShowPassword
                  ? `${showPassword ? 'text' : 'password'}`
                  : type
              }
              autoComplete="none"
              placeholder={label}
              name={name}
              className={`${className} ${renderClassName()}`}
              {...ref}
              {...rest}
            />
            {withIcon && (
              <>
                {withShowPassword && type === 'password' ? (
                  <span
                    onClick={handleOnShowPassword}
                    role="presentation"
                    className="cursor-pointer absolute right-2 h-full top-0 flex items-center"
                  >
                    {showPassword ? <IconEyeHide /> : <IconEye />}
                  </span>
                ) : (
                  <span className="absolute right-2 h-full top-0 flex items-center">
                    {withIcon}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        {error && (
          <small className="flex text-xs absolute -bottom-2 right-2 px-2 bg-red-50 rounded text-red-500">
            {error?.message ?? ''}
          </small>
        )}
      </div>
    </div>
  );
});

FormInput.defaultProps = {
  label: 'Name',
  containerClassName: 'mb-2 relative',
  labelClassName: 'block text-xs font-medium text-gray-500',
  className:
    'mt-1 focus:ring-primary-500 focus:ring-2 block w-full text-gray-500 border border-gray-400 sm:text-sm rounded-md pl-3 pr-12 py-2 disabled:bg-gray-200',
  required: false,
  type: 'text',
  error: false,
  isLowerCase: false,
  withIcon: <IconMail />,
  withShowPassword: false,
};

FormInput.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.bool,
  ]),
  withShowPassword: PropTypes.bool,
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
  isLowerCase: PropTypes.bool,
};

export default React.memo(FormInput);
