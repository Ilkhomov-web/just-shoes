import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Avatar, Stack, Chip } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/ui/Navbar';
import ProtectedRoute from '../../../../../components/ProtectedRoute';

const AdminChat = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
        if (data.length > 0) {
          setSelectedUser(data[0]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`/api/chat?userId=${selectedUser._id}&adminId=admin`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: 'admin',
          receiverId: selectedUser._id,
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
    <ProtectedRoute requireAdmin={true}>
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,165,0,0.15), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1), transparent 35%)'
      }}>
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 700 }}>
            Chat with Users
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, height: '70vh' }}>
            {/* Users List */}
            <Paper sx={{ width: 300, bgcolor: '#1a1a1a', color: 'white', p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Users
              </Typography>
              <Stack spacing={1}>
                {users.map((user) => (
                  <Box
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      borderRadius: 1,
                      bgcolor: selectedUser?._id === user._id ? 'rgba(255,165,0,0.2)' : 'transparent',
                      '&:hover': { bgcolor: 'rgba(255,165,0,0.1)' }
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
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
                          {user.phone}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Chat Area */}
            <Paper sx={{ flex: 1, bgcolor: '#1a1a1a', color: 'white', display: 'flex', flexDirection: 'column' }}>
              {selectedUser ? (
                <>
                  <Box sx={{ p: 2, borderBottom: '1px solid #333' }}>
                    <Typography variant="h6">
                      Chat with {selectedUser.firstName} {selectedUser.lastName}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
                    {messages.map((message, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: message.senderId.role === 'admin' ? 'flex-end' : 'flex-start',
                          mb: 2
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '70%',
                            p: 2,
                            borderRadius: 2,
                            bgcolor: message.senderId.role === 'admin' ? 'orange' : '#333',
                            color: message.senderId.role === 'admin' ? 'black' : 'white'
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
                </>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="h6" sx={{ color: '#aaa' }}>
                    Select a user to start chatting
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Container>
      </Box>
    </ProtectedRoute>
  );
};

export default AdminChat;
