import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions } from '@material-ui/core';
import { DialogContent, DialogTitle } from '@material-ui/core';

import imageApi from '../api/image';
import useApi from '../hooks/useApi';
import { getImgFromBuff } from '../imageHelper';
import { Loading } from './Loading';

export default function ShowImageDialog({ data, handleClose }) {
  const [img, setImg] = useState(null);
  const sendApi = useApi(imageApi.getImageById);

  const getImage = async () => {
    const res = await sendApi.request(data.id);
    if (res.ok) {
      const pic = getImgFromBuff(res.data.file.data, data.type);
      setImg(pic);
    }
  };
  useEffect(() => {
    getImage();
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>{data.name}</DialogTitle>
      <DialogContent>
        {sendApi.loading ? (
          <Loading />
        ) : (
          <img
            src={img}
            alt={''}
            style={{ height: '100%', width: '100%' }}
          ></img>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
