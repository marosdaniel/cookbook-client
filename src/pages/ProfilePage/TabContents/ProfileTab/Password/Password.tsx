import React, { useState } from 'react';
import { Box, Typography, Button, Grow, TextField } from '@mui/material';
import { sectionStyles, innerBoxStyles, editButtonStyles, labelStyles } from '../styles';

const Password = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const handleCancelPassword = () => {
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordEditable(false);
  };

  return (
    <Box sx={sectionStyles}>
      <Box sx={innerBoxStyles}>
        <Typography variant="h5">Change your password</Typography>
        {!isPasswordEditable ? (
          <Button sx={editButtonStyles} variant="text" color="primary" onClick={() => setIsPasswordEditable(true)}>
            Edit
          </Button>
        ) : null}
      </Box>
      {!isPasswordEditable ? (
        <>
          <Typography marginTop={1} variant="body2" sx={labelStyles} color="GrayText">
            Password
          </Typography>
          <Typography variant="body1">**********</Typography>
        </>
      ) : null}
      <Box sx={{ display: isPasswordEditable ? 'flex' : 'none' }}>
        <Grow
          in={isPasswordEditable}
          style={{ transformOrigin: '0 0 0' }}
          {...(isPasswordEditable ? { timeout: 300 } : {})}
        >
          <Box sx={{ width: '100%' }}>
            <TextField
              variant="standard"
              label="Password"
              value={password}
              fullWidth
              required
              margin="normal"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
            <TextField
              variant="standard"
              label="New password"
              value={newPassword}
              fullWidth
              required
              margin="normal"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNewPassword(event.target.value);
              }}
            />
            <TextField
              variant="standard"
              label="Confirm new password"
              value={confirmPassword}
              fullWidth
              required
              margin="normal"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <Box display="flex" justifyContent="flex-end" marginTop={2} gap={1}>
              <Button size="small" variant="text" color="primary" onClick={handleCancelPassword}>
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => console.log('handleSavePassword')}
                disabled={password === '' || newPassword === '' || confirmPassword === ''}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Grow>
      </Box>
    </Box>
  );
};

export default Password;
