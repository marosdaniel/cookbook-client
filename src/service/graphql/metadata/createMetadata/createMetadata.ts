import gql from 'graphql-tag';

const CREATE_METADATA = gql`
  mutation Mutation($createMetadataInput: CreateMetadataInput!) {
    createMetadata(createMetadataInput: $createMetadataInput) {
      key
      label
      type
      name
    }
  }
`;

export { CREATE_METADATA };
