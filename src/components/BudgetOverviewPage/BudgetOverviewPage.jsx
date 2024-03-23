import './BudgetOverviewPage.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

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
          'orangered',
          'purple',
          'green',
          'red',
          'black',
          'blue',
          'yellow',
          'pink',
          'brown',
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
          'orangered',
          'purple',
          'green',
          'red',
          'black',
          'blue',
          'yellow',
          'pink',
          'brown',
        ],
      },
    ],
  };
  const options = {
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
      <div className="container">
        <div>
          <h1>Budget Overview</h1>
        </div>
      </div>
      <main>
        <div
          className="expenseChart"
          style={{
            padding: '20px',
            width: '25%',
          }}>
          Fixed Expense Totals
          <Pie data={expenseChartData} options={options}></Pie>
        </div>
        <div
          className="transactionChart"
          style={{
            padding: '20px',
            width: '25%',
          }}>
          Transaction Totals
          <Pie data={transactionChartData} options={options}></Pie>
        </div>
        <div
          className="combinedChart"
          style={{
            padding: '20px',
            width: '25%',
          }}>
          Combined Totals
          <Pie data={transactionChartData} options={options}></Pie>
        </div>
      </main>
    </>
  );
}

export default BudgetOverviewPage;
