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
  mutation Mutation($changePasswordInput: ChangePasswordInput) {
    changePassword(changePasswordInput: $changePasswordInput)
  }
`;

export { EDIT_USER, CHANGE_PASSWORD };
