import React, { useState } from 'react';
import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, Card, CardContent } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Navbar from '../../components/ui/Navbar';
import { CATEGORIES } from '../../products/CategoryData';

const CategoriesManagement = () => {
  const router = useRouter();
  const [categories, setCategories] = useState(CATEGORIES);

  const handleDelete = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,165,0,0.15), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1), transparent 35%)'
    }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
            Categories Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/admin-panel/categories/add')}
            sx={{ bgcolor: 'green', '&:hover': { bgcolor: '#4caf50' } }}
          >
            Add Category
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Category</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Description</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Products Count</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell sx={{ color: 'white' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            component="img"
                            src={category.image}
                            alt={category.name}
                            sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover' }}
                          />
                          <Typography variant="subtitle2">
                            {category.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        {category.description}
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        {Math.floor(Math.random() * 20) + 5} products
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => router.push(`/admin-panel/categories/edit/${category.id}`)}
                            sx={{ color: 'orange' }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(category.id)}
                            sx={{ color: 'red' }}
                          >
                            <Delete />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Category Statistics
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Total Categories:</Typography>
                    <Typography sx={{ color: 'green' }}>{categories.length}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Most Popular:</Typography>
                    <Typography sx={{ color: 'orange' }}>Shoes</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Least Popular:</Typography>
                    <Typography sx={{ color: 'red' }}>Hats</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoriesManagement;
