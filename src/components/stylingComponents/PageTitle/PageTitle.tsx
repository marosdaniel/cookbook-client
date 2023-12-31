import { Typography } from '@mui/material';
import { IProps } from './types';
import { titleStyles } from './styles';

const PageTitle = ({ title }: IProps) => {
  return (
    <Typography variant="h2" sx={titleStyles}>
      {title}
    </Typography>
  );
};

export default PageTitle;
