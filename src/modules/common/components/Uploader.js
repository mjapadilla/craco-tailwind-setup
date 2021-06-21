import React from 'react';
import PropTypes from 'prop-types';
import uploadcare from 'uploadcare-widget';
import { autoCropFace } from '../helper';

const localizeUrl = (file) => {
  const arr = file.name.split('.');
  const extension = arr.pop();
  const filename = arr.join('.').replace(/[^a-zA-Z0-9_]/g, '');
  const newFilename = `${filename}.${extension}`;
  return `https://photo.url.ph/${file.uuid}/${newFilename}`;
};

const wait = (t) => new Promise((r) => setTimeout(r, t));

function Uploader({
  className,
  icon,
  label,
  tabs,
  crop,
  isLoading,
  validateUpload,
  onChange,
  autoFocus,
  useOriginalFormat,
  withCustomLoader,
  id,
  disabled,
}) {
  const [isUploading, setUploading] = React.useState(false);
  const [isCropping, setIsCropping] = React.useState(false);
  const [progressCount, setProgressCount] = React.useState(0);

  const imagesOnly = (fileInfo) => {
    const { isImage, mimeType } = fileInfo;
    if (isImage === false) {
      validateUpload();
      setUploading(false);
      setProgressCount(0);
      throw new Error('image');
    }

    if (['image/gif'].indexOf(mimeType) > -1) {
      validateUpload();
      setUploading(false);
      setProgressCount(0);
      throw new Error('image');
    }
  };

  const handleProgress = ({ state, progress }) => {
    if (state === 'uploading') {
      setUploading(true);
      setProgressCount(Math.ceil(progress * 100));
    }
    if (state === 'uploaded') {
      setUploading(true);
      setProgressCount(100);
    }

    if (state === 'ready') {
      isLoading(false);
      setUploading(false);
      setProgressCount(0);
    }
  };

  const handleDone = async (data) => {
    if (crop === 'face') {
      setIsCropping(true);
      const newUrl = await autoCropFace(data.originalUrl);
      setIsCropping(false);
      onChange({
        ...data,
        cdnUrl: newUrl,
      });
      return;
    }
    if (!useOriginalFormat) {
      setUploading(true);
      await wait(5000);
      setUploading(false);
    }
    const newData = useOriginalFormat
      ? data
      : {
          ...data,
          cdnUrl: localizeUrl(data),
        };
    onChange(newData);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    uploadcare
      .openDialog(null, {
        publicKey: process.env.REACT_APP_UPLOADCARE_KEY,
        tabs,
        crop: crop === 'face' ? false : crop,
        imagesOnly: true,
        validators: [imagesOnly],
      })
      .done((file) => {
        isLoading(true);
        file.progress(handleProgress).done(handleDone);
      });
  };

  const Progress = () => {
    if (isUploading) {
      return <span className="mr-1">({progressCount}%)</span>;
    }
    return <span />;
  };

  return (
    <button
      type="button"
      id={id}
      onClick={handleUpload}
      className={className}
      disabled={disabled}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
    >
      <>
        {withCustomLoader ? (
          <>{!isUploading ? icon : withCustomLoader}</>
        ) : (
          <div className="flex items-center">
            {!isUploading && icon}
            {isUploading ? (
              <span className="text-sm">
                <Progress /> Uploading...
              </span>
            ) : (
              <span>
                {isCropping && <span className="text-sm">Cropping...</span>}
                {label && !isCropping && (
                  <div className="inline-block ml-1 text-sm">{label}</div>
                )}
              </span>
            )}
          </div>
        )}
      </>
    </button>
  );
}

Uploader.defaultProps = {
  label: 'Upload Photo',
  crop: 'free',
  icon: <i className="inline-block fa fa-image mr-2" />,
  tabs: ['file', 'url', 'camera'],
  validateUpload: () => {},
  onChange: () => {},
  isLoading: () => {},
  className: 'btn primary',
  autoFocus: false,
  useOriginalFormat: true,
  withCustomLoader: false,
  id: 'uploaded_photo',
  disabled: false,
};

Uploader.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  tabs: PropTypes.instanceOf(Array),
  crop: PropTypes.string,
  isLoading: PropTypes.instanceOf(Function),
  validateUpload: PropTypes.instanceOf(Function),
  onChange: PropTypes.instanceOf(Function),
  autoFocus: PropTypes.bool,
  useOriginalFormat: PropTypes.bool,
  withCustomLoader: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.element,
  ]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};

export default Uploader;
