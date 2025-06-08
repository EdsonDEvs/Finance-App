import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Reports = () => {
  const [period, setPeriod] = React.useState('month');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const categoryData = {
    labels: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde'],
    datasets: [
      {
        data: [800, 500, 1200, 300, 400],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const monthlyData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receitas',
        data: [3000, 3200, 3100, 3300, 3200, 3000],
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Despesas',
        data: [2000, 2100, 1900, 2200, 2000, 2000],
        backgroundColor: '#F44336',
      },
    ],
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
          Relatórios
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Relatórios</Typography>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Período</InputLabel>
                  <Select
                    value={period}
                    label="Período"
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <MenuItem value="week">Semana</MenuItem>
                    <MenuItem value="month">Mês</MenuItem>
                    <MenuItem value="year">Ano</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Distribuição de Gastos por Categoria
              </Typography>
              <Box sx={{ height: 300 }}>
                <Pie data={categoryData} options={{ maintainAspectRatio: false }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Receitas vs Despesas
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={monthlyData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Resumo do Período
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
                    <Typography variant="subtitle2">Receitas Totais</Typography>
                    <Typography variant="h6">R$ 18.700,00</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, bgcolor: 'error.light' }}>
                    <Typography variant="subtitle2">Despesas Totais</Typography>
                    <Typography variant="h6">R$ 12.200,00</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, bgcolor: 'info.light' }}>
                    <Typography variant="subtitle2">Saldo</Typography>
                    <Typography variant="h6">R$ 6.500,00</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Reports;
