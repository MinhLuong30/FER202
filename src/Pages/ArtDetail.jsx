import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Container, Button } from '@mui/material';
import MainLayout from '../Layouts/MainLayout';
import useFetchArtDataById from '../Component/Data/useFetchDatabyId';


function ArtDetail() {
    const location = useLocation();
    const navigate = useNavigate();
  const id = location.state;
  const { art, loading, error } = useFetchArtDataById(id);

  useEffect(() => {
    if (error) {
      navigate('/');
    }
  }, [error, navigate]);

  if (loading) return <CircularProgress />;

  return (
    <MainLayout>
        <br/>
    <Container>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {art.artName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Brand: {art.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {art.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                GlassSurface: {art.glassSurface ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {art.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Limted Time Deal: {art.limitedTimeDeal}
              </Typography>
            </CardContent>
            <Link to='/'>
                <Button style={{marginLeft:'15px'}} variant="outlined" >
                    Back
                </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="100%"
              image={art.image}
              alt={art.artName}
            />
          </Grid>
        </Grid>
      </Card>
    </Container>
    </MainLayout>
  );
}

export default ArtDetail;
