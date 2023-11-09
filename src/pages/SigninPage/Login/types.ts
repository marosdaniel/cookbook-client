import React, { SetStateAction } from 'react';

export interface IProps {
  setIsLogin: React.Dispatch<SetStateAction<boolean>>;
}

export interface IFormikProps {
  email: string;
  password: string;
}
