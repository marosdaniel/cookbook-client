export interface IProps {
  open?: boolean;
  message?: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  error?: string;
  setError: (error: string) => void;
  variant?: 'filled' | 'outlined' | 'standard';
}
