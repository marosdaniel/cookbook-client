import { Snackbar, Fade, Alert } from '@mui/material';
import { IProps } from './type';

const AlertSnack = ({ error, setError, severity = 'error', variant = 'filled' }: IProps) => {
  return (
    <Snackbar
      open={!!error}
      onClose={() => setError('')}
      autoHideDuration={3000}
      message={error}
      TransitionComponent={Fade}
      transitionDuration={380}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert variant={variant} severity={severity}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnack;
