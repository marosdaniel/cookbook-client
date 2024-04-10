import React, { useState } from 'react';
import { Box, Button, Grow, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';

import { EDIT_USER } from '../../../../../service/graphql/user/editUser';
import ErrorMessage from '../../../../../components/ErrorMessage';
import { editButtonStyles, innerBoxStyles, labelStyles, sectionStyles } from '../styles';
import { IProps } from './types';

const PersonalData = ({ userId, firstName, lastName }: IProps) => {
  const [editUser, { loading, error }] = useMutation(EDIT_USER);

  const [isPersonalDataEditable, setIsPersonalDataEditable] = useState(false);

  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);

  const handlePersonalDataEditable = () => {
    setIsPersonalDataEditable(prev => !prev);
  };

  const handleCancelPersonalData = () => {
    setLocalFirstName(firstName);
    setLocalLastName(lastName);
    setIsPersonalDataEditable(false);
  };

  const handleSavePersonalData = async () => {
    try {
      await editUser({
        variables: {
          editUserId: userId ?? '',
          userEditInput: {
            firstName: localFirstName,
            lastName: localLastName,
          },
        },
      });
      setIsPersonalDataEditable(false);
    } catch (_error) {
      console.error('Something went wrong:', _error);
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
          <Typography variant="body1">{localFirstName ?? firstName}</Typography>
          <Typography marginTop={1} variant="body2" sx={labelStyles} color="GrayText">
            Last name
          </Typography>
          <Typography variant="body1">{localLastName ?? lastName}</Typography>
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
              value={localFirstName ?? firstName}
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
              value={localLastName ?? lastName}
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
                disabled={loading}
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

export default PersonalData;
