import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Chip, Stack, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/ui/Navbar';

const AddProduct = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discountPercent: 0,
    description: '',
    sizes: [],
    colors: [],
    stockStatus: 'in_stock',
    category: ''
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const allSizes = [38, 39, 40, 41, 42, 43, 44];
  const allColors = ['black', 'white', 'red', 'blue', 'green', 'orange', 'gray', 'navy', 'yellow'];
  const categories = ['Shoes', 'T-shirts', 'Pants', 'Hats', 'Jackets'];

  const handleSizeToggle = (size) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleColorToggle = (color) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newColors);
    setFormData({ ...formData, colors: newColors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product data:', formData);
    router.push('/admin-panel/products');
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
          Add New Product
        </Typography>

        <Card sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
          <CardContent sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Price ($)"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Discount %"
                    type="number"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: parseInt(e.target.value) || 0 })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'white' }}>Category</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      sx={{ color: 'white' }}
                    >
                      {categories.map(cat => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                    Available Sizes
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {allSizes.map(size => (
                      <Chip
                        key={size}
                        label={size}
                        onClick={() => handleSizeToggle(size)}
                        variant={selectedSizes.includes(size) ? 'filled' : 'outlined'}
                        sx={{
                          bgcolor: selectedSizes.includes(size) ? 'orange' : 'transparent',
                          color: selectedSizes.includes(size) ? 'black' : 'white',
                          borderColor: '#333'
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                    Available Colors
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {allColors.map(color => (
                      <Chip
                        key={color}
                        label={color}
                        onClick={() => handleColorToggle(color)}
                        variant={selectedColors.includes(color) ? 'filled' : 'outlined'}
                        sx={{
                          bgcolor: selectedColors.includes(color) ? 'orange' : 'transparent',
                          color: selectedColors.includes(color) ? 'black' : 'white',
                          borderColor: '#333'
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'white' }}>Stock Status</InputLabel>
                    <Select
                      value={formData.stockStatus}
                      onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                      sx={{ color: 'white' }}
                    >
                      <MenuItem value="in_stock">In Stock</MenuItem>
                      <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                      <MenuItem value="coming_soon">Coming Soon</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: 'orange', '&:hover': { bgcolor: '#ffa726' } }}
                    >
                      Add Product
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => router.push('/admin-panel/products')}
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

export default AddProduct;
