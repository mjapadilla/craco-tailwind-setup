import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Loading = (
  <svg
    className="animate-spin h-4 w-4 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const renderHeader = (col) => {
  try {
    return typeof col.label === 'function' ? col.label() : _.get(col, 'label');
  } catch (error) {
    return '';
  }
};

const getCell = (item, col, i) => {
  try {
    return typeof col.key === 'function'
      ? col.key(item, i)
      : _.get(item, col.key);
  } catch (err) {
    return '';
  }
};

const getStyle = (item, col) => {
  try {
    return typeof col.style === 'function'
      ? _.assign(
          {},
          col.style(item) || {},
          col.width ? { width: col.width } : {}
        )
      : _.assign({}, col.style || {}, col.width ? { width: col.width } : {});
  } catch (error) {
    return {};
  }
};

const getStyleHeader = (col) => {
  try {
    return _.assign(
      {},
      col.styleHeader || {},
      col.width ? { width: col.width } : {}
    );
  } catch (error) {
    return {};
  }
};

function GenericTable({
  data,
  format,
  id,
  isLoading,
  showHeader,
  theadClassName,
  // eslint-disable-next-line no-unused-vars
  minHeight,
  // eslint-disable-next-line no-unused-vars
  height,
  noRowsLabel,
  selectedKey,
  onSelectRow,
  selected,
  pagination,
  trClassName,
  tbodyClassName,
  tClassName,
  containerClassName,
}) {
  const [rows, setRows] = React.useState([]);

  const handleSelectRow = (value) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSelectRow) {
      onSelectRow(value);
    }
  };

  React.useEffect(() => {
    if (!isLoading) {
      setRows(data);
    }
  }, [data, isLoading]);

  return (
    <div className="relative w-full h-full">
      {rows.length > 0 && isLoading && (
        <div className="flex justify-center z-10">
          <span className="absolute gap-2 flex justify-center items-center font-medium bg-gray-50 bg-opacity-50 px-2 py-1 rounded top-1/2 text-lg text-gray-500">
            {Loading} Loading...
          </span>
        </div>
      )}
      {rows.length === 0 && isLoading && (
        <div className="flex justify-center z-10">
          <span className="absolute gap-2 flex justify-center items-center font-medium bg-gray-50 bg-opacity-50 px-2 py-1 rounded top-1/2 text-lg text-gray-500">
            {Loading} Please wait...
          </span>
        </div>
      )}
      {rows.length < 1 && (
        <div className="flex justify-center z-10">
          <span className="absolute flex justify-center items-center top-1/2 text-md text-gray-400">
            {!isLoading && noRowsLabel}
          </span>
        </div>
      )}
      <div
        className={`overflow-x-auto h-full w-full${
          containerClassName ? ` ${containerClassName}` : ''
        }`}
      >
        <table
          className={`table-auto h-full w-full${
            tClassName ? ` ${tClassName}` : ''
          }`}
        >
          {showHeader && (
            <thead
              className={`flex bg-gray-100 text-gray-500 text-left w-full${
                theadClassName ? ` ${theadClassName}` : ''
              }`}
            >
              <tr className="flex w-full h-full">
                {format.map((col) => (
                  <th
                    key={col.label}
                    className={`font-medium px-3 py-2${
                      _.get(col, 'thClassName')
                        ? ` ${_.get(col, 'thClassName')}`
                        : ''
                    }`}
                    style={{
                      width: `${100 / format.length}%`,
                      ...getStyleHeader(col),
                    }}
                  >
                    {renderHeader(col)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody
            id={id}
            className={`flex flex-col items-center overflow-y-auto w-full${
              tbodyClassName ? ` ${tbodyClassName}` : ''
            }`}
            style={{
              minHeight,
              height,
            }}
          >
            {rows.length < 1 ? (
              <tr />
            ) : (
              rows.map((item, i) => {
                const isSelected =
                  `${selected}` === `${_.get(item, selectedKey)}`;
                const key = item[selectedKey];

                const getClassName = () =>
                  isSelected ? ` bg-gray-300 text-white font-bold$` : '';

                const current_page = _.get(pagination, 'current_page', 0);
                const per_page = _.get(pagination, 'per_page', 0);

                return (
                  <tr
                    key={key}
                    className={`flex w-full items-center cursor-pointer${getClassName()}${
                      trClassName ? ` ${trClassName}` : ''
                    }`}
                    onClick={onSelectRow ? handleSelectRow(item) : () => {}}
                  >
                    {format.map((col) => {
                      const { className = false } = col;
                      if (col.key === '_count') {
                        return (
                          <td
                            key={`${key}-${col.label}`}
                            className={`px-3 py-2${
                              className ? ` ${className}` : ''
                            }`}
                            style={{
                              width: `${100 / format.length}%`,
                              ...getStyle(item, col),
                            }}
                          >
                            <span className="font-semibold">
                              {(current_page - 1) * per_page + i + 1}.
                            </span>
                          </td>
                        );
                      }
                      return (
                        <td
                          key={`${key}-${col.label}`}
                          className={`px-3 py-2${
                            className ? ` ${className}` : ''
                          }`}
                          style={{
                            width: `${100 / format.length}%`,
                            ...getStyle(item, col),
                          }}
                        >
                          {getCell(item, col)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

GenericTable.defaultProps = {
  data: [],
  format: [],
  id: '',
  isLoading: false,
  showHeader: true,
  tClassName: false,
  theadClassName: false,
  trClassName: false,
  tbodyClassName: false,
  onSelectRow: false,
  minHeight: '300px',
  height: '',
  noRowsLabel: 'There are no records found.',
  selectedKey: 'id',
  selected: '',
  pagination: false,
  containerClassName: false,
};

GenericTable.propTypes = {
  data: PropTypes.instanceOf(Array),
  id: PropTypes.string,
  format: PropTypes.instanceOf(Array),
  isLoading: PropTypes.bool,
  showHeader: PropTypes.bool,
  selectedKey: PropTypes.string,
  selected: PropTypes.string,
  containerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  tClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  theadClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  trClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  tbodyClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  noRowsLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onSelectRow: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Object),
  ]),
};

export default React.memo(GenericTable);
