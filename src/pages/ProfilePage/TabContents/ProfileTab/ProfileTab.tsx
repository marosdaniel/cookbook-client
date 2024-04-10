import { useQuery } from '@apollo/client';
import { Box, Button, Typography } from '@mui/material';

import { GET_USER_BY_ID } from '../../../../service/graphql/user/getUser';
import { useAuthState } from '../../../../store/Auth';
import { TUser } from '../../../../store/Auth/types';
import LoadingBar from '../../../../components/LoadingBar';
import ErrorMessage from '../../../../components/ErrorMessage';

import PersonalData from './PersonalData';
import { sectionStyles, innerBoxStyles, editButtonStyles, labelStyles } from './styles';

const ProfileTab = () => {
  const { user } = useAuthState();

  const { data, loading, error } = useQuery<{ getUserById: TUser }>(GET_USER_BY_ID, {
    variables: { getUserByIdId: user?._id ?? '' },
  });

  const userData: TUser | undefined = data?.getUserById;
  const { userName, email, firstName, lastName } = userData || {};

  if (!userData) return <Typography variant="h4">User not found</Typography>;

  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

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

      <PersonalData userId={user?._id} firstName={firstName} lastName={lastName} />
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
