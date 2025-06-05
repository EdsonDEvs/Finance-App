import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
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
import Layout from '../components/Layout';
import FinancialAssistant from '../components/FinancialAssistant';

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
  const financialContext = {
    balance: 5000,
    monthlyIncome: 3000,
    monthlyExpenses: 2000,
    topSpendingCategories: [
      { category: 'Alimentação', amount: 800 },
      { category: 'Transporte', amount: 500 },
      { category: 'Lazer', amount: 300 },
    ],
  };

  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receitas',
        data: [3000, 3200, 3100, 3300, 3200, 3000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Despesas',
        data: [2000, 2100, 1900, 2200, 2000, 2000],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Resumo Financeiro
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Saldo Atual
            </Typography>
            <Typography variant="h4" color="primary">
              R$ {financialContext.balance.toLocaleString()}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Categorias de Gastos
            </Typography>
            {financialContext.topSpendingCategories.map((category) => (
              <Box key={category.category} sx={{ mb: 1 }}>
                <Typography variant="body2">{category.category}</Typography>
                <Typography variant="body1">
                  R$ {category.amount.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <FinancialAssistant financialContext={financialContext} />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
