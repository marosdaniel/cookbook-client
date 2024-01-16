import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { footerLeftGroupStyles, footerRightGroupStyles, footerStyles } from './styles';

export const Footer = () => {
  return (
    <Box component="footer" sx={footerStyles}>
      <Box sx={footerLeftGroupStyles}>
        <Typography variant="subtitle2" component="p">
          Privacy Policy
        </Typography>
        <Typography variant="subtitle2" component="p">
          Cookie Policy
        </Typography>
      </Box>
      <Box sx={footerRightGroupStyles}>
        <Typography variant="subtitle2" component="p">
          Copyright &copy; Cookbook {new Date().getFullYear()} - All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};
export default Footer;
