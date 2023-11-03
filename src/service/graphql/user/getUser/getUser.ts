import gql from 'graphql-tag';

const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
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

export { GET_USER_BY_ID };
