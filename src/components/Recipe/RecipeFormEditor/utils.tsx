import { ListItem, IconButton, TextField, Grid, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { units } from './const';
import { RenderItemOptions } from './types';

export const renderItem = ({ item, handleRemoveIngredient, handleIngredientChange }: RenderItemOptions) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(item);
    const updatedItem = { ...item, name: e.target.value };
    handleIngredientChange(updatedItem);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('unit ', e.target.value);
    const updatedItem = { ...item, unit: e.target.value };
    handleIngredientChange(updatedItem);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" title="Delete" onClick={() => handleRemoveIngredient(item._id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <TextField value={item.name} label="Name" variant="standard" onChange={handleNameChange} />
      <Grid item xs={12}>
        <TextField
          select
          id="unit-dropdown"
          label="Unit"
          value={item.unit}
          onChange={handleUnitChange}
          variant="standard"
          size="small"
        >
          {units.map(unit => (
            <MenuItem key={unit.key} value={unit.name}>
              {unit.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </ListItem>
  );
};
