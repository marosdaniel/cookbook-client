import gql from 'graphql-tag';

const DELETE_METADATA = gql`
  mutation DeleteMetadata($key: String!) {
    deleteMetadata(key: $key)
  }
`;

export { DELETE_METADATA };
