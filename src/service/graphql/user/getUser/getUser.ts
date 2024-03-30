import gql from 'graphql-tag';

const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
      _id
      email
      firstName
      lastName
      locale
      userName
      favoriteRecipes {
        _id
        createdBy
        description
        title
        updatedAt
      }
      recipes {
        _id
        createdAt
        createdBy
        title
        ingredients {
          _id
          name
          quantity
          unit
        }
      }
      role
    }
  }
`;

const GET_USER_BY_USERNAME = gql`
  query GetUserByUserName($userName: String!) {
    getUserByUserName(userName: $userName) {
      _id
      email
      firstName
      lastName
      locale
      userName
      favoriteRecipes {
        _id
        createdBy
        description
        title
        updatedAt
      }
      recipes {
        _id
        createdAt
        createdBy
        title
        ingredients {
          _id
          name
          quantity
          unit
        }
      }
      role
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUser {
    getAllUser {
      _id
      email
      role
      userName
      firstName
      lastName
    }
  }
`;

export { GET_USER_BY_ID, GET_USER_BY_USERNAME };
