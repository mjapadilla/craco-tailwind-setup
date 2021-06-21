import React from 'react';
import { render } from 'react-dom';
import { renderIconType, renderColor, renderTitle } from './constants';
import Loader from './Loader';

const toastUniqueID = 'geek-toast-marker';

const ToastMarker = (props) => <div id={toastUniqueID} props={props} />;

let toastTimeout = null;

const wait = (t) => new Promise((r) => setTimeout(r, t));

const toast = async (content, options = {}) => {
  let alertRef = null;
  const opt = {
    timeout: 4000,
    title: false,
    divId: 'toast-override',
    position: 'top-right',
    type: 'success',
    ...options,
    content,
  };

  const isInline = !!document.getElementById(opt.divId);
  const rootElement =
    document.getElementById(opt.divId) ||
    document.getElementById(toastUniqueID);
  if (!rootElement) {
    alert('Alert Marker not found!'); // eslint-disable-line
    return;
  }
  const close = async () => {
    if (alertRef) {
      try {
        await wait(700);
        alertRef.className = alertRef.className.replace(
          'toast-entrance',
          'toast-exit'
        );
        await wait(700);
      } catch (error) {
        // do nothing...
      }
    }

    document.body.className = '';
    render(<ToastMarker />, rootElement);
  };
  close();
  await wait(5);
  const renderContent = () => {
    if (typeof opt.content === 'function') return opt.content(close);
    return opt.content;
  };

  const renderToast = () => (
    <div className={`h-full ${renderColor[`bg-${opt?.type}`]}`}>
      <div className="flex text-white relative p-4">
        <div className="flex-shrink-0">
          <svg
            className={`h-8 w-8 ${renderColor[`icon-${opt?.type}`]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            {renderIconType[opt?.type]}
          </svg>
        </div>
        <div className="ml-3">
          <div className={renderColor[`text-${opt?.type}`]}>
            <h3
              className={`text-sm font-medium ${
                renderColor[`title-${opt?.type}`]
              }`}
            >
              {opt?.title ? opt?.title : renderTitle[opt?.type]}
            </h3>
            <div className={`text-sm${opt?.title ? ' mt-2 ' : ''} `}>
              <p>{renderContent()}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <span
            role="presentation"
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            <svg
              className={`w-4 h-4 ${renderColor[`icon-${opt?.type}`]}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
      <Loader type={opt?.type} timer={opt?.timeout} />
    </div>
  );

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    close();
  }, opt.timeout);

  if (isInline) {
    render(renderToast(), rootElement);
    return;
  }

  render(
    <div className={`z-50 fixed w-96 m-h-20 ${opt?.position}`}>
      <div
        // eslint-disable-next-line no-return-assign
        ref={(r) => (alertRef = r)}
        className="shadow-xl h-full w-full rounded-lg overflow-hidden toast-entrance"
      >
        {renderToast()}
      </div>
    </div>,
    rootElement
  );
};

export default ToastMarker;

export const toastSuccess = (content, options) =>
  toast(content, {
    ...options,
    type: 'success',
  });

export const toastWarning = (content, options) =>
  toast(content, {
    ...options,
    type: 'warning',
  });

export const toastInfo = (content, options) =>
  toast(content, {
    ...options,
    type: 'info',
  });

export const toastError = (content, options) =>
  toast(content, {
    ...options,
    type: 'error',
  });
