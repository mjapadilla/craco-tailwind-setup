import React from 'react';
import PropTypes from 'prop-types';

// This is component is need tailwind 2.2 version to work

function PopUp({
  children,
  render,
  id,
  autoClose,
  buttonClassName,
  positionClassName,
  sizeClassName,
  closePopUp,
  withClose,
}) {
  const [animate, setAnimate] = React.useState(false);
  const [isShow, setIfShow] = React.useState(false);

  const handleOnClick = (e) => {
    e.preventDefault();
    if (!isShow) {
      setIfShow(true);
      setTimeout(() => {
        setAnimate(true);
      }, 100);
      return;
    }
    setAnimate(false);
    setTimeout(() => {
      setIfShow(false);
    }, 100);
  };

  React.useEffect(() => {
    let x;
    if (closePopUp) {
      setAnimate(false);
      setTimeout(() => {
        setIfShow(false);
      }, 100);
    }
    return () => {
      clearTimeout(x);
    };
  }, [closePopUp]);

  React.useEffect(() => {
    const handleClearToggle = (e) => {
      try {
        const elem = document.getElementById(id);
        const alertElem = document.getElementById('alert-root');
        const modalElem = document.getElementById('modal-root');
        if (
          e.target !== elem &&
          !elem.contains(e.target) &&
          !alertElem.contains(e.target) &&
          !modalElem.contains(e.target)
        ) {
          setAnimate(false);
          setTimeout(() => {
            setIfShow(false);
          }, 100);
        }
      } catch (error) {
        // do nothing...
      }
    };

    if (autoClose && isShow) {
      document.addEventListener('click', handleClearToggle, false);
    }
    return () => {
      document.removeEventListener('click', handleClearToggle, false);
    };
  }, [autoClose, id, isShow]);

  React.useEffect(() => {
    const escFunction = (e) => {
      if (e.keyCode === 27) {
        setAnimate(false);
        setTimeout(() => {
          setIfShow(false);
        }, 100);
      }
    };

    if (!autoClose && isShow) {
      document.addEventListener('keydown', escFunction, false);
    }
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [autoClose, isShow]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={buttonClassName}
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleOnClick}
        >
          <span className="sr-only">Open options</span>
          {render}
        </button>
      </div>
      {isShow && (
        <div
          id={id}
          className={`${positionClassName} ${sizeClassName} absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform z-40 ${
            !animate ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
          role="menu"
        >
          {withClose && (
            <button
              type="button"
              onClick={handleOnClick}
              className="absolute right-0 top-0 p-2"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

PopUp.defaultProps = {
  children: {},
  id: 'option-menu',
  render: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  ),
  autoClose: false,
  buttonClassName:
    'bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500',
  positionClassName: 'origin-top-right right-0',
  sizeClassName: 'w-56',
  closePopUp: false,
  withClose: false,
};

PopUp.propTypes = {
  children: PropTypes.instanceOf(Object),
  render: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.instanceOf(Function),
  ]),
  id: PropTypes.string,
  autoClose: PropTypes.bool,
  buttonClassName: PropTypes.string,
  positionClassName: PropTypes.string,
  sizeClassName: PropTypes.string,
  closePopUp: PropTypes.bool,
  withClose: PropTypes.bool,
};

export default PopUp;
