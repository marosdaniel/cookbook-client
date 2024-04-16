export interface IProps {
  open?: boolean;
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  setMessage: (message: string) => void;
  variant?: 'filled' | 'outlined' | 'standard';
}
