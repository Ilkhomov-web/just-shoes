import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Stack, Card, CardContent, Avatar } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/ui/Navbar';

const DebtsManagement = () => {
  const router = useRouter();
  const [debts, setDebts] = useState([
    {
      id: 'DEBT-001',
      firstName: 'John',
      lastName: 'Doe',
      phone1: '+998901234567',
      phone2: '+998907654321',
      amount: 500000,
      currency: 'UZS',
      status: 'active',
      date: '2024-01-15',
      notes: 'Shoes purchase on credit'
    },
    {
      id: 'DEBT-002',
      firstName: 'Jane',
      lastName: 'Smith',
      phone1: '+998901112233',
      phone2: '+998904445566',
      amount: 750000,
      currency: 'UZS',
      status: 'paid',
      date: '2024-01-10',
      notes: 'Multiple items on credit'
    },
    {
      id: 'DEBT-003',
      firstName: 'Bob',
      lastName: 'Johnson',
      phone1: '+998901234567',
      phone2: '',
      amount: 300000,
      currency: 'UZS',
      status: 'overdue',
      date: '2024-01-05',
      notes: 'Overdue payment'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setDebts(prev => prev.map(debt => debt.id === id ? { ...debt, status: newStatus } : debt));
  };

  const handleDelete = (id) => {
    setDebts(prev => prev.filter(debt => debt.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'warning';
      case 'paid': return 'success';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const totalDebt = debts
    .filter(d => d.status === 'active' || d.status === 'overdue')
    .reduce((sum, debt) => sum + debt.amount, 0);

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
            Debts Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/admin-panel/debts/add')}
            sx={{ bgcolor: 'red', '&:hover': { bgcolor: '#f44336' } }}
          >
            Add Debt
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Customer</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Contact</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Amount</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {debts.map((debt) => (
                    <TableRow key={debt.id}>
                      <TableCell sx={{ color: 'white' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'orange' }}>
                            {debt.firstName[0]}{debt.lastName[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">
                              {debt.firstName} {debt.lastName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#aaa' }}>
                              {debt.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        <Box>
                          <Typography variant="body2">{debt.phone1}</Typography>
                          {debt.phone2 && (
                            <Typography variant="body2">{debt.phone2}</Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        {debt.amount.toLocaleString()} {debt.currency}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={debt.status}
                          color={getStatusColor(debt.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        {debt.date}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => router.push(`/admin-panel/debts/edit/${debt.id}`)}
                            sx={{ color: 'orange' }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(debt.id)}
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
                  Debt Statistics
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Total Debts:</Typography>
                    <Typography sx={{ color: 'orange' }}>{debts.length}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Active:</Typography>
                    <Typography sx={{ color: 'orange' }}>
                      {debts.filter(d => d.status === 'active').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Overdue:</Typography>
                    <Typography sx={{ color: 'red' }}>
                      {debts.filter(d => d.status === 'overdue').length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Total Amount:</Typography>
                    <Typography sx={{ color: 'red' }}>
                      {totalDebt.toLocaleString()} UZS
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

export default DebtsManagement;
