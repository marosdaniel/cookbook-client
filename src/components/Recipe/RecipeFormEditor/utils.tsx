import { ListItem, IconButton, TextField, Grid, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { units } from './const';
import { RenderItemOptions } from './types';
import { useQuery } from '@apollo/client';
import { TMetadata, TMetadataType } from '../../../store/Metadata/types';
import { GET_METADATA_BY_TYPE } from '../../../service/graphql/metadata/getMetadata';

export const useGetDifficultyLevels = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: 'level' as TMetadataType },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};

export const renderItem = ({ item, handleRemoveIngredient, handleIngredientChange }: RenderItemOptions) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedItem = { ...item, name: e.target.value };
    // TODO: save it to the store
    handleIngredientChange(updatedItem);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedItem = { ...item, unit: e.target.value };
    handleIngredientChange(updatedItem);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedItem = { ...item, quantity: +e.target.value };
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
      <Grid item xs={12} md={6} lg={9}>
        <TextField
          value={item.name}
          label="Name"
          variant="standard"
          onChange={handleNameChange}
          sx={{ width: '90%' }}
          required
        />
      </Grid>
      <Grid item xs={6} md={3} lg={1} marginRight={2}>
        <TextField
          value={item.quantity}
          label="Quantity"
          variant="standard"
          onChange={handleQuantityChange}
          inputProps={{ min: 0, style: { textAlign: 'right' } }}
          sx={{ width: '90%' }}
          required
        />
      </Grid>
      <Grid item xs={6} md={3} lg={2} marginRight={2}>
        <TextField
          select
          id="unit-dropdown"
          label="Unit"
          value={item.unit}
          onChange={handleUnitChange}
          variant="standard"
          required
          sx={{ width: '90%' }}
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
