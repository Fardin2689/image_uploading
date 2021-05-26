import { makeStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

import { imageValidator, imageResizer } from '../imageHelper';

const useStyles = makeStyles(() => ({
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'antiquewhite',
    height: '100%',
    color: '#bdbdbd',
    transition: 'border .24s ease-in-out, background .24s ease-in-out',
  },
  acceptStyle: {
    backgroundColor: '#90f0c1',
    color: 'black',
  },
  rejectStyle: {
    backgroundColor: '#fda5b6',
    color: 'black',
  },
}));

function DropZoneArea({ setFile, setImg, setThumbnail }) {
  const classes = useStyles();

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setImg(URL.createObjectURL(acceptedFiles[0]));
    imageResizer(acceptedFiles[0]).then((uri) => setThumbnail(uri));
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: 'image/jpeg, image/png, image/gif',
      maxFiles: 1,
      multiple: false,
      validator: imageValidator,
      onDropAccepted: onDrop,
    });

  const dropZoneClass = clsx({
    [classes.baseStyle]: true,
    [classes.acceptStyle]: isDragAccept,
    [classes.rejectStyle]: isDragReject,
  });

  return (
    <div {...getRootProps({ className: dropZoneClass })}>
      <input {...getInputProps()} />
      {isDragReject ? (
        <em>Only *.jpeg, *.gif and *.png images will be accepted</em>
      ) : isDragAccept ? (
        <em>It's Ok, Drop it.</em>
      ) : (
        <em>Drag 'n' drop some files here, or click to select files.</em>
      )}
    </div>
  );
}

export default DropZoneArea;
