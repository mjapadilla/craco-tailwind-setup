import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import _ from "lodash";
import InputMask from "react-input-mask";
import moment from "moment";
import { toastWarning } from "modules/common/toast";
import { jsUcOnlyFirst } from "../helper";

const IconCalendar = (props) => (
  <svg
    // eslint-disable-next-line
    className={`h-5 w-5 ${props.className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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

const renderDateFormat = (withTime) => {
  if (withTime) {
    return "MMM DD, YYYY / hh:mm A";
  }
  return "MMM DD, YYYY";
};

const formatDate = (date, def = "", format = "MMM DD, YYYY") => {
  try {
    const endDate = moment(date, format).format(format);

    if (_.isEmpty(date) && date === "") {
      return endDate === "";
    }

    if (endDate === "Invalid date") {
      toastWarning("Entered date is invalid.");
    }
    const newDate = endDate === "Invalid date" ? "" : endDate;

    return newDate;
  } catch (error) {
    return def;
  }
};

const CustomRender = React.forwardRef(({ onClick, disabled }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    tabIndex="-1"
    disabled={disabled}
    className="flex items-center focus:outline-none disabled:pointer-events-none"
  >
    <IconCalendar className="text-gray-500 hover:text-primary-700" />
  </button>
));

CustomRender.propTypes = {
  onClick: PropTypes.instanceOf(Function),
  disabled: PropTypes.bool,
};

CustomRender.defaultProps = {
  disabled: false,
  onClick: () => {},
};

function FormInputDate({
  containerClassName,
  labelClassName,
  name,
  label,
  maxDate,
  minDate,
  withTime,
  disabled,
  required,
  value,
  openToDate,
  className,
  onChange,
  onGetValue,
  range,
  error,
  placeholder,
  ...props
}) {
  const [selectedDate, setSelectedDate] = React.useState("");
  const customRenderRef = React.useRef();

  const handleUpdateActual = (e) => {
    const newVal = formatDate(
      e.target.value,
      selectedDate,
      renderDateFormat(withTime)
    );
    const formatedNewVal = moment(newVal, "MMM DD, YYYY hh:mm A").format(
      "YYYY-MM-DD"
    );
    const formatedMaxDate = moment(maxDate).format("YYYY-MM-DD");
    const formatedMinDate = moment(minDate).format("YYYY-MM-DD");

    if (
      newVal !== "" &&
      formatedNewVal < formatedMaxDate &&
      formatedNewVal >= formatedMinDate
    ) {
      const newDate = withTime
        ? moment(newVal, "MMM DD, YYYY hh:mm A").format("YYYY-MM-DD hh:mm A")
        : formatedNewVal;

      if (onGetValue) {
        onGetValue(newDate);
        return;
      }

      if (onChange) {
        onChange((state) => ({ ...state, [name]: newDate }));
      }
      return;
    }

    if (newVal !== "" && newVal) {
      toastWarning("Entered date is out of scope.");
    }

    setSelectedDate("");
    if (onGetValue) {
      onGetValue("");
      return;
    }
    if (onChange) {
      onChange((state) => ({ ...state, [name]: "" }));
    }
  };

  const handleChangePicker = (e) => {
    try {
      const newDate = withTime
        ? moment(e, "MMM DD, YYYY hh:mm A").format("YYYY-MM-DD hh:mm A")
        : moment(e, "MMM DD, YYYY hh:mm A").format("YYYY-MM-DD");

      if (onGetValue) {
        onGetValue(newDate);
        return;
      }

      if (onChange) {
        onChange((state) => ({ ...state, [name]: newDate }));
      }
    } catch (err) {
      // do nothing
    }
  };

  const handleChangeInput = (e) => {
    setSelectedDate(e.target.value);
  };

  const renderPlaceHolder = (placeholderData) => {
    if (placeholderData) {
      return placeholderData;
    }
    return withTime ? "MMM DD, YYYY / hh:mm a" : "MMM DD, YYYY";
  };

  React.useEffect(() => {
    if (value) {
      const val = moment(value, "YYYY-MM-DD hh:mm A").format(
        "MMM DD, YYYY / hh:mm A"
      );
      const newVal = formatDate(val, "", renderDateFormat(withTime));
      setSelectedDate(newVal);
      return;
    }
    setSelectedDate("");
  }, [value, withTime]);

  return (
    <div>
      <div className="w-full relative">
        <div className={containerClassName}>
          {label && (
            <label htmlFor={name} className={labelClassName}>
              {label} {required ? <span className="text-red-500">*</span> : ""}
            </label>
          )}
          <div className="relative">
            <InputMask
              onChange={handleChangeInput}
              onBlur={handleUpdateActual}
              maskChar={null}
              autoComplete="none"
              className={className}
              disabled={disabled}
              mask={withTime ? "aaa 99, 9999 / 99:99 aa" : "aaa 99, 9999"}
              placeholder={renderPlaceHolder(placeholder)}
              value={jsUcOnlyFirst(selectedDate || "")}
            />
            <div className="absolute top-2 right-2 outline-none">
              <DatePicker
                id={_.get(props, "id") || name}
                autoComplete="none"
                disabled={disabled}
                maxDate={maxDate}
                timeIntervals={15}
                selected={value ? new Date(value) : ""}
                onChange={handleChangePicker}
                openToDate={
                  !_.isEmpty(value) ? new Date(selectedDate) : openToDate
                }
                minDate={minDate}
                showTimeSelect={withTime}
                timeFormat="hh:mm aa"
                customInput={<CustomRender ref={customRenderRef} />}
                popperPlacement="top-end"
                renderCustomHeader={({
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
                      {moment(date, "YYYY-MM-DD").format("llll")}
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
                          onChange={(e) => changeYear(_.get(e, "target.value"))}
                          onBlur={(e) => changeYear(_.get(e, "target.value"))}
                        >
                          {generateArrayOfYears(range).map((option) => (
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
                          onChange={(e) =>
                            changeMonth(
                              months.indexOf(_.get(e, "target.value"))
                            )
                          }
                          onBlur={(e) =>
                            changeMonth(
                              months.indexOf(_.get(e, "target.value"))
                            )
                          }
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
                )}
                {...props}
              />
            </div>
          </div>
        </div>
        {error && (
          <small className="flex text-xxs text-red-500 -mt-1 absolute -bottom-2 right-2 bg-red-50 px-1 rounded">
            {error?.message ?? ""}
          </small>
        )}
      </div>
    </div>
  );
}

FormInputDate.defaultProps = {
  disabled: false,
  withTime: false,
  required: false,
  maxDate: new Date("3000-01-01"),
  minDate: new Date("1900-01-01"),
  openToDate: new Date(),
  label: "Date",
  value: "",
  containerClassName: "mb-2 relative",
  labelClassName: "block text-xs font-medium text-gray-500",
  className:
    "mt-1 focus:ring-primary-500 text-gray-500 focus:outline-none focus:ring-2 block w-full border border-gray-400 sm:text-sm rounded-md px-3 py-2",
  onGetValue: false,
  onChange: false,
  error: false,
  placeholder: false,
  range: 50,
};

FormInputDate.propTypes = {
  disabled: PropTypes.bool,
  withTime: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.element,
  ]),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  openToDate: PropTypes.instanceOf(Date),
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.oneOfType([
    PropTypes.instanceOf(Function),
    PropTypes.bool,
  ]),
  onGetValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Function),
    PropTypes.bool,
  ]),
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.instanceOf(Object),
    PropTypes.bool,
  ]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  range: PropTypes.number,
};

export default React.memo(FormInputDate);
