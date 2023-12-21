import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { IProps } from './types';

const PreparationStepList = ({ preparationSteps }: IProps) => {
  return (
    <ul id="preparation-steps">
      {preparationSteps.map(step => (
        <ListItemText key={step.order}>
          <Typography variant="body1">{step.description}</Typography>
        </ListItemText>
      ))}
    </ul>
  );
};

export default PreparationStepList;
