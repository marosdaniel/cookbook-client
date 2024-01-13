import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Button, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '../../../store/hooks';
import { recipeFormValidationSchema } from '../../../utils/validation';
import { newRecipe, resetEditRecipe, resetNewRecipe, setEditRecipe } from '../../../store/Recipe/recipe';
import { useRecipeState } from '../../../store/Recipe';
import { TIngredient, TPreparationStep } from '../../../store/Recipe/types';
import { ENonProtectedRoutes } from '../../../router/types';
import { CREATE_RECIPE, EDIT_RECIPE } from '../../../service/graphql/recipe/createRecipe';

import ErrorMessage from '../../ErrorMessage';
import LoadingBar from '../../LoadingBar';
import PageTitle from '../../stylingComponents/PageTitle';

import PreparationStepsEditor from './PreparationStepsEditor';
import IngredientsEditor from './IngredientsEditor';
import {
  cleanCategory,
  cleanDifficultyLevel,
  cleanIngredients,
  cleanLabels,
  cleanPreparationSteps,
  getInitialValues,
  useGetCategories,
  useGetDifficultyLevels,
} from './utils';
import { buttonStyles, buttonWrapperStyles, gridContainerStyles, resetButtonStyles } from './styles';
import { IFormikProps, IProps } from './types';

const RecipeFormEditor = ({ isEditMode, setIsEditMode }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [createRecipe, { loading: createRecipeLoading, error: createRecipeError }] = useMutation(CREATE_RECIPE);
  const [editRecipe, { loading: editRecipeLoading, error: editRecipeError }] = useMutation(EDIT_RECIPE);

  const { newRecipe: newRecipeFromStore } = useRecipeState();
  const { editRecipe: editRecipeFromStore } = useRecipeState();

  const metaDifficultyLevels = useGetDifficultyLevels();
  const metaCategories = useGetCategories();

  const newIngredients = newRecipeFromStore?.ingredients || [];
  const newPreparationSteps = newRecipeFromStore?.preparationSteps || [];
  const editIngredients = editRecipeFromStore?.ingredients || [];
  const editPreparationSteps = editRecipeFromStore?.preparationSteps || [];

  const newIngredient = { localId: '1', name: '', quantity: 1, unit: '' };
  const newPreparationStep: TPreparationStep = {
    description: '',
    order: 1,
  };
  const initialIngredients = isEditMode
    ? editIngredients
    : newIngredients?.length
      ? [...newIngredients]
      : [newIngredient];

  const initialPreparationSteps = isEditMode
    ? editPreparationSteps
    : newPreparationSteps?.length
      ? [...newPreparationSteps]
      : [newPreparationStep];

  const [ingredients, setIngredients] = useState<TIngredient[]>(initialIngredients);
  const [preparationSteps, setPreparationSteps] = useState<TPreparationStep[]>(initialPreparationSteps);

  const onSubmit = async () => {
    const inputValues = isEditMode ? editRecipeFromStore : newRecipeFromStore;

    const recipeInput = {
      title: inputValues?.title,
      description: inputValues?.description,
      imgSrc: inputValues?.imgSrc,
      cookingTime: inputValues?.cookingTime,
      difficultyLevel: cleanDifficultyLevel(inputValues?.difficultyLevel),
      category: cleanCategory(inputValues?.category),
      labels: cleanLabels(inputValues?.labels || []),
      ingredients: cleanIngredients(inputValues?.ingredients),
      preparationSteps: cleanPreparationSteps(inputValues?.preparationSteps),
      servings: inputValues?.servings || 1,
    };

    try {
      if (!isEditMode) {
        await createRecipe({
          variables: {
            recipeCreateInput: recipeInput,
          },
        }).then(() => {
          // dispatch a success message for the snack bar
        });
      } else {
        await editRecipe({
          variables: {
            editRecipeId: editRecipeFromStore?._id,
            recipeEditInput: recipeInput,
          },
        }).then(() => {
          // dispatch a success message for the snack bar
        });
      }

      navigate(ENonProtectedRoutes.RECIPES);
      dispatch(resetNewRecipe());
      dispatch(resetEditRecipe());
    } catch (_error) {
      console.log((_error as Error).message);
      // dispatch an error message for the snack bar
    }
  };

  const initialValues = getInitialValues(isEditMode, newRecipeFromStore, editRecipeFromStore);

  const { values, handleChange, handleSubmit, handleBlur, errors, isSubmitting } = useFormik<IFormikProps>({
    initialValues,
    onSubmit,
    validationSchema: recipeFormValidationSchema,
  });

  const [debouncedValues, setDebouncedValues] = useState(values);

  const handleFormChange = () => {
    const { title, description, imgSrc, cookingTime, difficultyLevel, category, labels } = debouncedValues;
    if (!isEditMode) {
      dispatch(
        newRecipe({
          ...newRecipeFromStore,
          title,
          description,
          imgSrc,
          cookingTime,
          difficultyLevel,
          category,
          labels,
        }),
      );
    } else if (difficultyLevel !== undefined && category !== undefined && editRecipeFromStore?._id !== undefined) {
      dispatch(
        setEditRecipe({
          ...editRecipeFromStore,
          title,
          description,
          imgSrc,
          cookingTime,
          difficultyLevel,
          category,
          labels,
        }),
      );
    }
  };

  const handleOnReset = () => {
    if (isEditMode) {
      dispatch(resetEditRecipe());
      setIsEditMode?.(false);
    }
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

  if (createRecipeLoading || editRecipeLoading) {
    return <LoadingBar />;
  }

  if (createRecipeError || editRecipeError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle title={isEditMode ? 'Your Recipe Your Rules: Time to Edit' : 'Start Crafting'} />
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
        <IngredientsEditor ingredients={ingredients} setIngredients={setIngredients} isEditMode={isEditMode} />
        <PreparationStepsEditor preparationSteps={preparationSteps} setPreparationSteps={setPreparationSteps} />
        <Grid item xs={12} sm={12} md={6} lg={8} sx={buttonWrapperStyles}>
          {
            <Button
              color={isEditMode ? 'info' : 'error'}
              variant="contained"
              type="reset"
              disabled={isSubmitting || createRecipeLoading || editRecipeLoading}
              sx={resetButtonStyles}
              onClick={handleOnReset}
            >
              {isEditMode ? 'Back' : 'Reset'}
            </Button>
          }
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting || createRecipeLoading || editRecipeLoading}
            sx={buttonStyles}
          >
            {isEditMode ? 'Save' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RecipeFormEditor;
