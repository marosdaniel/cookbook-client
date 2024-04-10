import { ApolloError } from '@apollo/client';

export interface IProps {
  userId?: string;
  localFirstName?: string;
  localLastName?: string;
  onSavePersonalData: () => Promise<void>;
  setLocalFirstName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLocalLastName: React.Dispatch<React.SetStateAction<string | undefined>>;
  error: ApolloError | undefined;
  loading: boolean;
  disabledSaving: boolean;
}
