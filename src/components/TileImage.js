import React, { useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  imageContainer: {
    width: '100%',
    paddingTop: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
}));

function TileImage({ src }) {
  const classes = useStyles();
  const [hasMoreWidthThanHeight, setHasMoreWidthThanHeight] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const img = useRef();

  const onLoad = useCallback(() => {
    setHasMoreWidthThanHeight(
      img.current.naturalHeight < img.current.naturalWidth
    );
    setHasLoaded(true);
  }, [img, setHasLoaded, setHasMoreWidthThanHeight]);

  return (
    <div className={classes.imageContainer}>
      <img
        style={{
          width: hasMoreWidthThanHeight ? '100%' : 'auto',
          height: hasMoreWidthThanHeight ? 'auto' : '100%',
          display: hasLoaded ? 'block' : 'none',
        }}
        ref={img}
        className={classes.image}
        onLoad={onLoad}
        src={src}
        alt=""
      />
    </div>
  );
}

export default TileImage;
