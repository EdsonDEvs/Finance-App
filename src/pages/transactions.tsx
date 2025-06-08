import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { transactionService, Transaction } from '../services/transactionService';
import ProtectedRoute from '../components/ProtectedRoute';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Box, TextField, Button, MenuItem, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

const Transactions = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    if (currentUser) {
      loadTransactions();
    }
  }, [currentUser]);

  const loadTransactions = async () => {
    if (currentUser) {
      const userTransactions = await transactionService.getByUser(currentUser.uid);
      setTransactions(userTransactions);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!description || !amount || !category) {
      setError('Preencha todos os campos.');
      return;
    }
    if (!currentUser) return;
    try {
      await transactionService.add({
        userId: currentUser.uid,
        description,
        amount: Number(amount),
        type,
        category,
        date: new Date().toISOString(),
      });
      setDescription('');
      setAmount('');
      setCategory('');
      setType('income');
      setSuccess('Transação adicionada com sucesso!');
      loadTransactions();
    } catch (err: any) {
      setError(err.message || 'Erro ao adicionar transação.');
    }
  };

  const handleDelete = async (id: string) => {
    await transactionService.delete(id);
    loadTransactions();
  };

  return (
    <Box sx={{
      maxWidth: 1200,
      mx: 'auto',
      width: '100%',
      p: { xs: 1, sm: 2, md: 3 },
      transition: 'all 0.3s ease-in-out'
    }}>
      <Paper sx={{
        p: { xs: 1, sm: 2, md: 3 },
        transition: 'all 0.3s ease-in-out'
      }}>
        <Typography variant="h6" gutterBottom sx={{ color: isDarkMode ? '#ffffff' : 'inherit' }}>
          Transações
        </Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>Adicionar Transação</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Box component="form" onSubmit={handleAdd} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Descrição"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <TextField
              label="Valor"
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
            <TextField
              select
              label="Tipo"
              value={type}
              onChange={e => setType(e.target.value as 'income' | 'expense')}
              required
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="income">Receita</MenuItem>
              <MenuItem value="expense">Despesa</MenuItem>
            </TextField>
            <TextField
              label="Categoria"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" sx={{ minWidth: 150 }}>
              Adicionar
            </Button>
          </Box>
        </Paper>
        <Paper>
          <List>
            {transactions.map((transaction) => (
              <ListItem key={transaction.id}>
                <ListItemText
                  primary={transaction.description}
                  secondary={`${transaction.type === 'income' ? '+' : '-'} R$ ${transaction.amount.toLocaleString('pt-BR')} - ${transaction.category}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => transaction.id && handleDelete(transaction.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Paper>
    </Box>
  );
};

export default Transactions;
