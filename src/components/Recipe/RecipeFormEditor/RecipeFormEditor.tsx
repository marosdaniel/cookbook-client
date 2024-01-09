import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Button, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '../../../store/hooks';
import { recipeFormValidationSchema } from '../../../utils/validation';
import { newRecipe, resetNewRecipe } from '../../../store/Recipe/recipe';
import { useRecipeState } from '../../../store/Recipe';
import { TIngredient, TPreparationStep, TRecipe } from '../../../store/Recipe/types';
import { ENonProtectedRoutes, EProtectedRoutes } from '../../../router/types';
import { CREATE_RECIPE } from '../../../service/graphql/recipe/createRecipe';

import PreparationStepsEditor from './PreparationStepsEditor';
import IngredientsEditor from './IngredientsEditor';
import { useGetCategories, useGetDifficultyLevels, useGetLabels } from './utils';
import { IFormikProps } from './types';
import { buttonStyles, buttonWrapperStyles, gridContainerStyles, resetButtonStyles } from './styles';

const RecipeFormEditor = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [createRecipe, { data, loading: createRecipeLoading, error }] = useMutation(CREATE_RECIPE);

  const { newRecipe: newRecipeFromStore } = useRecipeState();
  const isNewRecipeMode = useLocation().pathname === EProtectedRoutes.NEW_RECIPE;

  const metaDifficultyLevels = useGetDifficultyLevels();
  const metaCategories = useGetCategories();
  const metaLabels = useGetLabels();

  const newIngredients = newRecipeFromStore?.ingredients || [];
  const newPreparationSteps = newRecipeFromStore?.preparationSteps || [];
  // const editIngredients = storedEditRecipe?.ingredients || [];

  const newIngredient = { _id: '1', name: '', quantity: 1, unit: '' };
  const newPreparationStep: TPreparationStep = {
    _id: '1',
    description: '',
    order: 1,
  };
  const initialIngredients = newIngredients?.length ? [...newIngredients] : [newIngredient];
  const initialPreparationSteps = newPreparationSteps?.length ? [...newPreparationSteps] : [newPreparationStep];

  const [ingredients, setIngredients] = useState<TIngredient[]>(initialIngredients);
  console.log(ingredients);
  const [preparationSteps, setPreparationSteps] = useState<TPreparationStep[]>(initialPreparationSteps);

  const onSubmit = async () => {
    const recipeCreateInput = {
      title: newRecipeFromStore?.title,
      description: newRecipeFromStore?.description,
      imgSrc: newRecipeFromStore?.imgSrc,
      cookingTime: newRecipeFromStore?.cookingTime,
      difficultyLevel: newRecipeFromStore?.difficultyLevel,
      category: newRecipeFromStore?.category,
      labels: newRecipeFromStore?.labels,
      ingredients: newRecipeFromStore?.ingredients,
      preparationSteps: newRecipeFromStore?.preparationSteps,
    };
    try {
      await createRecipe({
        variables: {
          recipeCreateInput,
        },
      });
      console.log('data: ', data);
      navigate(ENonProtectedRoutes.RECIPES);
    } catch (_error: any) {
      console.log(_error.message);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, isSubmitting } = useFormik<IFormikProps>({
    initialValues: {
      title: newRecipeFromStore?.title || '',
      description: newRecipeFromStore?.description || '',
      imgSrc: newRecipeFromStore?.imgSrc || '',
      cookingTime: newRecipeFromStore?.cookingTime || 0,
      difficultyLevel: newRecipeFromStore?.difficultyLevel || undefined,
      category: newRecipeFromStore?.category || undefined,
      labels: newRecipeFromStore?.labels || [],
      ingredients: newRecipeFromStore?.ingredients || [],
      preparationSteps: newRecipeFromStore?.preparationSteps || [],
    },
    onSubmit,
    validationSchema: recipeFormValidationSchema,
  });

  const [debouncedValues, setDebouncedValues] = useState(values);

  const handleFormChange = () => {
    const { title, description, imgSrc, cookingTime, difficultyLevel, category, labels } = values;
    dispatch(
      newRecipe({ ...newRecipeFromStore, title, description, imgSrc, cookingTime, difficultyLevel, category, labels }),
    );
  };

  const handleOnReset = () => {
    dispatch(resetNewRecipe());
  };

  useEffect(() => {
    console.log(values);
    const timer = setTimeout(() => {
      setDebouncedValues(values);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [values]);

  useEffect(() => {
    handleFormChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues]);

  return (
    <Grid component="form" container sx={gridContainerStyles} onSubmit={handleSubmit} onChange={handleFormChange}>
      <Grid item xs={12} sm={12} md={6} lg={8} marginBottom={8}>
        <Typography variant="h6" marginBottom={2} fontStyle={'italic'}>
          Please fill in the form below to create a new recipe
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
              style: { textAlign: 'right', marginRight: '8px', width: '200px' },
            },
          }}
          variant="standard"
          helperText="Please enter cooking time in minutes"
        />
        <Grid item xs={12} sx={{ mt: '16px', mb: '8px' }}>
          <TextField
            value={values.difficultyLevel?.label || ''}
            error={Boolean(errors.difficultyLevel)}
            onChange={event => {
              const selectedDifficulty = metaDifficultyLevels.find(option => option.label === event.target.value);
              handleChange({
                target: {
                  name: 'difficultyLevel',
                  value: selectedDifficulty,
                },
              });
            }}
            onBlur={handleBlur}
            id="difficultyLevel"
            name="difficultyLevel"
            select
            required
            label="Difficulty level"
            helperText="Please select level of difficulty"
            variant="standard"
            defaultValue=""
            disabled={!metaDifficultyLevels.length}
            InputProps={{ style: { width: '240px' } }}
          >
            {metaDifficultyLevels.map(option => (
              <MenuItem key={option.key} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sx={{ mt: '16px', mb: '8px' }}>
          <TextField
            value={values.category?.label || ''}
            error={Boolean(errors.category)}
            onChange={event => {
              const selectedCategory = metaCategories.find(option => option.label === event.target.value);
              handleChange({
                target: {
                  name: 'category',
                  value: selectedCategory,
                },
              });
            }}
            onBlur={handleBlur}
            id="category"
            name="category"
            select
            required
            label="Category"
            helperText="Please select a category"
            variant="standard"
            disabled={!metaCategories.length}
            InputProps={{ style: { width: '240px' } }}
          >
            {metaCategories.map(option => (
              <MenuItem key={option.key} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <IngredientsEditor ingredients={ingredients} setIngredients={setIngredients} />
      <PreparationStepsEditor preparationSteps={preparationSteps} setPreparationSteps={setPreparationSteps} />
      <Grid item xs={12} sm={12} md={6} lg={8} sx={buttonWrapperStyles}>
        {isNewRecipeMode && (
          <Button
            color="error"
            variant="contained"
            type="reset"
            disabled={isSubmitting || createRecipeLoading}
            sx={resetButtonStyles}
            onClick={handleOnReset}
          >
            Reset
          </Button>
        )}
        <Button variant="contained" type="submit" disabled={isSubmitting || createRecipeLoading} sx={buttonStyles}>
          Complete & Share
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecipeFormEditor;
