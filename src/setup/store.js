import { configureApi } from "react-reqq-lite";
import { toastError } from "modules/common/toast";
import { getFirstMessage, jsUcOnlyFirst } from "modules/common/helper";
import Cookie from "js-cookie";
import history from "./history";

const store = configureApi({
  endpoint: process.env.REACT_APP_END_POINT,
  requestHeaders: () => {
    const token = Cookie.get("_token");
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
    };
  },
  timeout: 180000,
  cacheStorage: "WEBSQL",
  onError: (err) => {
    try {
      const dispatchError = {
        400: () => {
          const message = err?.response?.message;
          toastError(message);
        },
        401: () => {
          const { exp = "", message = "" } = err?.response;
          if (exp === "token expired") {
            toastError("Token expired. Please re-login again");
            history.push("/logout");
            return;
          }

          if (message.indexOf("Bad token") > -1) {
            toastError("Invalid Token. Please re-login again");
            history.push("/logout");
            return;
          }
          toastError(message);
        },
        403: () => {
          const { message } = err?.response;
          toastError(message);
        },
        404: () => {
          const { message } = err?.response;
          toastError(jsUcOnlyFirst(message));
        },
        422: () => {
          const { errors = [] } = err?.response;
          toastError(getFirstMessage(errors));
        },
        429: () => {
          toastError("Too many attempts!");
        },
        500: () => toastError("Unable to communicate with server"),
      };

      return dispatchError[err.status] && dispatchError[err.status]();
    } catch (error) {
      return null;
    }
  },
});

export default store;
