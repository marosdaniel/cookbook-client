import React, { useState } from 'react';
import { Box, Button, Grow, TextField, Typography } from '@mui/material';

import ErrorMessage from '../../../../../components/ErrorMessage';
import AlertSnack from '../../../../../components/AlertSnack';
import { TSeverity } from '../../../../../components/AlertSnack/type';
import { editButtonStyles, innerBoxStyles, labelStyles, sectionStyles } from '../styles';
import { IProps } from './types';

const PersonalData = ({
  localFirstName,
  localLastName,
  setLocalFirstName,
  setLocalLastName,
  onSavePersonalData,
  error,
  loading,
  disabledSaving,
}: IProps) => {
  const [isPersonalDataEditable, setIsPersonalDataEditable] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [messageSeverity, setMessageSeverity] = useState<TSeverity>('error');

  const handlePersonalDataEditable = () => {
    setIsPersonalDataEditable(prev => !prev);
  };

  const handleCancelPersonalData = () => {
    setLocalFirstName(localFirstName);
    setLocalLastName(localLastName);
    setIsPersonalDataEditable(false);
  };

  const handleSavePersonalData = async () => {
    try {
      onSavePersonalData();
      setMessageSeverity('success');
      setAlertMessage('Personal data changed successfully');
      setIsPersonalDataEditable(false);
    } catch (_error: any) {
      setMessageSeverity('error');
      setAlertMessage(_error.message);
    }
  };

  if (error) return <ErrorMessage />;

  return (
    <Box sx={sectionStyles}>
      <Box sx={innerBoxStyles}>
        <Typography variant="h5" marginBottom={1}>
          Change your personal data
        </Typography>
        {!isPersonalDataEditable ? (
          <Button sx={editButtonStyles} variant="text" color="primary" onClick={handlePersonalDataEditable}>
            Edit
          </Button>
        ) : null}
      </Box>
      {!isPersonalDataEditable ? (
        <>
          <Typography marginTop={1} variant="body2" sx={labelStyles} color="GrayText">
            First name
          </Typography>
          <Typography variant="body1">{localFirstName}</Typography>
          <Typography marginTop={1} variant="body2" sx={labelStyles} color="GrayText">
            Last name
          </Typography>
          <Typography variant="body1">{localLastName}</Typography>
        </>
      ) : null}
      <Box sx={{ display: isPersonalDataEditable ? 'flex' : 'none' }}>
        {/* <Grow in={isPersonalDataEditable}>{icon}</Grow> */}
        <Grow
          in={isPersonalDataEditable}
          style={{ transformOrigin: '0 0 0' }}
          {...(isPersonalDataEditable ? { timeout: 300 } : {})}
        >
          <Box sx={{ width: '100%' }}>
            <TextField
              variant="standard"
              label="First name"
              value={localFirstName}
              fullWidth
              required
              margin="normal"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLocalFirstName(event.target.value);
              }}
            />
            <TextField
              variant="standard"
              label="Last name"
              value={localLastName}
              fullWidth
              required
              margin="normal"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLocalLastName(event.target.value);
              }}
            />
            <Box display="flex" justifyContent="flex-end" marginTop={2} gap={1}>
              <Button size="small" variant="text" color="primary" onClick={handleCancelPersonalData}>
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleSavePersonalData}
                disabled={loading || localFirstName === '' || localLastName === '' || disabledSaving}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Grow>
      </Box>
      <AlertSnack message={alertMessage} setMessage={setAlertMessage} severity={messageSeverity} />
    </Box>
  );
};

export default PersonalData;
