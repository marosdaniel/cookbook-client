import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '../../../store/hooks';
import { recipeFormValidationSchema } from '../../../utils/validation';

import PreparationStepsEditor from './PreparationStepsEditor';
import IngredientsEditor from './IngredientsEditor';
import { useGetDifficultyLevels } from './utils';
import { gridContainerStyles } from './styles';
import { IFormikProps } from './types';
import { newRecipe } from '../../../store/Recipe/recipe';
import { useRecipeState } from '../../../store/Recipe';

const RecipeFormEditor = () => {
  const dispatch = useAppDispatch();

  const difficultyLevels = useGetDifficultyLevels();
  // useEffect(() => {
  //   console.log('useEffect ingredients: ', ingredients);
  // }, [ingredients]);

  const { newRecipe: newRecipeFromStore } = useRecipeState();

  const onSubmit = async () => {
    // log newRecipe from store
    console.log(newRecipeFromStore);
    // try {
    //   const {
    //     data: {
    //       loginUser: { user, token },
    //     },
    //   } = await loginUser({
    //     variables: { userLoginInput },
    //   });
    //   localStorage.setItem('c_b_token', token);
    //   dispatch(login(user));
    //   navigate(ENonProtectedRoutes.HOME);
    // } catch (_error: any) {
    //   setError(_error.message);
    // }
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, isSubmitting } = useFormik<IFormikProps>({
    initialValues: {
      title: newRecipeFromStore?.title || '',
      description: newRecipeFromStore?.description || '',
      imgSrc: newRecipeFromStore?.imgSrc || '',
      cookingTime: newRecipeFromStore?.cookingTime || 0,
      difficultyLevel: newRecipeFromStore?.difficultyLevel || '',
      // ingredients: newRecipeFromStore?.ingredients || [],
      // preparationSteps: newRecipeFromStore?.preparationSteps || [],
    },
    onSubmit,
    validationSchema: recipeFormValidationSchema,
  });

  const [debouncedValues, setDebouncedValues] = useState(values);

  const handleFormChange = () => {
    const { title, description, imgSrc, cookingTime, difficultyLevel } = values;
    dispatch(newRecipe({ ...newRecipeFromStore, title, description, imgSrc, cookingTime, difficultyLevel }));
    console.log('handleFormChange');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues(values);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [values]);

  useEffect(() => {
    handleFormChange();
    console.log('debouncedValues: ', debouncedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues]);

  return (
    <Grid component="form" container sx={gridContainerStyles} onSubmit={handleSubmit} onChange={handleFormChange}>
      <Grid item xs={12} sm={12} md={6} lg={8} marginBottom={8}>
        <Typography variant="h6" marginBottom={2}>
          Please ensure all fields are filled out
        </Typography>
        <TextField
          value={values.title}
          error={Boolean(errors.title)}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          variant="standard"
        />
        <TextField
          value={values.description}
          error={Boolean(errors.description)}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          variant="standard"
          helperText='Short description of the recipe, e.g. "This is a great recipe for a quick and easy pizza sauce."'
        />
        <TextField
          value={values.imgSrc}
          error={Boolean(errors.imgSrc)}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          fullWidth
          id="imgSrc"
          label="Image URL"
          name="imgSrc"
          autoComplete="image-url"
          variant="standard"
        />
        <TextField
          value={values.cookingTime}
          error={Boolean(errors.cookingTime)}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          required
          type="number"
          id="cookingTime"
          label="Cooking time"
          name="cookingTime"
          autoComplete="cooking-time"
          InputProps={{
            endAdornment: <InputAdornment position="start">min</InputAdornment>,
            inputProps: {
              type: 'number',
              min: 0,
              max: 999,
              step: 1,
              style: { textAlign: 'right', marginRight: '8px' },
            },
          }}
          variant="standard"
          helperText="Please enter cooking time in minutes"
        />
        <Grid item xs={12} sx={{ mt: '16px', mb: '8px' }}>
          <TextField
            value={values.difficultyLevel}
            error={Boolean(errors.difficultyLevel)}
            onChange={handleChange}
            onBlur={handleBlur}
            id="difficultyLevel"
            name="difficultyLevel"
            select
            required
            label="Difficulty level"
            helperText="Please select level of difficulty"
            variant="standard"
            defaultValue=""
            disabled={!difficultyLevels.length}
          >
            {difficultyLevels.map(option => (
              <MenuItem key={option.key} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <IngredientsEditor />
      <PreparationStepsEditor />
      <Grid item xs={12} sm={12} md={6} lg={8} textAlign={'right'}>
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Complete & Share
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecipeFormEditor;
