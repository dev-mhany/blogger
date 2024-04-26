'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Switch,
  Button,
  Pagination,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  Delete,
  Visibility,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseClient';
import CreateBrand from './CreateBrand';

const ProductBrands = () => {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [isCreateBrandOpen, setIsCreateBrandOpen] = useState(false);
  const rowsPerPage = 10;

  useEffect(() => {
    const brandQuery = query(collection(db, 'brands'));
    const unsubscribe = onSnapshot(brandQuery, (snapshot) => {
      const brandData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBrands(brandData);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleFeatured = async (brand: never) => {
    const brandDoc = doc(db, 'brands', brand.id);
    await updateDoc(brandDoc, { featured: !brand.featured });
  };

  const handleDeleteBrand = async (brandId: string) => {
    const brandDoc = doc(db, 'brands', brandId);
    await deleteDoc(brandDoc);
  };

  const handleAddBrand = () => {
    setIsCreateBrandOpen(true);
  };

  const handleCreateBrandClose = () => {
    setIsCreateBrandOpen(false);
  };

  const handlePageChange = (
    event: any,
    value: React.SetStateAction<number>
  ) => {
    setPage(value);
  };

  const displayedBrands = brands.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Product Brands
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Button
          startIcon={<Add />}
          onClick={handleAddBrand}
          variant="contained"
          color="primary"
        >
          Add Brand
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedBrands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.id}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  {brand.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{ height: '30px' }}
                    />
                  ) : (
                    'No Logo'
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={brand.featured}
                    onChange={() => handleToggleFeatured(brand)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteBrand(brand.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

      <Grid item xs={12}>
        <Pagination
          count={Math.ceil(brands.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          color="primary"
        />
      </Grid>

      {/* CreateBrand Modal */}
      <Dialog
        open={isCreateBrandOpen}
        onClose={handleCreateBrandClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create a New Brand</DialogTitle>
        <DialogContent>
          <CreateBrand /> {/* The CreateBrand component */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateBrandClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ProductBrands;
