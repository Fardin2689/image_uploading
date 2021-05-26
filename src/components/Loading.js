import CircularProgress from '@material-ui/core/CircularProgress';

export const OverlayLoading = ({ size = 70 }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        opacity: 0.8,
        zIndex: 10,
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress size={size} disableShrink />
    </div>
  );
};

export const Loading = ({ size = 40 }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <CircularProgress size={size} disableShrink />
    </div>
  );
};
