import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Alert,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import { login } from '../../../store/Auth/auth';
import { useAppDispatch } from '../../../store/hooks';
import { CREATE_USER } from '../../../service/graphql/user/createUser';
import { LOGIN_USER } from '../../../service/graphql/user/loginUser';
import { ENonProtectedRoutes } from '../../../router/types';
import { customValidationSchema } from '../../../utils/validation';

import { linkStyles } from '../styles';
import { IFormikProps, IProps } from './types';
import { boxStyle } from './styles';

const Register = ({ setIsLogin }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER);
  const [error, setError] = useState<string>('');
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState<boolean>(false);

  const privacyLink = (
    <Link
      component={RouterLink}
      to={ENonProtectedRoutes.PRIVACY_POLICY}
      sx={linkStyles}
      target="_blank"
      rel="noopener noreferrer"
    >
      I accept the privacy policy
    </Link>
  );

  const handleChangePrivacy = () => {
    setIsPrivacyAccepted(!isPrivacyAccepted);
  };

  const onSubmit = async () => {
    const userRegisterInput = {
      firstName: values.firstName,
      lastName: values.lastName,
      userName: values.userName,
      email: values.email,
      password: values.password,
    };

    try {
      await createUser({
        variables: { userRegisterInput },
      });
    } catch (_error: any) {
      setError(_error.message);
    }
    try {
      const userLoginInput = {
        userNameOrEmail: values.email,
        password: values.password,
      };
      const {
        data: {
          loginUser: { user },
        },
      } = await loginUser({
        variables: { userLoginInput },
      });
      dispatch(login(user));
    } catch (_error: any) {
      setError(_error.message);
    }
    navigate(ENonProtectedRoutes.HOME);
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik<IFormikProps>({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: customValidationSchema,
    onSubmit,
  });

  return (
    <Container maxWidth="sm">
      <Box sx={boxStyle}>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="first-name"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last-name"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="user-name"
            label="Username"
            name="userName"
            autoComplete="userName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
            error={touched.userName && Boolean(errors.userName)}
            helperText={touched.userName && errors.userName}
          />
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputProps={{ maxLength: 30 }}
            autoComplete="current-password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
            inputProps={{ maxLength: 30 }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <FormControlLabel
            required
            control={
              <Checkbox
                onChange={handleChangePrivacy}
                color="primary"
                name="confirmPrivacy"
                value={isPrivacyAccepted}
              />
            }
            label={privacyLink}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || loginLoading || !isPrivacyAccepted}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link sx={linkStyles} variant="body2" onClick={() => setIsLogin(true)}>
                I already have an account
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        onClose={() => setError('')}
        autoHideDuration={3000}
        message={error}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
