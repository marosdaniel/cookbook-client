export interface IProps {
  id: string;
  value: string;
  label: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText: string | false | undefined;
}
