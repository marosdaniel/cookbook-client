import { useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';

import { GET_USER_BY_ID } from '../../../../service/graphql/user/getUser';
import { useAuthState } from '../../../../store/Auth';
import LoadingBar from '../../../../components/LoadingBar';
import ErrorMessage from '../../../../components/ErrorMessage';
import { TUser } from '../../../../store/Auth/types';
import { topSectionStyles } from './styles';

const ProfileTab = () => {
  const { user } = useAuthState();

  const { data, loading, error } = useQuery<{ getUserById: TUser }>(GET_USER_BY_ID, {
    variables: { getUserByIdId: user?._id || '' },
  });

  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

  const userData: TUser | undefined = data?.getUserById;
  if (!userData) return <Typography variant="h4">User not found</Typography>;
  const { userName, email } = userData;

  return (
    <section id="profile-tab">
      <Box sx={topSectionStyles}>
        <Typography variant="body1">Username: {userName}</Typography>
        <Typography variant="body1">Email address: {email}</Typography>
      </Box>
    </section>
  );
};

export default ProfileTab;
