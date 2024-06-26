import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Typography, CardActions, CardActionArea, IconButton } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import { IProps } from './types';
import { cardStyles, cardActionsStyle } from './styles';

const RecipeCard = ({ title, description, createdBy, id }: IProps) => {
  // TODO: Add image or placeholder image
  return (
    <Card sx={cardStyles} variant="elevation">
      <CardActionArea component={RouterLink} to={`/recipes/${id}`}>
        <CardHeader title={title} subheader={`from ${createdBy}'s kitchen `} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={cardActionsStyle}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
