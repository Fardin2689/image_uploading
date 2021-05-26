import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Grid, Button, ButtonGroup, CircularProgress } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { v1 as uuidv1 } from 'uuid';

import useApi from './hooks/useApi';
import noImg from './unnamed.png';
import imageApi from './api/image';
import { imageValidator, imageResizer } from './imageHelper';

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'antiquewhite',
  height: '100%',
  color: '#bdbdbd',
  transition: 'border .24s ease-in-out, background .24s ease-in-out',
};

const acceptStyle = {
  borderColor: '#00e676',
  backgroundColor: '#90f0c1',
  color: 'black',
};

const rejectStyle = {
  borderColor: '#ff1744',
  backgroundColor: '#fda5b6',
  color: 'black',
};

export default function DropZone({ addPic }) {
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [dimension, setDimension] = useState('');
  const sendApi = useApi(imageApi.uploadImage);

  const onDrop = useCallback((acceptedFiles) => {
    const thumb = URL.createObjectURL(acceptedFiles[0]);
    setImg(thumb);

    const image = new Image();
    image.addEventListener('load', () =>
      setDimension(`${image.width} x ${image.height}`)
    );
    image.src = thumb;

    setFile(acceptedFiles[0]);
    imageResizer(acceptedFiles[0]).then((uri) => setThumbnail(uri));
    // console.log(uri);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: 'image/jpeg, image/png, image/gif',
      maxFiles: 1,
      multiple: false,
      validator: imageValidator,
      onDropAccepted: onDrop,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragReject, isDragAccept]
  );

  const handleCancel = () => {
    URL.revokeObjectURL(img);
    setImg(null);
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(img);
    },
    [img]
  );

  const handleUpload = async () => {
    if (!img) return;
    const item = new FormData();
    const id = uuidv1();
    const uploaded = new Date();
    const { size, type, lastModifiedDate: created } = file;
    item.append('name', id);
    item.append('size', size);
    item.append('type', type);
    item.append('dimension', dimension);
    item.append('created', created);
    item.append('uploaded', uploaded);
    item.append('img', img);
    item.append('thumbnail', thumbnail);
    item.append('file', file, id);

    const res = await sendApi.request(item);
    if (res.ok) addPic(res.data);
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ heigh: '100%', padding: 5 }}
    >
      <Grid item xs={12} sm={8} md={7} style={{ height: 100 }}>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {isDragReject ? (
            <em>Only *.jpeg, *.gif and *.png images will be accepted</em>
          ) : (
            <em>Drag 'n' drop some files here, or click to select files.</em>
          )}
        </div>
      </Grid>

      <Grid
        item
        xs={8}
        sm={4}
        md={3}
        container
        justify="center"
        alignItems="center"
        style={{ height: 100, width: 100 }}
      >
        <img
          src={img ? img : noImg}
          alt={'tile.title'}
          width="auto"
          height="100%"
        />
      </Grid>
      <Grid
        item
        xs={4}
        sm={12}
        md={2}
        container
        justify="center"
        alignItems="center"
        style={{ height: 100, width: 100 }}
      >
        <ButtonGroup orientation="vertical" color="primary" variant="text">
          <Button onClick={handleUpload} disabled={!img || sendApi.loading}>
            {sendApi.loading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
