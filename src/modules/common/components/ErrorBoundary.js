import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.warn(error, errorInfo); // eslint-disable-line
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className="fixed bg-white z-50 inset-0 w-screen h-screen bg-opacity-100">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-xl tracking-wide text-gray-500 font-semibold flex items-center gap-1">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
              </svg>{' '}
              Unable to load page.
            </div>
            <span className="text-xs text-gray-500 tracking-wide font-semibold">
              <a href={get(window, 'location.pathname')}>Try again</a>
            </span>
          </div>
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default ErrorBoundary;
