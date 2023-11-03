import React from 'react';

import { useMutation } from '@apollo/client';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { LOGIN_USER } from '../../../service/graphql/user/loginUser';

import { IProps } from './types';
import { boxStyle } from './styles';
import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../store/Auth/auth';
import { useAuthState } from '../../../store/Auth';
import { useNavigate } from 'react-router-dom';
import { ENonProtectedRoutes } from '../../../router/types';
import LoadingBar from '../../../components/LoadingBar';

const Login = ({ setIsLogin }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthState();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  console.log('isAuthenticated', isAuthenticated);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userLoginInput = {
      userNameOrEmail: data.get('email'),
      password: data.get('password'),
    };

    try {
      const {
        data: {
          loginUser: { token, user, userId },
        },
      } = await loginUser({
        variables: { userLoginInput },
      });

      // console.log({
      //   token,
      //   user,
      //   userId,
      // });
      // await loginUser({
      //   variables: { userLoginInput },
      // });
      dispatch(login(user));
      navigate(ENonProtectedRoutes.HOME);
    } catch (_error) {
      console.error(_error);
    }
  };

  if (loading) return <LoadingBar />;

  return (
    <Container maxWidth="sm">
      <Box sx={boxStyle}>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address or username"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => setIsLogin(false)}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
