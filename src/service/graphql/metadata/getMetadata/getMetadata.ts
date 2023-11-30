import gql from 'graphql-tag';

const GET_METADATA_BY_TYPE = gql`
  query GetMetadataByType($type: String!) {
    getMetadataByType(type: $type) {
      key
      label
      name
      type
    }
  }
`;

const GET_METADATA_BY_KEY = gql`
  query GetMetadataByKey($getMetadataByKeyKey: String!) {
    getMetadataByKey(key: $getMetadataByKeyKey) {
      key
      label
      name
      type
    }
  }
`;

export { GET_METADATA_BY_TYPE, GET_METADATA_BY_KEY };
