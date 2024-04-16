import { Snackbar, Fade, Alert } from '@mui/material';
import { IProps } from './type';

const AlertSnack = ({ message, setMessage, severity = 'error', variant = 'filled' }: IProps) => {
  return (
    <Snackbar
      open={!!message}
      onClose={() => setMessage('')}
      autoHideDuration={3000}
      message={message}
      TransitionComponent={Fade}
      transitionDuration={380}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert variant={variant} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnack;
