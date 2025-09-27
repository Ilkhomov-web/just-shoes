import React from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../components/ui/Navbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';

const AdminDashboard = () => {
  const router = useRouter();

  const cards = [
    {
      title: 'Total Products',
      value: '156',
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: 'orange' }} />,
      color: 'linear-gradient(135deg, #ff6b35, #f7931e)',
      onClick: () => router.push('/admin-panel/products')
    },
    {
      title: 'Today Sales',
      value: '23',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'green' }} />,
      color: 'linear-gradient(135deg, #4caf50, #8bc34a)',
      onClick: () => router.push('/admin-panel/orders')
    },
    {
      title: 'USD Rate',
      value: '12,450 UZS',
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: 'blue' }} />,
      color: 'linear-gradient(135deg, #2196f3, #03a9f4)',
      onClick: () => {}
    },
    {
      title: 'Total Debt',
      value: '2,450,000 UZS',
      icon: <PersonIcon sx={{ fontSize: 40, color: 'red' }} />,
      color: 'linear-gradient(135deg, #f44336, #ff5722)',
      onClick: () => router.push('/admin-panel/debts')
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,165,0,0.15), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1), transparent 35%)'
    }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 700 }}>
          Admin Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  background: card.color,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                  }
                }}
                onClick={card.onClick}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                        {card.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        {card.title}
                      </Typography>
                    </Box>
                    {card.icon}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
            Quick Actions
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button
              variant="contained"
              onClick={() => router.push('/admin-panel/products/add')}
              sx={{ bgcolor: 'orange', '&:hover': { bgcolor: '#ffa726' } }}
            >
              Add Product
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push('/admin-panel/categories/add')}
              sx={{ bgcolor: 'green', '&:hover': { bgcolor: '#4caf50' } }}
            >
              Add Category
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push('/admin-panel/debts/add')}
              sx={{ bgcolor: 'red', '&:hover': { bgcolor: '#f44336' } }}
            >
              Add Debt
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
