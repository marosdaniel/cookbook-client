import gql from 'graphql-tag';

const CREATE_RECIPE = gql`
  mutation CreateRecipe($recipeCreateInput: RecipeCreateInput) {
    createRecipe(recipeCreateInput: $recipeCreateInput) {
      _id
      title
      description
      ingredients {
        name
        quantity
        unit
      }
      category {
        name
        key
        label
      }
      labels {
        name
        key
        label
      }
      preparationSteps {
        description
        order
      }
      createdAt
      updatedAt
      createdBy
      cookingTime
      imgSrc
      servings
    }
  }
`;

const EDIT_RECIPE = gql`
  mutation Mutation($editRecipeId: ID!, $recipeEditInput: RecipeEditInput) {
    editRecipe(id: $editRecipeId, recipeEditInput: $recipeEditInput) {
      title
      description
      ingredients {
        localId
        name
        quantity
        unit
        _id
      }
      category {
        name
        key
        label
        type
        _id
      }
      labels {
        name
        key
        label
        type
        _id
      }
      _id
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

export { CREATE_RECIPE, EDIT_RECIPE };
