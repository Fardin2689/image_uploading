import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import imageApi from '../api/image';

const getImgFromBuff = (buffer, type) => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const str = window.btoa(binary);
  return `data:${type};base64,${str}`;
};

export default function ShowImageDialog({ data, handleClose }) {
  const [img, setImg] = useState(null);

  const getImage = async () => {
    const res = await imageApi.getImageById(data.id);
    if (res.ok) {
      const pic = getImgFromBuff(res.data.file.data, data.type);
      setImg(pic);
      console.log(res);
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
        <img src={img} alt={''} style={{ height: '100%', width: '100%' }}></img>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
