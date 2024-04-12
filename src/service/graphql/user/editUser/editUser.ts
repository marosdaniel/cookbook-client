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

const RESET_PASSWORD = gql`
  mutation Mutation($email: String!) {
    resetPassword(email: $email)
  }
`;

const SET_NEW_PASSWORD = gql`
  mutation Mutation($newPassword: String!, $token: String!) {
    setNewPassword(newPassword: $newPassword, token: $token)
  }
`;

export { EDIT_USER, CHANGE_PASSWORD, RESET_PASSWORD, SET_NEW_PASSWORD };
