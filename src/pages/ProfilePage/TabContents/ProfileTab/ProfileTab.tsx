import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Grow, TextField, Typography } from '@mui/material';

import { GET_USER_BY_ID } from '../../../../service/graphql/user/getUser';
import { EDIT_USER } from '../../../../service/graphql/user/editUser';
import { useAuthState } from '../../../../store/Auth';
import { TUser } from '../../../../store/Auth/types';
import LoadingBar from '../../../../components/LoadingBar';
import ErrorMessage from '../../../../components/ErrorMessage';

import { sectionStyles, innerBoxStyles, editButtonStyles, labelStyles } from './styles';

const ProfileTab = () => {
  const { user } = useAuthState();

  const { data, loading, error } = useQuery<{ getUserById: TUser }>(GET_USER_BY_ID, {
    variables: { getUserByIdId: user?._id ?? '' },
  });

  const [editUser, { loading: editUserLoading, error: editUserError }] = useMutation(EDIT_USER);

  const [isPersonalDataEditable, setIsPersonalDataEditable] = useState(false);

  const userData: TUser | undefined = data?.getUserById;
  const { userName, email, firstName, lastName } = userData || {};

  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);

  if (!userData) return <Typography variant="h4">User not found</Typography>;

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
          editUserId: user?._id ?? '',
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

  if (loading) return <LoadingBar />;
  if (error || editUserError) return <ErrorMessage />;

  return (
    <section id="profile-tab">
      <Box sx={sectionStyles}>
        <Typography variant="h5">General informaiton</Typography>
        <Typography marginTop={1} variant="body2" sx={labelStyles} color="GrayText">
          First name
        </Typography>
        <Typography variant="body1">{userName}</Typography>
        <Typography variant="body2" sx={labelStyles} color="GrayText">
          Email
        </Typography>
        <Typography variant="body1">{email}</Typography>
      </Box>
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
                  disabled={editUserLoading}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Grow>
        </Box>
      </Box>
      <Box sx={sectionStyles}>
        <Box sx={innerBoxStyles}>
          <Typography variant="h5">Change your password</Typography>
          <Button sx={editButtonStyles} variant="text" color="primary">
            Edit
          </Button>
        </Box>
        <Typography marginTop={1} variant="body2" sx={labelStyles} color="GrayText">
          Password
        </Typography>
        <Typography variant="body1">**********</Typography>
      </Box>
    </section>
  );
};

export default ProfileTab;
