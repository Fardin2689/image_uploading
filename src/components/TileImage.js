import React, { useState, useRef, useCallback } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
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
};

function SelfAligningImage(props) {
  const { classes, src, roundedBorder, theme } = props;
  const img = useRef();
  const [hasMoreWidthThanHeight, setHasMoreWidthThanHeight] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const onLoad = useCallback(() => {
    if (img.current.naturalHeight < img.current.naturalWidth) {
      setHasMoreWidthThanHeight(true);
    } else {
      setHasMoreWidthThanHeight(false);
    }
    setHasLoaded(true);
  }, [img, setHasLoaded, setHasMoreWidthThanHeight]);

  return (
    <div className={classes.imageContainer}>
      <img
        style={{
          width: hasMoreWidthThanHeight ? '100%' : 'auto',
          height: hasMoreWidthThanHeight ? 'auto' : '100%',
          display: hasLoaded ? 'block' : 'none',
          borderRadius: roundedBorder ? theme.shape.borderRadius : 0,
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

export default withStyles(styles, { withTheme: true })(SelfAligningImage);
