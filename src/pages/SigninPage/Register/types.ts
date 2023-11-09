import React, { SetStateAction } from 'react';

export interface IProps {
  setIsLogin: React.Dispatch<SetStateAction<boolean>> | (() => void);
}

export interface IFormikProps {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
