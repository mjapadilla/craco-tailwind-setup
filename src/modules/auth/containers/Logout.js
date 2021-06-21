import { debounce } from "lodash";
import { closeModal } from "modules/common/modal";
import React from "react";
import { useHistory } from "react-router-dom";
import * as actions from "../actions";

const logout = debounce(() => {
  closeModal();
  actions.logout();
  sessionStorage.clear();
}, 500);

function Logout() {
  const history = useHistory();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      logout();
    }, 1000);
    return () => {
      history.push("/");
      clearInterval(timer);
    };
  }, [history]);

  return (
    <div className="fixed bg-white z-50 inset-0 w-screen h-screen bg-opacity-100">
      <div className="flex flex-col justify-center items-center h-full">
        <span className="text-xl tracking-wide text-gray-500 font-semibold">
          Signing out.
        </span>
        <span className="text-xs text-gray-500 tracking-wide font-semibold">
          Please wait...
        </span>
      </div>
    </div>
  );
}

Logout.propTypes = {};

export default Logout;
