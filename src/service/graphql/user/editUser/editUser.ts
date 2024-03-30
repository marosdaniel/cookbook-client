import gql from 'graphql-tag';

const EDIT_USER = gql`
  mutation Mutation($userRegisterInput: UserRegisterInput) {
    createUser(userRegisterInput: $userRegisterInput) {
      _id
      email
      firstName
      lastName
      locale
      role
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
