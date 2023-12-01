import { ERole } from '../../../../store/Auth/types';
import { adminUserStyles, bloggerUserStyles, userUserStyles } from '../UnitsTab/styles';

export const getUserRoleStyles = (role: ERole) => {
  switch (role) {
    case ERole.ADMIN:
      return adminUserStyles;
    case ERole.BLOGGER:
      return bloggerUserStyles;
    case ERole.USER:
    default:
      return userUserStyles;
  }
};
