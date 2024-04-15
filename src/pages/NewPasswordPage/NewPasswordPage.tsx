import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { ENonProtectedRoutes } from '../../router/types';
import { useAppDispatch } from '../../store/hooks';
import { newPasswordValidationSchema } from '../../utils/validation';
import { boxStyle } from '../SigninPage/Login/styles';
import { useMutation } from '@apollo/client';
import { SET_NEW_PASSWORD } from '../../service/graphql/user/editUser';
import { IFormikProps } from './types';

const NewPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [setNewPassword, { loading }] = useMutation(SET_NEW_PASSWORD);

  // TODO: get the token from the URL
  const { token } = useParams();

  console.log('param token: ', token);

  const onSubmit = async () => {
    if (!token) return;
    if (values.newPassword !== values.confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await setNewPassword({
        variables: { newPassword: values.newPassword, token: token },
      });

      navigate(ENonProtectedRoutes.SIGNIN);
    } catch (_error: any) {
      setError(_error.message);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik<IFormikProps>({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit,
    validationSchema: newPasswordValidationSchema,
  });

  return (
    <Container maxWidth="sm">
      <Box sx={boxStyle}>
        <Typography component="h1" variant="h4">
          Set your new password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} marginTop={1}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            type="password"
            label="Password"
            name="newPassword"
            autoComplete="newPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newPassword}
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            label="Confirm Password"
            type="password"
            id="confirmNewPassword"
            autoComplete="current-password"
            inputProps={{ maxLength: 30 }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmNewPassword}
            error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save
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

export default NewPasswordPage;
