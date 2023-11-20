import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation LoginUser($userLoginInput: UserLoginInput!) {
    loginUser(userLoginInput: $userLoginInput) {
      token
      user {
        _id
        email
        userName
        firstName
        lastName
        locale
        role
      }
      userId
    }
  }
`;

export { LOGIN_USER };
