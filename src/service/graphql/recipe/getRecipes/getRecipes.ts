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
        preparationTime
      }
    }
  }
`;

const GET_RECIPE_BY_ID = gql`
  query GetRecipeById($id: ID!) {
    getRecipeById(_id: $id) {
      _id
      createdAt
      createdBy
      description
      ingredients {
        name
        quantity
        unit
      }
      instructions
      title
      updatedAt
      preparationTime
    }
  }
`;

export { GET_RECIPES, GET_RECIPE_BY_ID };

// import { gql } from '@apollo/client';
// import { IModel } from '../../../../store/AddMachine';

// import { TLaunchDarklySet } from '../../../../store/LaunchDarkly';

// import { TQueryResponse } from '../../../types';

// import { client } from '../../graphql';

// export const getModels = async (launchDarkly: TLaunchDarklySet, modelSeriesId: string): Promise<IModel[]> => {
//   const { data } = await client(launchDarkly).query<TQueryResponse<'deviceModels', IModel[]>>({
//     query: gql`
//       query {
//         deviceModels (filter: { modelSeriesId: "${modelSeriesId}" }) {
//           deviceType
//           id
//           modelSeriesId
//           name
//         }
//       }
//     `,
//   });
//   return data.deviceModels;
// };
