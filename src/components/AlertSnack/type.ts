import { AlertProps } from '@mui/material/Alert';

export interface IProps {
  open?: boolean;
  message: string;
  severity?: TSeverity;
  setMessage: (message: string) => void;
  variant?: 'filled' | 'outlined' | 'standard';
}

export type TSeverity = AlertProps['severity'];
