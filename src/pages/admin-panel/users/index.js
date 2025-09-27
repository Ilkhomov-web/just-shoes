import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, Card, CardContent, Avatar, Chip } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/ui/Navbar';
import ProtectedRoute from '../../../../../components/ProtectedRoute';

const UsersManagement = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setUsers(prev => prev.filter(user => user._id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a'
      }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Loading users...
        </Typography>
      </Box>
    );
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,165,0,0.15), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1), transparent 35%)'
      }}>
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
              Users Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => router.push('/admin-panel/users/add')}
              sx={{ bgcolor: 'green', '&:hover': { bgcolor: '#4caf50' } }}
            >
              Add User
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>User</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Phone</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Address</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Gender</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell sx={{ color: 'white' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'orange' }}>
                          {user.userImage ? (
                            <img src={user.userImage} alt={user.firstName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            `${user.firstName[0]}${user.lastName[0]}`
                          )}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {user.firstName} {user.lastName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#aaa' }}>
                            {user.email || 'No email'}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {user.phone}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {user.address}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {user.gender}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.isActive ? 'Active' : 'Inactive'}
                        color={user.isActive ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => router.push(`/admin-panel/users/edit/${user._id}`)}
                          sx={{ color: 'orange' }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(user._id)}
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
    </ProtectedRoute>
  );
};

export default UsersManagement;
