import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, CircularProgress, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AssistantIcon from '@mui/icons-material/Assistant';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/chat', {
        message: input,
        session_id: localStorage.getItem('session_id') || 'demo-session'
      });

      const assistantMessage = { role: 'assistant', content: response.data.answer };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: 'Извините, произошла ошибка. Попробуйте еще раз.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AssistantIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Университетский помощник</Typography>
        </Box>
        
        <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
          {messages.map((msg, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                mb: 1,
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                backgroundColor: msg.role === 'user' ? 'primary.light' : 'grey.100'
              }}
            >
              <Typography variant="body1">{msg.content}</Typography>
            </Paper>
          ))}
          {loading && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="body2">Помощник думает...</Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Задайте вопрос о расписании, документах, правилах..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <IconButton 
            color="primary" 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            sx={{ ml: 1 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
      
      <Typography variant="caption" sx={{ mt: 1, textAlign: 'center', color: 'text.secondary' }}>
        Примеры вопросов: "Когда сессия?", "Где найти учебный план?", "Как подать заявление?"
      </Typography>
    </Box>
  );
};

export default ChatInterface;
