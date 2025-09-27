import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Stack, Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/ui/Navbar';
import { PhotoCamera, Description } from '@mui/icons-material';

const AddDebt = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: '',
    amount: '',
    currency: 'UZS',
    status: 'active',
    notes: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [passportPreview, setPassportPreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePassportUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPassportPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Debt data:', formData);
    router.push('/admin-panel/debts');
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
          Add New Debt
        </Typography>

        <Card sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
          <CardContent sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number 1"
                    value={formData.phone1}
                    onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number 2"
                    value={formData.phone2}
                    onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'white' }}>Currency</InputLabel>
                    <Select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      sx={{ color: 'white' }}
                    >
                      <MenuItem value="UZS">UZS</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                  />
                </Grid>
                
                {/* Image Upload Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Customer Photo
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="image-upload"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload">
                      <Button variant="outlined" component="span" startIcon={<PhotoCamera />} sx={{ color: 'white', borderColor: '#333' }}>
                        Upload Photo
                      </Button>
                    </label>
                    {imagePreview && (
                      <Avatar
                        src={imagePreview}
                        sx={{ width: 80, height: 80 }}
                      />
                    )}
                  </Box>
                </Grid>

                {/* Passport Upload Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Passport Document
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="passport-upload"
                      type="file"
                      onChange={handlePassportUpload}
                    />
                    <label htmlFor="passport-upload">
                      <Button variant="outlined" component="span" startIcon={<Description />} sx={{ color: 'white', borderColor: '#333' }}>
                        Upload Passport
                      </Button>
                    </label>
                    {passportPreview && (
                      <Box
                        component="img"
                        src={passportPreview}
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
                      sx={{ bgcolor: 'red', '&:hover': { bgcolor: '#f44336' } }}
                    >
                      Add Debt
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => router.push('/admin-panel/debts')}
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

export default AddDebt;
