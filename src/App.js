import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import DropZone from './DropZone';

import useApi from './hooks/useApi';
import imageApi from './api/image';
import CTable from './CTable';
import ShowImageDialog from './components/ShowImageDialog';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  main: {
    flexGrow: 1,
    backgroundColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();
  const [pic, setPic] = useState([]);
  const [dialog, setDialog] = useState({ open: false });
  const sendApi = useApi(imageApi.getImages);

  const getData = async () => {
    const res = await sendApi.request();
    if (res.ok) setPic(res.data);
  };

  const addPic = (newPic) => setPic([...pic, newPic]);

  const delPic = (name) => setPic(pic.filter((el) => el.name !== name));

  const handleShowImage = (name, id, type) => {
    setDialog({ open: true, name, id, type });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Upload Photos
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <main className={classes.main}>
        <DropZone addPic={addPic} />
        <CTable
          loading={sendApi.loading}
          data={pic}
          delPic={delPic}
          handleShowImage={handleShowImage}
        />
      </main>
      {dialog.open && (
        <ShowImageDialog
          data={dialog}
          handleClose={() => setDialog({ open: false })}
        />
      )}
    </div>
  );
}
