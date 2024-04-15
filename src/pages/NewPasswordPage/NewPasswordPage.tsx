import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { ENonProtectedRoutes } from '../../router/types';
import PasswordInput from '../../components/Form/PasswordInput';
import { SET_NEW_PASSWORD } from '../../service/graphql/user/editUser';
import { newPasswordValidationSchema } from '../../utils/validation';
import { boxStyle } from '../SigninPage/Login/styles';
import { IFormikProps } from './types';

const NewPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [setNewPassword] = useMutation(SET_NEW_PASSWORD);

  // TODO: Add error handling

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
      resetForm();
      setError(_error.message);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors, resetForm } = useFormik<IFormikProps>({
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
          <PasswordInput
            id="new-password"
            label="Password"
            onChange={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
            value={values.newPassword}
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <PasswordInput
            id="confirm-new-password"
            label="Confirm Password"
            onChange={handleChange('confirmNewPassword')}
            onBlur={handleBlur('confirmNewPassword')}
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
