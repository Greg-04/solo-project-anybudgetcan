import './BudgetOverviewPage.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import LogOutButton from '../LogOutButton/LogOutButton';

//registering pie chart components
ChartJS.register(Tooltip, Legend, ArcElement);

function BudgetOverviewPage() {
  //set dispatch hook
  const dispatch = useDispatch();

  // Get data from Redux store
  const expenseTotal = useSelector((store) => store.expenseTotal);
  // console.log('Expense Total Data', expenseTotal);
  const transactionTotal = useSelector((store) => store.transTotal);
  // console.log('Transaction Total Data', transactionTotal);
  const combinedTotal = useSelector((store) => store.combinedTotal);
  // console.log('Combined Total Data', combinedTotal);

  //setting up pie chart data
  const expenseChartData = {
    labels: expenseTotal.map((expenseTotalItem) => expenseTotalItem.name),
    datasets: [
      {
        data: expenseTotal.map(
          (expenseTotalItem) => expenseTotalItem.expenses_total
        ),
        backgroundColor: [
          'aqua',
          'green',
          'blue',
          'pink',
          'yellow',
          'orangered',
          'brown',
          'lightblue',
          'black',
          'purple',
          'lightgreen',
          'darkorange',
          'darkviolet',
          'gold',
        ],
      },
    ],
  };

  const transactionChartData = {
    labels: transactionTotal.map(
      (transactionTotalItem) => transactionTotalItem.name
    ),
    datasets: [
      {
        data: transactionTotal.map(
          (transactionTotalItem) => transactionTotalItem.transaction_total
        ),
        backgroundColor: [
          'aqua',
          'green',
          'blue',
          'pink',
          'yellow',
          'orangered',
          'brown',
          'lightblue',
          'black',
          'purple',
          'lightgreen',
          'darkorange',
          'darkviolet',
          'gold',
        ],
      },
    ],
  };

  const combinedChartData = {
    labels: combinedTotal
      //filter to remove values with 0
      .filter((item) => item.combined_total !== '0')
      .map((combinedTotalItem) => combinedTotalItem.name),
    datasets: [
      {
        data: combinedTotal
          //filter to remove values with 0
          .filter((item) => item.combined_total !== '0')
          .map((combinedTotalItem) => combinedTotalItem.combined_total),
        backgroundColor: [
          'aqua',
          'green',
          'blue',
          'pink',
          'yellow',
          'orangered',
          'brown',
          'lightblue',
          'black',
          'purple',
          'lightgreen',
          'darkorange',
          'darkviolet',
          'gold',
        ],
      },
    ],
  };
  const options = {
    //This is to create percentage values on the pie chart. Code gathered from online
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a, b) => a + parseFloat(b),
              0
            );
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return `${label}: ${percentage}`;
          },
        },
      },
    },
  };

  // Fetch data on component
  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE_TOTAL' });
    dispatch({ type: 'FETCH_TRANSACTION_TOTAL' });
    dispatch({ type: 'FETCH_COMBINED_TOTAL' });
  }, [dispatch]);

  return (
    <>
     <div><LogOutButton className="btn"/></div>
      <div className="container">
        <div>
          <h1>Budget Overview</h1>
        </div>
      </div>
      <main>
        <div className="container">
          <div
            className="chart-container"
            style={{
              padding: '20px',
              width: '25%',
            }}>
            <h2>Fixed Expense Totals</h2>
            <Pie data={expenseChartData} options={options}></Pie>
          </div>

          <div
            className="chart-container"
            style={{
              padding: '20px',
              width: '25%',
            }}>
            <h2>Transaction Totals</h2>
            <Pie data={transactionChartData} options={options}></Pie>
          </div>

          <div
            className="chart-container"
            style={{
              padding: '20px',
              width: '25%',
            }}>
            <h2>Combined Totals</h2>
            <Pie data={combinedChartData} options={options}></Pie>
          </div>
        </div>

        <div>
          <h2 className="header">Total Spending by Category</h2>
          <Grid container spacing={5}>
            {combinedTotal
              .filter((item) => item.combined_total !== '0')
              .map((combinedTotalItem) => (
                <Grid item xs={4} key={combinedTotalItem.id}>
                  <Box
                    sx={{
                      borderRadius: '8px',
                      margin: '10px',
                      padding: '10px',
                      backgroundColor: `${grey[300]}`,
                      border: '.2px solid #101010',
                      boxShadow: '0 8px 6px rgba(0, 0, 0, 0.1)',
                    }}>
                    <h3>{combinedTotalItem.name}</h3>
                    <p>Amount Spent: ${combinedTotalItem.combined_total}</p>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </div>
      </main>
    </>
  );
}

export default BudgetOverviewPage;
