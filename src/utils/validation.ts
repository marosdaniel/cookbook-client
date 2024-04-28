import * as Yup from 'yup';

export const EMAIL_VALIDATOR_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const PASSWORD_VALIDATOR_REGEX_3_CHAR = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,})/;

// Minimum five characters, at least one letter and one number
export const WEAK_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/;

// Minimum eight characters, at least one letter and one number
export const PASSWORD_VALIDATOR_REGEX_8_CHAR = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

// Minimum eight characters, at least one letter, one number and one special character
export const PASSWORD_VALIDATOR_REGEX_8_CHAR_SPECIAL = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
      'Password must contain at least 5 characters, including at least 1 number',
    )
    .required('Password is required'),
});

export const newPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(5, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
      'Password must contain at least 5 characters, including at least 1 number',
    )
    .required('Password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const resetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

export const customValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[^0-9]+$/, 'should not contain numbers')
    .min(2, 'Too Short!')
    .required('Required'),
  lastName: Yup.string()
    .matches(/^[^0-9]+$/, 'should not contain numbers')
    .min(2, 'Too Short!')
    .required('Required'),
  ...loginValidationSchema.fields,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  userName: Yup.string().min(3, 'Minumum 3 chars needed').max(20, 'Maximum 20 chars allowed').required('Required'),
});

export const recipeFormValidationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  imgSrc: Yup.string().url('Invalid url'),
  cookingTime: Yup.number().required('Required'),
  difficultyLevel: Yup.object().shape({
    key: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    label: Yup.string().required('Required'),
  }),
  category: Yup.object().shape({
    key: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    label: Yup.string().required('Required'),
  }),
  ingredients: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      quantity: Yup.number().required('Required'),
      unit: Yup.string().required('Required'),
    }),
  ),
  steps: Yup.array().of(Yup.string().required('Required')),
  servings: Yup.number().required('Required'),
  youtubeLink: Yup.string().url('Invalid url'),
});
