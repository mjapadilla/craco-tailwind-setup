import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _ from 'lodash';

const FormInputSelect = React.forwardRef((props, ref) => {
  const {
    name,
    value,
    label,
    containerClassName,
    labelClassName,
    required,
    options,
    onGetValue,
    error,
    ...rest
  } = props;
  const selectRef = React.useRef(null);

  const handleOnFocus = () => {
    selectRef.current.focus();
  };

  const isMultiValue = () => {
    if (value.length > 0 && _.get(props, 'isMulti')) {
      return value.map((item) => _.get(item, 'label', '')).join(' ');
    }
    return '';
  };

  return (
    <div>
      <div className="w-full relative">
        <div ref={ref} className={containerClassName}>
          {label && (
            <label htmlFor={rest?.id ?? name} className={labelClassName}>
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <Select
            id={rest?.id ?? name}
            placeholder="Select..."
            ref={selectRef}
            classNamePrefix="react-select"
            className="react-select-container"
            openMenuOnFocus
            options={options}
            value={value}
            {...rest}
          />
          {required && (
            <input
              tabIndex={-1}
              autoComplete="off"
              style={{
                opacity: 0,
                width: '100%',
                height: '10px',
                position: 'absolute',
                marginTop: '-10px',
                zIndex: -1,
              }}
              value={
                _.get(props, 'isMulti')
                  ? isMultiValue()
                  : `${_.get(value, 'value', '')}` || ''
              }
              onChange={() => {}}
              onFocus={handleOnFocus}
              required={required}
            />
          )}
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

FormInputSelect.defaultProps = {
  label: 'Name',
  containerClassName: 'mb-2 relative',
  labelClassName: 'block text-xs font-medium text-gray-500 mb-1',
  required: false,
  options: [],
  onGetValue: false,
  error: false,
};

FormInputSelect.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.element,
  ]),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Object),
  ]).isRequired,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.instanceOf(Array),
  onGetValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Function),
  ]),
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.instanceOf(Object),
    PropTypes.bool,
  ]),
};

export default React.memo(FormInputSelect);
