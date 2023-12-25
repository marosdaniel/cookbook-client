import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IProps } from './types';

const IngredientList = ({ ingredients, title }: IProps) => {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <List id="ingredients">
        {ingredients.map(ingredient => {
          const { name, quantity, unit } = ingredient;
          const listItemText = `${name} - ${quantity} ${unit}`;
          return (
            <ListItem key={name}>
              <ListItemText primary={listItemText} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default IngredientList;
