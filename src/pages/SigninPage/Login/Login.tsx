import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { login } from '../../../store/Auth/auth';
import { useAppDispatch } from '../../../store/hooks';
import { LOGIN_USER } from '../../../service/graphql/user/loginUser';
import { loginValidationSchema } from '../../../utils/validation';
import { ENonProtectedRoutes } from '../../../router/types';

import PasswordInput from '../../../components/Form/PasswordInput';
import AlertSnack from '../../../components/AlertSnack';
import { linkStyles } from '../styles';
import { IFormikProps, IProps } from './types';
import { boxStyle } from './styles';

const Login = ({ setIsLogin }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [error, setError] = useState<string>('');

  const onSubmit = async () => {
    const userLoginInput = {
      userNameOrEmail: values.email,
      password: values.password,
    };

    try {
      const {
        data: {
          loginUser: { user, token },
        },
      } = await loginUser({
        variables: { userLoginInput },
      });

      localStorage.setItem('c_b_token', token);

      dispatch(login(user));
      navigate(ENonProtectedRoutes.HOME);
    } catch (_error: any) {
      setError(_error.message);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik<IFormikProps>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema: loginValidationSchema,
  });
  return (
    <Container maxWidth="sm">
      <Box sx={boxStyle}>
        <Typography component="h1" variant="h4">
          Sign in
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
          <PasswordInput
            id="password"
            label="Password"
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link sx={linkStyles} variant="body2" component={RouterLink} to={ENonProtectedRoutes.RESET_PASSWORD}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link sx={linkStyles} variant="body2" onClick={() => setIsLogin(false)}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Button
            type="button"
            variant="text"
            sx={{ mt: 6, mb: -3 }}
            component={RouterLink}
            to={ENonProtectedRoutes.RECIPES}
          >
            <ArrowBackIcon />
            Go to the recipes
          </Button>
        </Box>
      </Box>
      <AlertSnack message={error} setMessage={setError} />
    </Container>
  );
};

export default Login;
