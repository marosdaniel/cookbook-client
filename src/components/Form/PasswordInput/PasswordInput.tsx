import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { IProps } from './type';

const PasswordInput = ({ id, value, label, onBlur, onChange, error, helperText }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      id={id}
      margin="normal"
      required
      fullWidth
      type={showPassword ? 'text' : 'password'}
      label={label}
      name={id}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      error={error && Boolean(error)}
      helperText={helperText && helperText}
      inputProps={{ maxLength: 30 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
