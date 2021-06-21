import React from 'react';
import { useHistory } from 'react-router-dom';

function Page404() {
  const history = useHistory();
  const handleOnClick = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="w-full h-full bg-white bg-opacity-100">
      <div className="flex flex-col justify-center items-center h-full">
        <div>
          <span className="text-lg text-gray-500 font-medium flex items-center gap-1">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
            </svg>
            (Error: 404) Page not found.
          </span>
        </div>
        <button
          type="button"
          onClick={handleOnClick}
          className="text-gray-500 text-base hover:underline mt-2"
        >
          Return to previous page
        </button>
      </div>
    </div>
  );
}

Page404.propTypes = {};

export default Page404;
