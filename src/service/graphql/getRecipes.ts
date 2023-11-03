import gql from 'graphql-tag';

export const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      recipes {
        _id
        title
      }
      totalRecipes
    }
  }
`;
