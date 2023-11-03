import gql from 'graphql-tag';

const CREATE_USER = gql`
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

export { CREATE_USER };
