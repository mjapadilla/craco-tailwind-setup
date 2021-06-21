import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import placeholder from "assets/images/placeholder.svg";
import { showModal } from "modules/common/modal";

const IconView = () => (
  <svg
    className="h-5 w-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const IconLoader = () => (
  <svg className="animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

function ViewImage({
  src,
  defaultSrc,
  height,
  containerClassName,
  withLightBox,
  className,
}) {
  const [url, setUrl] = React.useState(src || defaultSrc);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [srcError, setSrcError] = React.useState(false);

  const handleError = () => {
    setSrcError(true);
    setTimeout(() => {
      setUrl(defaultSrc);
    }, 300);
  };

  const handleLoad = () => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 300);
  };

  const handleOnViewImage = (e) => {
    e.preventDefault();
    showModal({
      title: false,
      modalSize: "modal-md 2xl:modal-lg",
      containerClassName: "p-5 bg-white",
      noClose: true,
      noEscButton: false,
      isFocusTrap: false,
      content: () => (
        <div className="space-y-4">
          <img src={url} alt="" className="object-cover w-full h-full" />
        </div>
      ),
    });
  };

  React.useEffect(() => {
    setUrl(src);
  }, [src]);

  return (
    <div
      className={cn("group relative w-full overflow-hidden", {
        [`${containerClassName}`]: containerClassName,
        "bg-gray-100": !containerClassName,
      })}
    >
      {!imageLoaded && (
        <div className="absolute h-full w-full">
          <div className="flex h-full w-full justify-center items-center">
            <div className="w-4 h-4">
              <IconLoader />
            </div>
          </div>
        </div>
      )}
      {imageLoaded && !srcError && src !== "" && (
        <div
          role="presentation"
          className="cursor-pointer absolute h-full w-full transition duration-300 opacity-0 group-hover:opacity-100 group-hover:bg-primary-500 group-hover:bg-opacity-75"
          onClick={withLightBox ? handleOnViewImage : () => {}}
        >
          <div className="flex h-full w-full justify-center items-center text-white text-sm font-medium">
            <IconView /> View Image.
          </div>
        </div>
      )}
      <img
        src={url}
        alt=""
        className={cn("w-full", {
          invisible: !imageLoaded,
          visible: imageLoaded,
          [`${height}`]: height,
          [`${className}`]: className,
        })}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

ViewImage.defaultProps = {
  height: "h-auto",
  src: "",
  containerClassName: false,
  className: "object-fit",
  withLightBox: true,
  defaultSrc: placeholder, // "https://via.placeholder.com/128?text=Img",
};

ViewImage.propTypes = {
  height: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  src: PropTypes.string,
  defaultSrc: PropTypes.string,
  containerClassName: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  withLightBox: PropTypes.bool,
};

export default ViewImage;
