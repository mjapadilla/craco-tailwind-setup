import React from "react";
import Select from "react-select";
import BaseDatePicker from "react-datepicker";
import moment from "moment";
import PropTypes from "prop-types";

const IconCalendar = () => (
  <svg
    className="h-5 w-5 text-gray-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

const generateArrayOfYears = (range) => {
  const max = new Date().getFullYear();
  const min = max - range;
  const years = [];

  for (let i = max; i >= min; i -= 1) {
    years.push(i);
  }
  return years;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCostomeHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <div className="px-3">
    <span className="w-full text-sm font-semibold ">
      {moment(date).format("llll")}
    </span>
    <div className="mt-3  flex justify-center">
      <div className="w-1/2 pr-1">
        <button
          type="button"
          className="font-semibold w-1/6"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
        >
          &lt;
        </button>
        <select
          value={date.getFullYear()}
          className="w-5/6"
          onChange={(e) => changeYear(e?.target?.value)}
          onBlur={(e) => changeYear(e?.target?.value)}
        >
          {generateArrayOfYears(20).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/2 ml-1">
        <select
          value={months[date.getMonth()]}
          className="w-5/6"
          onChange={(e) => changeMonth(months.indexOf(e?.target?.value))}
          onBlur={(e) => changeMonth(months.indexOf(e?.target?.value))}
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="font-semibold w-1/6"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
);

const filterWithHourlyOptions = [
  {
    value: "hourly",
    label: "Hourly",
  },
  {
    value: "daily",
    label: "Daily",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
];

const filterWithYearlyOptions = [
  {
    value: "monthly",
    label: "Yearly",
  },
  {
    value: "daily",
    label: "Monhtly",
  },
  {
    value: "hourly",
    label: "Daily",
  },
];

const defaultFormat = "YYYY-MM-DD";

function DateTypeFilter({ onChange, defualtValue, withHourly }) {
  const [filter, setFilter] = React.useState(defualtValue);

  const handleOnChangeSelect = (e) => {
    const currentStartDate = filter?.start_date || null;
    const currentEndDate = filter?.end_date || null;

    const args = {
      hourly: {
        start_date: currentStartDate ? moment().format(defaultFormat) : "",
        end_date: currentEndDate ? moment().format(defaultFormat) : "",
      },
      daily: {
        start_date: currentStartDate
          ? moment().startOf("month").format(defaultFormat)
          : "",
        end_date: currentEndDate
          ? moment().endOf("month").format(defaultFormat)
          : "",
      },
      monthly: {
        start_date: currentStartDate
          ? moment().startOf("year").format(defaultFormat)
          : "",
        end_date: currentEndDate
          ? moment().endOf("year").format(defaultFormat)
          : "",
      },
    };

    setFilter({
      ...args[e?.value],
      filter_by: e,
    });
    onChange({
      ...args[e?.value],
      filter_by: e,
    });
  };

  const renderDateType = React.useMemo(() => {
    const handleOnChangeDate = (e) => {
      const args = {
        hourly: {
          ...filter,
          start_date: moment(e, defaultFormat).format(defaultFormat),
          end_date: moment(e, defaultFormat).format(defaultFormat),
        },
        daily: {
          ...filter,
          start_date: moment(e, defaultFormat)
            .startOf("month")
            .format(defaultFormat),
          end_date: moment(e, defaultFormat)
            .endOf("month")
            .format(defaultFormat),
        },
        monthly: {
          ...filter,
          start_date: moment(e, defaultFormat)
            .startOf("year")
            .format(defaultFormat),
          end_date: moment(e, defaultFormat)
            .endOf("year")
            .format(defaultFormat),
        },
      };
      setFilter(args[filter?.filter_by?.value]);
      onChange(args[filter?.filter_by?.value]);
    };

    const dispatchDateType = {
      hourly: (
        <>
          <BaseDatePicker
            className="focus:ring-primary-500 focus:ring-2 block w-full border border-gray-300 sm:text-sm rounded-md px-3 py-2"
            popperPlacement="bottom-end"
            onChange={handleOnChangeDate}
            selected={filter?.start_date ? new Date(filter?.start_date) : ""}
            dateFormat="MMMM d, yyyy"
            placeholderText="MMM DD, YYYY"
            renderCustomHeader={renderCostomeHeader}
          />
          <span className="absolute top-0 right-0 h-full flex items-center px-2">
            <IconCalendar />
          </span>
        </>
      ),
      daily: (
        <>
          <BaseDatePicker
            className="focus:ring-primary-500 focus:ring-2 block w-full border border-gray-300 sm:text-sm rounded-md px-3 py-2"
            popperPlacement="bottom-end"
            onChange={handleOnChangeDate}
            selected={filter?.start_date ? new Date(filter?.start_date) : ""}
            dateFormat="MMMM yyyy"
            placeholderText="MMMM YYYY"
            showMonthYearPicker
          />
          <span className="absolute top-0 right-0 h-full flex items-center px-2">
            <IconCalendar />
          </span>
        </>
      ),
      monthly: (
        <>
          <BaseDatePicker
            className="focus:ring-primary-500 focus:ring-2 block w-full border border-gray-300 sm:text-sm rounded-md px-3 py-2"
            popperPlacement="bottom-end"
            onChange={handleOnChangeDate}
            selected={filter?.start_date ? new Date(filter?.start_date) : ""}
            dateFormat="yyyy"
            placeholderText="YYYY"
            showYearPicker
            yearItemNumber={12}
          />
          <span className="absolute top-0 right-0 h-full flex items-center px-2">
            <IconCalendar />
          </span>
        </>
      ),
    };

    return dispatchDateType[filter?.filter_by.value];
  }, [filter, onChange]);

  const loadOptions = React.useMemo(() => {
    if (withHourly) {
      return filterWithHourlyOptions;
    }
    return filterWithYearlyOptions;
  }, [withHourly]);

  return (
    <div className="flex gap-4">
      <div className="w-28">
        <Select
          placeholder="Date Type"
          options={loadOptions}
          name="monitoring_log_type"
          value={filter?.filter_by}
          classNamePrefix="react-select"
          className="react-select-container"
          onChange={handleOnChangeSelect}
        />
      </div>
      <div className="w-36 relative">{renderDateType}</div>
    </div>
  );
}
DateTypeFilter.defaultProps = {
  defualtValue: {},
  withHourly: true,
};

DateTypeFilter.propTypes = {
  onChange: PropTypes.instanceOf(Function).isRequired,
  defualtValue: PropTypes.instanceOf(Object),
  withHourly: PropTypes.bool,
};

export default DateTypeFilter;
