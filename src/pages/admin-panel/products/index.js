import React, { useState } from 'react';
import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Stack } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/ui/Navbar';
import { PRODUCTS } from '../../../products/ProductData';

const ProductsManagement = () => {
  const router = useRouter();
  const [products, setProducts] = useState(PRODUCTS);

  const handleStatusChange = (id, newStatus) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stockStatus: newStatus } : p));
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
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
            Products Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/admin-panel/products/add')}
            sx={{ bgcolor: 'orange', '&:hover': { bgcolor: '#ffa726' } }}
          >
            Add Product
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Price</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Discount</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell sx={{ color: 'white' }}>
                    <Box>
                      <Typography variant="subtitle2">{product.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#aaa' }}>
                        {product.sizes.join(', ')} | {product.colors.join(', ')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {product.discountPercent > 0 ? `${product.discountPercent}%` : 'No discount'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.stockStatus.replace('_', ' ')}
                      color={product.stockStatus === 'in_stock' ? 'success' : product.stockStatus === 'out_of_stock' ? 'error' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => router.push(`/admin-panel/products/edit/${product.id}`)}
                        sx={{ color: 'orange' }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(product.id)}
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
      </Container>
    </Box>
  );
};

export default ProductsManagement;
