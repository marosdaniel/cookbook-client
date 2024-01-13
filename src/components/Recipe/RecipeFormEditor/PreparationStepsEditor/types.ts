import { TPreparationStep } from '../../../../store/Recipe/types';

export interface IProps {
  preparationSteps: TPreparationStep[] | [];
  setPreparationSteps: React.Dispatch<React.SetStateAction<TPreparationStep[]>>;
  isEditMode?: boolean;
}
