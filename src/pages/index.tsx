import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FinancialAssistant } from '../components/FinancialAssistant';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const financialContext = {
    balance: 5000,
    monthlyIncome: 3000,
    monthlyExpenses: 2000,
    topCategories: ['Alimentação', 'Transporte', 'Lazer'],
  };

  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receitas',
        data: [3000, 3200, 3100, 3300, 3200, 3000],
        borderColor: isDarkMode ? '#4fc3f7' : 'rgb(75, 192, 192)',
        backgroundColor: isDarkMode ? 'rgba(79, 195, 247, 0.1)' : 'rgba(75, 192, 192, 0.1)',
        tension: 0.1,
        borderWidth: 2,
      },
      {
        label: 'Despesas',
        data: [2000, 2100, 1900, 2200, 2000, 2000],
        borderColor: isDarkMode ? '#f48fb1' : 'rgb(255, 99, 132)',
        backgroundColor: isDarkMode ? 'rgba(244, 143, 177, 0.1)' : 'rgba(255, 99, 132, 0.1)',
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#ffffff' : '#666666',
          font: {
            size: 12,
            weight: '500' as const,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDarkMode ? '#ffffff' : '#000000',
        bodyColor: isDarkMode ? '#ffffff' : '#000000',
        borderColor: isDarkMode ? '#ffffff' : '#000000',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#ffffff' : '#666666',
          font: {
            size: 12,
            weight: '500' as const,
          },
        },
      },
      y: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#ffffff' : '#666666',
          font: {
            size: 12,
            weight: '500' as const,
          },
          callback: function(value: any) {
            return `R$ ${value.toLocaleString('pt-BR')}`;
          }
        },
      },
    },
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%', p: { xs: 1, sm: 2, md: 3 }, transition: 'all 0.3s ease-in-out' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: isDarkMode ? '#ffffff' : 'inherit' }}>
              Resumo Financeiro
            </Typography>
            <Box sx={{ height: { xs: 200, sm: 250, md: 300 } }}>
              <Line data={chartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: { xs: 1, sm: 2, md: 3 }, mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: isDarkMode ? '#ffffff' : 'inherit' }}>
              Saldo Atual
            </Typography>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
              R$ {financialContext.balance.toLocaleString('pt-BR')}
            </Typography>
          </Paper>
          <Paper sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: isDarkMode ? '#ffffff' : 'inherit' }}>
              Categorias de Gastos
            </Typography>
            {financialContext.topCategories.map((category) => (
              <Box key={category} sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ color: isDarkMode ? '#e0e0e0' : 'inherit' }}>
                  {category}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <FinancialAssistant financialContext={financialContext} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
