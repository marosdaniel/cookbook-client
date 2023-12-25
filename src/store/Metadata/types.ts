export enum TMetadataType {
  LEVEL = 'level',
  CATEGORY = 'category',
  UNIT = 'unit',
  LABEL = 'label',
}

type TMetadata = {
  key: string;
  label: string;
  name: string;
};

export type TLevelMetadata = TMetadata & {
  type: TMetadataType.LEVEL;
};

export type TCategoryMetadata = TMetadata & {
  type: TMetadataType.CATEGORY;
};

export type TUnitMetadata = TMetadata & {
  type: TMetadataType.UNIT;
};

export type TLabelMetadata = TMetadata & {
  type: TMetadataType.LABEL;
};
