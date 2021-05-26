import { useRef } from 'react';

function Preview({ src, setDimension }) {
  const imgRef = useRef();

  const onLoad = () => {
    setDimension(
      `${imgRef.current.naturalHeight} x ${imgRef.current.naturalWidth}`
    );
  };

  return (
    <img
      src={src}
      alt={''}
      width="auto"
      height="100%"
      ref={imgRef}
      onLoad={onLoad}
    />
  );
}

export default Preview;
