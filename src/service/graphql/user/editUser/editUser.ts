import gql from 'graphql-tag';
const EDIT_USER = gql`
  mutation EditUser($editUserId: ID!, $userEditInput: UserEditInput!) {
    editUser(id: $editUserId, userEditInput: $userEditInput) {
      firstName
      lastName
      locale
      userName
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($userId: ID!, $passwordEditInput: PasswordEditInput!) {
    changePassword(id: $userId, passwordEditInput: $passwordEditInput)
  }
`;

export { EDIT_USER, CHANGE_PASSWORD };
