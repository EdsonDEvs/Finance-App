import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFinancialAssistant } from '../hooks/useFinancialAssistant';

interface FinancialAssistantProps {
  financialContext: {
    balance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    topCategories: string[];
  };
}

export const FinancialAssistant: React.FC<FinancialAssistantProps> = ({ financialContext }) => {
  const [input, setInput] = useState('');
  const {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  } = useFinancialAssistant(financialContext);

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Assistente Financeiro</Typography>
        <IconButton onClick={clearMessages} size="small">
          <DeleteIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              flexDirection: 'column',
              alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 1,
                maxWidth: '80%',
                bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                color: message.sender === 'user' ? 'white' : 'text.primary',
              }}
            >
              <ListItemText primary={message.content} />
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {message.timestamp.toLocaleTimeString()}
              </Typography>
            </Paper>
          </ListItem>
        ))}
        {isLoading && (
          <ListItem sx={{ justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </ListItem>
        )}
      </List>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          multiline
          maxRows={4}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}; 