import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import useApi from '../hooks/useApi';
import noImg from '../unnamed.png';
import imageApi from '../api/image';
import DropZoneArea from './DropZoneArea';
import Preview from './Preview';
import Action from './Action';

export default function DropZone({ addPic }) {
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [dimension, setDimension] = useState('');

  const sendApi = useApi(imageApi.uploadImage);

  const handleCancel = () => {
    setImg(null);
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      console.log('nnnn');
      URL.revokeObjectURL(img);
    },
    [img]
  );

  const handleUpload = async () => {
    if (!img) return;
    const res = await sendApi.request(file, dimension, thumbnail);
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
        <DropZoneArea
          setFile={setFile}
          setImg={setImg}
          setThumbnail={setThumbnail}
        />
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
        <Preview src={img ? img : noImg} setDimension={setDimension} />
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
        <Action
          handleUpload={handleUpload}
          handleCancel={handleCancel}
          disabled={!img || sendApi.loading}
          loading={sendApi.loading}
        />
      </Grid>
    </Grid>
  );
}
