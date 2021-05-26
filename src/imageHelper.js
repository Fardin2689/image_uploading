import Resizer from 'react-image-file-resizer';

export const getSize = (s) => {
  return s >= 1024 * 1024
    ? `${(s / (1024 * 1024)).toFixed(2)} MB`
    : s >= 1024
    ? `${(s / 1024).toFixed(2)} KB`
    : `${s} B`;
};

export const getImgFromBuff = (buffer, type) => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const str = window.btoa(binary);
  return `data:${type};base64,${str}`;
};

export const imageValidator = (file) => {
  const maxLength = 20;
  const maxSize = 3 * 1024 * 1024;
  if (file.name.length > maxLength) {
    return {
      code: 'name-too-large',
      message: `Name is larger than ${maxLength} characters`,
    };
  }
  if (file.size > maxSize) {
    return {
      code: 'size-too-big',
      message: 'Filesize is bigger than 3MB',
    };
  }
  return null;
};

export const imageResizer = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(file, 150, 150, 'JPEG', 100, 0, (uri) => {
      resolve(uri);
    });
  });
