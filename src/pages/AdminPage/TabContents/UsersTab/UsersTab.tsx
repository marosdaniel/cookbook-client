import { useQuery } from '@apollo/client';
import { TransitionGroup } from 'react-transition-group';
import DeleteIcon from '@mui/icons-material/Delete';

import { GET_ALL_USERS } from '../../../../service/graphql/user/getUser';
import LoadingBar from '../../../../components/LoadingBar';
import ErrorMessage from '../../../../components/ErrorMessage';
import { ERole, TUser } from '../../../../store/Auth/types';
import { Collapse, IconButton, List, ListItem, Typography } from '@mui/material';
import { getUserRoleStyles } from './utils';
import { listItemStyles } from './styles';

const UsersTab = () => {
  const { data, loading, error } = useQuery<{ getAllUser: TUser[] }>(GET_ALL_USERS);

  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

  const users: TUser[] = data?.getAllUser ?? [];

  const handleDeleteUser = (userId: string) => {
    console.log('handleDeleteUser: ', userId);
  };

  return (
    <List sx={{ maxWidth: '960px' }}>
      {users.map((user, index) => {
        const { _id: userId, userName, role } = user;
        return (
          <TransitionGroup key={index}>
            <Collapse>
              <ListItem
                sx={listItemStyles}
                secondaryAction={
                  role !== ERole.ADMIN && (
                    <IconButton edge="end" aria-label="delete" title="Delete" onClick={() => handleDeleteUser(userId)}>
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              >
                <Typography variant="h6" color="text.secondary">
                  {userName}
                </Typography>
                <Typography sx={{ ...getUserRoleStyles(role) }} variant="body2" color="text.secondary">
                  {role}
                </Typography>
              </ListItem>
            </Collapse>
          </TransitionGroup>
        );
      })}
    </List>
  );
};

export default UsersTab;
