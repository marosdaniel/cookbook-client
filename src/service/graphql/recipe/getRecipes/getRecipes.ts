import gql from 'graphql-tag';

const GET_RECIPES = gql`
  query GetRecipes($limit: Int) {
    getRecipes(limit: $limit) {
      recipes {
        _id
        createdBy
        description
        title
        createdAt
        cookingTime
        imgSrc
      }
    }
  }
`;

const GET_RECIPE_BY_ID = gql`
  query GetRecipeById($id: ID!) {
    getRecipeById(_id: $id) {
      _id
      title
      ingredients {
        _id
        localId
        name
        quantity
        unit
      }
      description
      category {
        _id
        name
        key
        label
        type
      }
      labels {
        _id
        name
        key
        label
        type
      }
      preparationSteps {
        _id
        description
        order
      }
      createdAt
      updatedAt
      createdBy
      imgSrc
      cookingTime
      difficultyLevel {
        _id
        name
        key
        label
        type
      }
      servings
    }
  }
`;

const GET_RECIPES_BY_USER_NAME = gql`
  query GetRecipesByUserName($userName: String!) {
    getRecipesByUserName(userName: $userName) {
      recipes {
        category {
          _id
          key
          name
          label
        }
        createdAt
        createdBy
        description
        ingredients {
          _id
          name
          quantity
          unit
        }
        preparationSteps {
          _id
          description
          order
        }
        cookingTime
        imgSrc
        updatedAt
        title
        _id
      }
    }
  }
`;

export { GET_RECIPES, GET_RECIPE_BY_ID, GET_RECIPES_BY_USER_NAME };
