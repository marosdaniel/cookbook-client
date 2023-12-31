import { SvgIconTypeMap } from '@mui/material';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ENonProtectedRoutes, EProtectedRoutes } from '../../router/types';

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface IMenuItemBase {
  name: string;
  path?: ENonProtectedRoutes | EProtectedRoutes;
  iconComponent: OverridableComponent<
    SvgIconTypeMap<
      {
        title?: string | undefined;
      },
      'svg'
    >
  > & { muiName: string };
  disabled: boolean;
  hidden: boolean;
  key: string;
}

export interface IBottomMenuItem extends IMenuItemBase {
  action?: () => void;
}

export interface ITopMenuItem extends IMenuItemBase {}
