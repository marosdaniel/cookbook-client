import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';

import { Container, Box, Typography, TextField, Button, Grid, Link } from '@mui/material';

import { CREATE_USER } from '../../../service/graphql/user/createUser';
import { customValidationSchema } from '../../../utils/validation';
import { ENonProtectedRoutes } from '../../../router/types';

import { IProps } from './types';
import { boxStyle } from './styles';

const Register = ({ setIsLogin }: IProps) => {
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER);

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
      setIsLogin(true);
      navigate(ENonProtectedRoutes.HOME);
    } catch (_error: any) {
      console.error(_error);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik({
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
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
