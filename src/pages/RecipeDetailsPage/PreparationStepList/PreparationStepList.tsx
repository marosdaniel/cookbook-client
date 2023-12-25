import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { IProps } from './types';

const PreparationStepList = ({ preparationSteps, title }: IProps) => {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <List id="preparation-steps" sx={{ listStyle: 'decimal', pl: 4 }}>
        {preparationSteps.map(step => (
          <ListItem key={step.order} sx={{ display: 'list-item' }}>
            <ListItemText primary={step.description} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PreparationStepList;
