import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Card, CardContent, Stack, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import Navbar from '../components/ui/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.phone, formData.password);
    
    if (result.success) {
      if (formData.phone === 'laziz2211' && formData.password === '3112211') {
        router.push('/admin-panel');
      } else {
        router.push('/products');
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,165,0,0.15), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1), transparent 35%)'
    }}>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Card sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 700 }}>
              Login
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{ bgcolor: 'orange', '&:hover': { bgcolor: '#ffa726' }, py: 1.5 }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Button
                  variant="text"
                  onClick={() => router.push('/auth/signup')}
                  sx={{ color: 'white' }}
                >
                  Don't have an account? Sign up
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
