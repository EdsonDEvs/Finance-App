import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface FinancialAssistantProps {
  financialContext: {
    balance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    topSpendingCategories: Array<{
      category: string;
      amount: number;
    }>;
  };
}

const FinancialAssistant: React.FC<FinancialAssistantProps> = ({
  financialContext,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulando uma resposta do assistente
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            role: 'assistant',
            content: `Analisando sua situação financeira:
            - Saldo atual: R$ ${financialContext.balance}
            - Receita mensal: R$ ${financialContext.monthlyIncome}
            - Despesa mensal: R$ ${financialContext.monthlyExpenses}

            Com base nos seus dados, posso sugerir algumas estratégias para melhorar sua gestão financeira.`,
          });
        }, 1000)
      );

      setMessages((prev) => [...prev, response as Message]);
    } catch (error) {
      console.error('Erro ao obter resposta:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Assistente Financeiro
      </Typography>
      <Paper
        sx={{
          flex: 1,
          mb: 2,
          p: 2,
          overflow: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor: message.role === 'user' ? '#e3f2fd' : '#fff',
              }}
            >
              <Typography variant="body1">{message.content}</Typography>
            </Paper>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Paper>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default FinancialAssistant;
