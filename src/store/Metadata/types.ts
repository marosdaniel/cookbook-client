export type TMetadataType = 'level' | 'category' | 'unit' | 'label';

export type TMetadata = {
  key: string;
  label: string;
  type: TMetadataType;
  name: string;
};
