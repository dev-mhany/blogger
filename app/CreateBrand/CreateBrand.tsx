'use client';
import React, { useState } from 'react';
import { Grid, TextField, Button, Switch, Typography } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import { db, storage } from '../../firebase/firebaseClient';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CreateBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e: { target: { files: string | any[] } }) => {
    if (e.target.files.length) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (imageFile) {
      const storageRef = ref(storage, `brands/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);

      const downloadUrl = await getDownloadURL(storageRef);
      setImageUrl(downloadUrl);

      const newBrand = {
        name: brandName,
        logo: downloadUrl,
        featured: featured,
      };

      await addDoc(collection(db, 'brands'), newBrand);
    } else {
      const newBrand = {
        name: brandName,
        featured: featured,
      };

      await addDoc(collection(db, 'brands'), newBrand);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Create New Brand
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                component="label"
                startIcon={<AddAPhoto />}
              >
                Select Files
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              <Typography variant="caption" display="block">
                Upload 280x280 image
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Switch
                checked={featured}
                onChange={() => setFeatured(!featured)}
                name="featured"
              />
              <Typography>Featured Category</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button type="submit" variant="contained" color="primary">
                Save Category
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default CreateBrand;
