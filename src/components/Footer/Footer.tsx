import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { footerLeftGroupStyles, footerRightGroupStyles, footerStyles, linkStyles } from './styles';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ENonProtectedRoutes } from '../../router/types';

export const Footer = () => {
  return (
    <Box component="footer" sx={footerStyles}>
      <Box sx={footerLeftGroupStyles}>
        <Link component={RouterLink} to={ENonProtectedRoutes.PRIVACY_POLICY} variant="subtitle2" sx={linkStyles}>
          Privacy Policy
        </Link>
        <Link component={RouterLink} to={ENonProtectedRoutes.COOKIE_POLICY} variant="subtitle2" sx={linkStyles}>
          Cookie Policy
        </Link>
      </Box>
      <Box sx={footerRightGroupStyles}>
        <Typography variant="subtitle2">
          Copyright &copy; Cookbook {new Date().getFullYear()} - All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};
export default Footer;
