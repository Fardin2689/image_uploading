import { Button, ButtonGroup, CircularProgress } from '@material-ui/core';

function Action({ handleUpload, handleCancel, disabled, loading }) {
  return (
    <ButtonGroup orientation="vertical" color="primary" variant="text">
      <Button onClick={handleUpload} disabled={disabled}>
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </ButtonGroup>
  );
}

export default Action;
