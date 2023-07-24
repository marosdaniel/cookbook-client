export const EMAIL_VALIDATOR_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const PASSWORD_VALIDATOR_REGEX_3_CHAR = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,})/;

// Minimum eight characters, at least one letter and one number
export const PASSWORD_VALIDATOR_REGEX_8_CHAR = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

// Minimum eight characters, at least one letter, one number and one special character
export const PASSWORD_VALIDATOR_REGEX_8_CHAR_SPECIAL = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
