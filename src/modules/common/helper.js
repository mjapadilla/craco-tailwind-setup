import React from "react";
import Cookie from "js-cookie";
import moment from "moment";
import axios from "axios";
import { isEmpty, forOwn, get, omitBy, isNil, debounce, assign } from "lodash";
import { toastError, toastWarning } from "./toast";

export const objectToUpperCase = (params) => {
  const newObjt = {};
  Object.keys(params).map((item) => {
    const x = "";
    newObjt[item] =
      params[item] && typeof params[item] === "string"
        ? `${params[item].toUpperCase()}`
        : params[item];
    return x;
  });
  return newObjt;
};

export const stringToUpperCase = (string) => {
  if (!isNil(string) && typeof string === "string") {
    return string.toUpperCase();
  }
  return "";
};

export const jsUcFirst = (string) =>
  (string || "")
    .toLowerCase()
    .replace(new RegExp("(?:\\b|_)([a-z])", "g"), (e) => e.toUpperCase());

export const jsUcOnlyFirst = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const parseNumber = (str, default_value = false) => {
  const v = parseFloat(`${str}`.replace(/,/g, ""));
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(v)) return typeof default_value !== "boolean" ? default_value : str;
  return v;
};

export const formatNumber = (v, decimal = 2) => {
  try {
    const n = parseNumber(v);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(n)) return v;
    return n.toLocaleString(undefined, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
  } catch (err) {
    return v;
  }
};

export const formatDate = (date, format = "mm/dd/yyyy", defaultValue = "-") => {
  if (!date) return defaultValue;
  const d = new Date(date);
  if (d.toString() === "Invalid Date") return defaultValue;
  return moment(d).format(format);
};

export const transformIncluded = (x, included) => {
  if (!included || isEmpty(included)) return x;
  const rowIncluded = {};
  forOwn(x.relationships, (v, k) => {
    rowIncluded[k] = Array.isArray(v.data)
      ? v.data.map(
          (z) =>
            included.find(
              (y) => y.type === get(z, "type") && y.id === get(z, "id")
            ) || {}
        )
      : included.find(
          (y) => y.type === get(v, "data.type") && y.id === get(v, "data.id")
        ) || {};
  });
  const { links, relationships, type, ...rest } = x;
  return { ...rest, included: rowIncluded };
};

export const storage = {
  get: (key, defaultValue = false) => {
    try {
      return JSON.parse(sessionStorage.getItem(key)) || defaultValue;
    } catch (err) {
      return defaultValue;
    }
  },
  set: (key, value) => {
    const newValue = JSON.stringify(value);
    sessionStorage.setItem(key, newValue);
  },
  remove: (key) => {
    sessionStorage.removeItem(key);
  },
};

export const transformIncludedDeep = (x, included) => {
  if (!included || isEmpty(included)) return x;
  const rowIncluded = {};
  forOwn(x.relationships, (v, k) => {
    rowIncluded[k] = Array.isArray(v.data)
      ? v.data.map((z) =>
          transformIncludedDeep(
            included.find(
              (y) => y.type === get(z, "type") && y.id === get(z, "id")
            ) || {},
            included
          )
        )
      : transformIncludedDeep(
          included.find(
            (y) => y.type === get(v, "data.type") && y.id === get(v, "data.id")
          ) || {},
          included
        );
  });
  const { links, relationships, type, ...rest } = x;
  return { ...rest, included: rowIncluded };
};

export const removeNull = (obj) =>
  omitBy(obj, (x) => typeof x === "undefined" || x === null);

export const removeEmpty = (obj) => omitBy(obj, (x) => isEmpty(`${x}`));

export const getEllipsis = (str, count = 120) =>
  str.length > count ? `${str.substring(0, count)}...` : str;

export const generateArrDate = (date_from, date_to, type) => {
  const renderType = {
    day: "ll",
    month: "MMM, YYYY",
    year: "YYYY",
  };

  const dates = [];
  const dateRange = moment(date_to).diff(moment(date_from), type);
  for (let i = 0; i <= dateRange; i += 1) {
    dates.push(moment(date_from).add(i, type).format(renderType[type]));
  }
  return dates;
};

export const getFirstMessage = (data) => {
  if (!data) return "";
  let firstMessage = "";
  let x = 0;

  Object.keys(data).map((i) => {
    if (x === 0) {
      firstMessage =
        get(data[i], "details") ||
        get(data[i], "detail") ||
        get(data[i], "message") ||
        get(data[i], "0");
    }
    x += 1;
    return x;
  });

  return jsUcFirst(firstMessage);
};

