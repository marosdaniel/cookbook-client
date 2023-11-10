import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { ENonProtectedRoutes, EProtectedRoutes } from '../../router/types';

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface IBottomMenuItem {
  name: string;
  path?: ENonProtectedRoutes | EProtectedRoutes;
  iconComponent: any;
  disabled: boolean;
  key: string;
  action?: () => void;
}
