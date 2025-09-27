import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Card, CardContent, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../../components/ui/Navbar';
import { PhotoCamera } from '@mui/icons-material';

const AddCategory = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData({ ...formData, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Category data:', formData);
    router.push('/admin-panel/categories');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,165,0,0.15), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1), transparent 35%)'
    }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 700 }}>
          Add New Category
        </Typography>

        <Card sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
          <CardContent sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Category Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                    required
                  />
                </Grid>
                
                {/* Image Upload Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Category Image
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="category-image-upload"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="category-image-upload">
                      <Button variant="outlined" component="span" startIcon={<PhotoCamera />} sx={{ color: 'white', borderColor: '#333' }}>
                        Upload Image
                      </Button>
                    </label>
                    {imagePreview && (
                      <Box
                        component="img"
                        src={imagePreview}
                        sx={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 1, border: '1px solid #333' }}
                      />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: 'green', '&:hover': { bgcolor: '#4caf50' } }}
                    >
                      Add Category
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => router.push('/admin-panel/categories')}
                      sx={{ color: 'white', borderColor: '#333' }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AddCategory;