export const usePersistState = (key, state, isClearable = true) => {
  const [value, setValue] = React.useState(storage.get(key) || state);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateState = React.useCallback(
    debounce((newState) => {
      storage.set(key, newState);
    }, 200),
    []
  );

  React.useEffect(() => {
    updateState(value);
  }, [key, updateState, value]);

  React.useEffect(
    () => () => {
      if (isClearable) {
        storage.remove(key);
      }
    },
    [isClearable, key]
  );

  return [value, setValue];
};

export const queryParams = (params) =>
  Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");

export const downloadGet = ({ url, filename, params, callBack = () => {} }) => {
  try {
    const token = Cookie.get("_token");

    fetch(`${process.env.REACT_APP_END_POINT}${url}?${queryParams(params)}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const temp_url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = temp_url;
        a.download = `${filename}.csv` || "filename.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        callBack();
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
        toastError("Unable to process request!");
      });
  } catch (err) {
    toastError("Unable to process request!");
  }
};

export const isDesktop = () =>
  !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const padBounds = (bounds, padding = 0.2) => {
  const x1 = bounds[0];
  const y1 = bounds[1];
  const x2 = bounds[2];
  const y2 = bounds[3];

  // const x_center = (((x1 + x2) - x1) / 2) + x1;
  // const y_center = (((y1 + y2) - y1) / 2) + y1;
  // const w_padded = (x2 - x1) * padding;
  // const h_padded = (y2 - y1) * padding;
  // const size = w_padded > h_padded ? w_padded : h_padded;

  // const new_x1 = Math.floor(x_center - (size / 2));
  // const new_y1 = Math.floor(y_center - (size / 2));
  // const new_x2 = Math.floor(x_center + (size / 2)) - new_x1;
  // const new_y2 = Math.floor(y_center + (size / 2)) - new_y1;

  const new_x1 = Math.floor(x1 - x2 * padding);
  const new_y1 = Math.floor(y1 - y2 * padding);
  const new_x2 = Math.floor(x2 + x2 * padding * 2);
  const new_y2 = Math.floor(y2 + y2 * padding * 2);

  return {
    x: new_x1,
    y: new_y1,
    w: new_x2,
    h: new_y2,
  };
};

export const autoCropFace = async (ucare_url) => {
  try {
    const res = await axios.get(`${ucare_url}detect_faces/`);
    const face = get(res, "data.faces.0") || [];
    if (isEmpty(face)) {
      toastWarning("Unable to crop automatically. No face detected.");
      return ucare_url;
    }
    const { x, y, w, h } = padBounds(face);
    return `${ucare_url}-/crop/${w}x${h}/${x},${y}/-/preview/`;
  } catch (err) {
    toastWarning("Unable to crop automatically. Crop error!");
    return ucare_url;
  }
};

export const convertArrayToObject = (array, key) =>
  array.reduce((acc, curr) => {
    acc[curr[key]] = curr;
    return acc;
  }, {});

export const replaceAllString = (str, target, replacement = "") => {
  if (!str) return "";
  const x = str.replaceAll(target, replacement);
  return x;
};

export const insertUpdateObjectToList = (list = [], data = {}, id = "id") => {
  const newList = list.map((item) => {
    if (`${data[id]}` !== `${item[id]}`) return item;
    return assign({}, item, data);
  });

  return newList;
};

export const insertNewObjectToList = (
  list = [],
  data = {},
  position = "end"
) => {
  if (position === "start") {
    return [data].concat(list);
  }
  return list.concat([data]);
};

export const removeObjectToList = (list = [], id, target_id = "id") => {
  let newList = [];
  newList = list.filter((item) => `${item[target_id]}` !== `${id}`);
  return newList;
};

export const formatedSelectOption = (
  list = [],
  value = "id",
  label = "name",
  isLabelUpperCase = true,
  isValueUpperCase = false
) => {
  const newData = [];
  list.forEach((item) => {
    newData.push({
      value: isValueUpperCase
        ? get(item, `${value}`).toUpperCase()
        : get(item, `${value}`),
      label: isLabelUpperCase
        ? get(item, `${label}`).toUpperCase()
        : get(item, `${label}`),
      data: item,
    });
  });
  return newData;
};

export const groupAndSumArray = (list, groupKeys, sumKeys) =>
  Object.values(
    list.reduce((acc, curr) => {
      const group = groupKeys.map((k) => curr[k]).join("-");
      acc[group] = {
        ...{
          ...(acc[group] ||
            Object.fromEntries(
              groupKeys
                .map((k) => [k, curr[k]])
                .concat(sumKeys.map((k) => [k, 0]))
            )),
        },
        data: curr,
      };

      // eslint-disable-next-line no-return-assign
      sumKeys.forEach((k) => (acc[group][k] += curr[k]));
      return acc;
    }, {})
  );

export const objectToString = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    return "";
  }
};

export const stringToObject = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return "";
  }
};
