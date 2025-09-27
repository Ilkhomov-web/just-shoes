import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Avatar, Stack } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import Navbar from '../components/ui/Navbar';

const UserChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/chat?userId=${user.id}&adminId=admin`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMessages();
    }
  }, [user]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user?.id) return;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: 'admin',
          message: newMessage
        }),
      });

      if (response.ok) {
        const message = await response.json();
        setMessages(prev => [...prev, message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
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
          Loading chat...
        </Typography>
      </Box>
    );
  }

  return (
    <ProtectedRoute>
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,165,0,0.15), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1), transparent 35%)'
      }}>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 700 }}>
            Chat with Admin
          </Typography>

          <Paper sx={{ bgcolor: '#1a1a1a', color: 'white', height: '70vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #333' }}>
              <Typography variant="h6">
                Chat with Admin Support
              </Typography>
            </Box>
            
            <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: message.senderId.role === 'admin' ? 'flex-start' : 'flex-end',
                    mb: 2
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: message.senderId.role === 'admin' ? '#333' : 'orange',
                      color: message.senderId.role === 'admin' ? 'white' : 'black'
                    }}
                  >
                    <Typography variant="body2">
                      {message.message}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7, mt: 1, display: 'block' }}>
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid #333' }}>
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
                />
                <Button
                  variant="contained"
                  onClick={sendMessage}
                  sx={{ bgcolor: 'orange', '&:hover': { bgcolor: '#ffa726' } }}
                >
                  <Send />
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ProtectedRoute>
  );
};

export default UserChat;
