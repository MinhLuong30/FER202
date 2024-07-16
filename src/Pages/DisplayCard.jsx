
import { Card, CardContent, Typography, CardMedia, Chip, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ArtCard({ art }) {
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{minHeight:300, maxHeight:300}}
        image={art.image}
        alt={art.artName}
      />
      <CardContent sx={{minHeight:250, maxHeight:250}}>
        <Typography gutterBottom variant="h5" component="div">
          {art.artName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {art.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Brand: {art.brand}
        </Typography>
        <Chip
          label={art.glassSurface ? "GlassSurface" : "Non-GlassSurface"}
          variant="outlined"
        />
      </CardContent>
      <CardActions>
        <Link to='/detail'
               state={art.id}  >
            <Button>
                View Detail
            </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default ArtCard;
