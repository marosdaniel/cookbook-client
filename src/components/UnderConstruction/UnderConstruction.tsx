import { TypeAnimation } from 'react-type-animation';
import { Box, Typography } from '@mui/material';
import { boxStyles, titleStyle } from './styles';

const UnderConstruction = () => {
  return (
    <Box sx={boxStyles} component="section" id="page-under-construcion">
      <Typography sx={titleStyle} component="h2">
        <TypeAnimation
          sequence={['Page', 700, 'Page under', 700, 'Page under construction ...', 2500]}
          speed={50}
          cursor={true}
          repeat={Infinity}
        />
      </Typography>
    </Box>
  );
};

export default UnderConstruction;
