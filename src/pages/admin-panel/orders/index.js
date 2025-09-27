import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Stack, Card, CardContent } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Navbar from '../../components/ui/Navbar';

const OrdersManagement = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      customerPhone: '+998901234567',
      products: ['Nike Air Zoom Pegasus', 'Adidas Ultraboost 22'],
      total: 279.98,
      status: 'pending',
      date: '2024-01-15',
      address: 'Tashkent, Chilonzor'
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      customerPhone: '+998907654321',
      products: ['Puma Deviate Nitro'],
      total: 139.99,
      status: 'completed',
      date: '2024-01-14',
      address: 'Tashkent, Yunusabad'
    },
    {
      id: 'ORD-003',
      customerName: 'Bob Johnson',
      customerPhone: '+998901112233',
      products: ['New Balance 990v5', 'Converse Chuck Taylor'],
      total: 259.98,
      status: 'shipped',
      date: '2024-01-13',
      address: 'Tashkent, Shayxontohur'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const handleDelete = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'completed': return 'success';
      case 'shipped': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,165,0,0.15), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1), transparent 35%)'
    }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 700 }}>
          Orders Management
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Order ID</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Customer</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Products</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Total</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell sx={{ color: 'white' }}>{order.id}</TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        <Box>
                          <Typography variant="subtitle2">{order.customerName}</Typography>
                          <Typography variant="caption" sx={{ color: '#aaa' }}>
                            {order.customerPhone}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        <Typography variant="body2">
                          {order.products.length} item(s)
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        {order.date}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            sx={{ color: 'orange' }}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(order.id)}
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
            <Card sx={{ bgcolor: '#1a1a1a', color: 'white', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order Statistics
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Total Orders:</Typography>
                    <Typography sx={{ color: 'orange' }}>{orders.length}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Pending:</Typography>
                    <Typography sx={{ color: 'orange' }}>
                      {orders.filter(o => o.status === 'pending').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Completed:</Typography>
                    <Typography sx={{ color: 'green' }}>
                      {orders.filter(o => o.status === 'completed').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Total Revenue:</Typography>
                    <Typography sx={{ color: 'green' }}>
                      ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
                    </Typography>
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

export default OrdersManagement;
