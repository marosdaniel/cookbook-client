import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Link } from '@mui/material';

import { IProps } from './types';
import { boxStyle } from './styles';

const Register = ({ setIsLogin }: IProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
            id="first-name"
            label="First Name"
            name="first-name"
            autoComplete="firstName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last-name"
            label="Last Name"
            name="last-name"
            autoComplete="lastName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="user-name"
            label="Username"
            name="user-name"
            autoComplete="userName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password-again"
            label="Password again"
            type="password"
            id="password-again"
            autoComplete="current-password-again"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => setIsLogin(true)}>
                {'I already have an account'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
