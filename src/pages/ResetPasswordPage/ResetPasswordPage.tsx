import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { RESET_PASSWORD } from '../../service/graphql/user/editUser';
import { ENonProtectedRoutes } from '../../router/types';
import { resetPasswordValidationSchema } from '../../utils/validation';
import { boxStyle } from '../SigninPage/Login/styles';
import { IFormikProps } from './types';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const onSubmit = async () => {
    try {
      await resetPassword({
        variables: { email: values.email },
      });

      navigate(ENonProtectedRoutes.NEW_PASSWORD);
    } catch (_error: any) {
      resetForm();
      setError(_error.message);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, resetForm, touched, errors } = useFormik<IFormikProps>({
    initialValues: {
      email: '',
    },
    onSubmit,
    validationSchema: resetPasswordValidationSchema,
  });

  return (
    <Container maxWidth="sm">
      <Box sx={boxStyle}>
        <Typography component="h1" variant="h4">
          Reset your password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} marginTop={1}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            Send
          </Button>
          <Button type="button" variant="text" component={RouterLink} to={ENonProtectedRoutes.SIGNIN}>
            <ArrowBackIcon />
            Go to Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
