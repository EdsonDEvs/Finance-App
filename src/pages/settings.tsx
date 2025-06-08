import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, deleteDoc, query, where, Timestamp } from 'firebase/firestore';
import ProtectedRoute from '../components/ProtectedRoute';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

interface Reminder {
  id?: string;
  userId: string;
  name: string;
  amount: number;
  dueDate: string;
  note?: string;
}

const Settings = () => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    name: 'Usuário',
    email: 'usuario@exemplo.com',
    currency: 'BRL',
    language: 'pt-BR',
    notifications: {
      email: true,
      push: true,
      whatsapp: true,
    },
    theme: 'light',
  });
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    if (currentUser) {
      loadReminders();
    }
  }, [currentUser]);

  const loadReminders = async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'reminders'), where('userId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    setReminders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reminder)));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name || !amount || !dueDate) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (!currentUser) return;
    try {
      await addDoc(collection(db, 'reminders'), {
        userId: currentUser.uid,
        name,
        amount: Number(amount),
        dueDate,
        note,
        createdAt: Timestamp.now(),
      });
      setName('');
      setAmount('');
      setDueDate('');
      setNote('');
      setSuccess('Lembrete adicionado com sucesso!');
      loadReminders();
    } catch (err: any) {
      setError(err.message || 'Erro ao adicionar lembrete.');
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(collection(db, 'reminders').withConverter(undefined).doc(id));
    loadReminders();
  };

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value,
      },
    }));
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log('Configurações salvas:', settings);
  };

  return (
    <ProtectedRoute>
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
            Configurações
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Preferências
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Moeda"
                      value={settings.currency}
                      onChange={(e) => handleChange('currency', e.target.value)}
                    >
                      <option value="BRL">Real (BRL)</option>
                      <option value="USD">Dólar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Idioma"
                      value={settings.language}
                      onChange={(e) => handleChange('language', e.target.value)}
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es">Español</option>
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Notificações
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.email}
                          onChange={(e) =>
                            handleNotificationChange('email', e.target.checked)
                          }
                        />
                      }
                      label="Notificações por Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.push}
                          onChange={(e) =>
                            handleNotificationChange('push', e.target.checked)
                          }
                        />
                      }
                      label="Notificações Push"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications.whatsapp}
                          onChange={(e) =>
                            handleNotificationChange('whatsapp', e.target.checked)
                          }
                        />
                      }
                      label="Notificações WhatsApp"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Lembretes de Contas a Pagar
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleAdd} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    label="Nome da Conta"
                    value={name}
                    onChange={e => setName(e.target.value)}
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
                    label="Data de Vencimento"
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                  <TextField
                    label="Observação"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                  />
                  <Button type="submit" variant="contained" sx={{ minWidth: 150 }}>
                    Adicionar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <List>
                  {reminders.map((reminder) => (
                    <ListItem key={reminder.id}>
                      <ListItemText
                        primary={`${reminder.name} - R$ ${reminder.amount.toLocaleString('pt-BR')}`}
                        secondary={`Vencimento: ${reminder.dueDate}${reminder.note ? ' | ' + reminder.note : ''}`}
                      />
                      <IconButton edge="end" aria-label="delete" onClick={() => reminder.id && handleDelete(reminder.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={handleSave}>
                  Salvar Configurações
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ProtectedRoute>
  );
};

export default Settings;
