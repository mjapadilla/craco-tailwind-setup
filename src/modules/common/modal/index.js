import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-reqq-lite';
import { Router } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import store from 'setup/store';
import history from 'setup/history';

export const closeModal = () => {
  const root = document.getElementById('modal-root');
  if (!root) {
    alert('Modal root not found!'); // eslint-disable-line
    return;
  }

  setTimeout(() => {
    document.body.className = '';
    render(<div id="modal-root" />, root);
  }, 200);
};

const renderAlignment = {
  top: 'items-start',
  middle: 'items-center',
  bottom: 'items-end',
};

export const showModal = (options) => {
  const opt = {
    title: '',
    modalSize: 'modal-md',
    titleClassName: '',
    align: renderAlignment[options?.align ?? 'middle'],
    content: 'Modal Body',
    noClose: false,
    noEscButton: true,
    titleContainer: true,
    isFocusTrap: true,
    onCloseCallback: false,
    containerClassName: 'bg-white px-4 py-5 sm:p-6 rounded-lg',
    ...options,
  };

  const root = document.getElementById('modal-root');

  let dialogRef;
  const setDialogRef = (ref) => {
    dialogRef = ref;
  };
  let backgroundRef;
  const setBackgroundRef = (ref) => {
    backgroundRef = ref;
  };

  const prevClassName = document.body.className;
  const prevElem = document.activeElement;
  document.body.className = 'overflow-hidden';

  const onClose = () => {
    try {
      dialogRef.classList.add('exit');
      setBackgroundRef.classList.add('exit');
      if (opt.onCloseCallback) {
        opt.onCloseCallback();
      }
    } catch (err) {
      // do nothing...
    }
    setTimeout(() => {
      document.body.className = prevClassName;
      render(<div id="modal-root" />, root);
      setTimeout(() => {
        try {
          prevElem.blur();
        } catch (err) {} // eslint-disable-line
      }, 100);
    }, 200);
  };

  const modalContent = <div>{opt.content(onClose)}</div>;

  const escFunction = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  document.addEventListener('keydown', escFunction, false);

  render(
    <Provider store={store}>
      <Router history={history}>
        <div
          ref={setDialogRef}
          className="fixed z-50 inset-0 overflow-y-auto modal px-6 md:px-0"
        >
          {!opt?.noEscButton && (
            <button
              type="button"
              onClick={onClose}
              className="fixed top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
            >
              <svg
                className="fill-current text-white"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
              <span className="text-sm">(Esc)</span>
            </button>
          )}
          <div className={`flex justify-center min-h-screen ${opt.align}`}>
            <div
              className={`inline-block align-bottom bg-white rounded-lg shadow-xl sm:my-8 ${opt.modalSize}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className={`${opt.containerClassName}`}>
                <div className={`${opt.titleClassName}`}>
                  <div
                    className={`flex ${
                      opt.title ? 'justify-between' : 'justify-end'
                    }`}
                  >
                    {opt.title && (
                      <p className="text-xl text-gray-600 font-bold mb-2">
                        {opt?.title}
                      </p>
                    )}
                    {!opt.noClose && (
                      <div className="relative">
                        <button
                          type="button"
                          tabIndex="-1"
                          className="absolute -top-2 -right-2 rounded-full transition duration-300 east-in-out group border-2 border-gray-400 hover:border-primary-600 hover:bg-primary-600 outline-none"
                          onClick={onClose}
                        >
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 transition duration-300 east-in-out text-gray-400 group-hover:text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {opt.isFocusTrap ? (
                  <FocusTrap
                    focusTrapOptions={{
                      allowOutsideClick: () => true,
                    }}
                  >
                    {modalContent}
                  </FocusTrap>
                ) : (
                  modalContent
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          ref={backgroundRef}
          className="fixed inset-0 transition-opacity z-40"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      </Router>
    </Provider>,
    root
  );
};

export const ModalMarker = () => <div id="modal-root" />;

export const showAlert = (options) => {
  const root = document.getElementById('alert-root');
  if (!root) {
    alert('Alert root not found!'); // eslint-disable-line
    return;
  }

  const opt = {
    title: '',
    isLoading: false,
    isFocusTrap: false,
    modalSize: 'modal-sm',
    titleClassName: '',
    align: 'justify-center flex items-center',
    content: 'Confirmation Message',
    buttonContainerClassName: 'flex justify-center gap-2 mt-4',
    onYes: (close) => {
      close();
    },
    onYesLabel: 'Yes',
    onYesClassName: 'btn primary px-8 w-full',
    onNo: (close) => {
      close();
    },
    onNoLabel: 'No',
    onNoClassName: 'btn light px-8 w-full',
    ...options,
  };

  let dialogRef;
  const setDialogRef = (ref) => {
    dialogRef = ref;
  };
  let backgroundRef;
  const setBackgroundRef = (ref) => {
    backgroundRef = ref;
  };

  const prevClassName = document.body.className;
  const prevElem = document.activeElement;
  document.body.className = 'overflow-hidden';

  const onClose = () => {
    try {
      dialogRef.classList.add('exit');
      setBackgroundRef.classList.add('exit');
      if (opt.onCloseCallback) {
        opt.onCloseCallback();
      }
    } catch (err) {
      // do nothing...
    }
    setTimeout(() => {
      document.body.className = prevClassName;
      render(<div id="alert-root" />, root);
      setTimeout(() => {
        try {
          prevElem.blur();
        } catch (err) {} // eslint-disable-line
      }, 100);
    }, 200);
  };

  const handleYes = () => {
    opt.onYes(onClose);
    setTimeout(() => {
      try {
        prevElem.blur();
      } catch (err) {} // eslint-disable-line
    }, 100);
  };
  const handleNo = () => {
    opt.onNo(onClose);
    setTimeout(() => {
      try {
        prevElem.blur();
      } catch (err) {} // eslint-disable-line
    }, 100);
  };

  const escFunction = (e) => {
    if (e.keyCode === 27) {
      onClose();
      prevElem.blur();
    }
  };

  document.addEventListener('keydown', escFunction, false);

  const renderContent = () => {
    if (typeof opt.content === 'function') return opt.content(onClose);
    if (typeof opt.content === 'string')
      return <div className="px-3">{opt.content}</div>;
    return 'n/a';
  };

  render(
    <Provider store={store}>
      <Router history={history}>
        <div
          ref={setDialogRef}
          className="fixed z-50 inset-0 overflow-y-auto modal px-6 md:px-0"
        >
          <div className={`flex justify-center min-h-screen ${opt.align}`}>
            <div
              className={`inline-block align-bottom bg-white rounded-lg shadow-xl sm:my-8 ${opt.modalSize}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 py-5 sm:p-6 rounded-lg">
                {opt.isFocusTrap ? (
                  <FocusTrap
                    focusTrapOptions={{
                      allowOutsideClick: () => true,
                    }}
                  >
                    {renderContent()}
                  </FocusTrap>
                ) : (
                  renderContent()
                )}
                <div className={opt.buttonContainerClassName}>
                  {opt.onNoLabel && (
                    <button
                      className={opt.onNoClassName}
                      type="button"
                      onClick={handleNo}
                    >
                      {opt.onNoLabel}
                    </button>
                  )}
                  {opt.onYesLabel && (
                    <button
                      className={opt.onYesClassName}
                      type="button"
                      onClick={handleYes}
                      disabled={opt.isLoading}
                    >
                      {opt.onYesLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={backgroundRef}
          className="fixed inset-0 transition-opacity z-40"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      </Router>
    </Provider>,
    root
  );
};

export const AlertMarker = () => <div id="alert-root" />;
