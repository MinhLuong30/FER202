import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useDeleteData from '../Data/useDeleteData';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteNoti({ open, handleClose, art, refreshData }) {
  const { deleteData, loading, error } = useDeleteData();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleDelete = async () => {
    const success = await deleteData(art.id);
    if (success) {
      handleClose();
      setSnackbarOpen(true);
      refreshData(); 
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Do you want to delete {art?.artName}?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <Grid container spacing={2} justifyContent="end">
                <Grid item xs={6}></Grid>
                <Grid justifyContent="space-between" display="flex" item xs={6}>
                  <Button onClick={handleDelete} variant="outlined" color="primary" disabled={loading}>
                    {loading ? 'Deleting...' : 'Yes'}
                  </Button>
                  <Button onClick={handleClose} variant="outlined" color="error">
                    No
                  </Button>
                </Grid>
              </Grid>
              {error && <Typography color="error">{error}</Typography>}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Art deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
