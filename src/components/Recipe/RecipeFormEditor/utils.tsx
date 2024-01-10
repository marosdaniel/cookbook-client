import { useQuery } from '@apollo/client';

import {
  TCategoryMetadata,
  TLabelMetadata,
  TLevelMetadata,
  TMetadataType,
  TUnitMetadata,
} from '../../../store/Metadata/types';
import { GET_METADATA_BY_TYPE } from '../../../service/graphql/metadata/getMetadata';

export const useGetDifficultyLevels = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TLevelMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: TMetadataType.LEVEL },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};

export const useGetUnits = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TUnitMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: TMetadataType.UNIT },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};

export const useGetLabels = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TLabelMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: TMetadataType.LABEL },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};

export const useGetCategories = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TCategoryMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: TMetadataType.CATEGORY },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};
