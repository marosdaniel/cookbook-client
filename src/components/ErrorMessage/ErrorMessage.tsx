import { Alert } from '@mui/material';

const ErrorMessage = () => {
  return (
    <Alert severity="error" sx={{ width: 'max-content' }}>
      Something went wrong :(
    </Alert>
  );
};

export default ErrorMessage;
