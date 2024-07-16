import { useEffect } from 'react';
import { Grid, Container, CircularProgress, Typography } from '@mui/material';
import MainLayout from '../Layouts/MainLayout';
import useFetchArtData from '../Component/Data/useFetchArtData';
import ArtCard from './DisplayCard';

function Home() {
  const { art, loading, error, fetchArtData } = useFetchArtData();

  useEffect(() => {
    fetchArtData();
  }, [fetchArtData]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;


  return (
    <MainLayout>
    <br/>
      <Container>
        <Grid container spacing={4}>
          {art.map((art) => (
            <Grid item key={art.id} xs={12} sm={6} md={4}>
              <ArtCard art={art} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default Home;
