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
      author {
        userName
      }
      preparationTime
      imgSrc
    }
  }
`;

export { CREATE_RECIPE };
