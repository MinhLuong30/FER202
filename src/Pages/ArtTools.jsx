import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, SpeedDial, SpeedDialIcon } from '@mui/material';

import EditNoteIcon from '@mui/icons-material/EditNote';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteNoti from '../Component/Modal/DeleteNoti';
import useFetchArtData from '../Data/useFetchArtData';

function ArtTools() {
  const { art, loading, error, fetchArtData } = useFetchArtData();
  const [selectedArt, setSelectedArt] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDelete = (selectedart) => {
    setOpenDelete(true);
    setSelectedArt(selectedart);
  };

  const handleOpenUpdate = (selectedart) => {
    setOpenUpdate(true);
    setSelectedArt(selectedart);
  };

  const handleClose = () => {
    setOpenDelete(false);
    setOpenUpdate(false);
    setSelectedArt(null);
  };

  const sortedArts = art.slice().sort((a, b) => b.id - a.id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <MainLayout>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Art Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>GlassSurface</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Limited Time Deal</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedArts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((art) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={art.id}>
                  <TableCell>{art.id}</TableCell>
                  <TableCell>{art.artName}</TableCell>
                  <TableCell>{art.price}</TableCell>
                  <TableCell>
                    <Chip icon={art.glassSurface} label={art.glassSurface ? "Yes" : "No"} variant="outlined" />
                  </TableCell>
                  <TableCell>{art.brand}</TableCell>
                  <TableCell>{art.limitedTimeDeal}</TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      rows={2}
                      value={art.image}
                      variant="outlined"
                      readOnly
                    />
                  </TableCell>
                  <TableCell>
                    <Button color='secondary' onClick={() => handleOpenDelete(art)}>
                      <ClearIcon />
                    </Button>
                    <Button color='secondary' onClick={() => handleOpenUpdate(art)}>
                      <EditNoteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={art.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DeleteNoti open={openDelete} handleClose={handleClose} student={selectedArt} refreshData={fetchArtData} />
    
      <SpeedDial
        ariaLabel="Add Art"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => navigate('/add')}
      />
    </MainLayout>
  );
}

export default ArtTools;
