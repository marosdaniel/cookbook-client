import { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import { TPreparationStep } from '../../../../store/Recipe/types';
import { useAppDispatch } from '../../../../store/hooks';
import { newRecipe } from '../../../../store/Recipe/recipe';
import { useRecipeState } from '../../../../store/Recipe';
import { listItemStyles } from '../styles';

const PreparationStepsEditor = () => {
  const newPreparationStep: TPreparationStep = {
    _id: '1',
    description: '',
    order: 1,
  };
  const dispatch = useAppDispatch();
  const { newRecipe: storedNewRecipe, editRecipe: storedEditRecipe } = useRecipeState();

  const [preparationSteps, setPreparationSteps] = useState<TPreparationStep[]>([newPreparationStep]);
  const addPreparationStepButtonDisabled = preparationSteps.some(step => step.description === '');

  const handleAddPreparationStep = () => {
    const newOrder = preparationSteps.length + 1;
    setPreparationSteps(prevSteps => [
      ...prevSteps,
      {
        _id: '1',
        description: '',
        order: newOrder,
      },
    ]);
  };

  const handleRemovePreparationStep = (index: number) => {
    setPreparationSteps(prevSteps => prevSteps.filter((_, i) => i !== index));
  };

  const handlePreparationStepChange = (index: number, updatedStep: string) => {
    const newStep = { ...preparationSteps[index] };
    newStep.description = updatedStep;
    setPreparationSteps(prevSteps => prevSteps.map((step, i) => (i === index ? newStep : step)));
  };

  useEffect(() => {
    dispatch(newRecipe({ ...storedNewRecipe, preparationSteps }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preparationSteps]);

  return (
    <Grid item xs={12} sm={12} md={10} lg={8} marginBottom={8}>
      <Typography variant="h6">Cooking instructions</Typography>
      <List>
        <TransitionGroup>
          {preparationSteps.map((step, index) => (
            <Collapse key={index}>
              <ListItem sx={listItemStyles}>
                <TextField
                  value={step.description}
                  label={`Step ${index + 1}`}
                  variant="standard"
                  onChange={e => handlePreparationStepChange(index, e.target.value)}
                  sx={{ width: '100%' }}
                  required
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  title="Delete"
                  onClick={() => handleRemovePreparationStep(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <Button variant="outlined" onClick={handleAddPreparationStep} disabled={addPreparationStepButtonDisabled}>
        +
      </Button>
    </Grid>
  );
};

export default PreparationStepsEditor;
