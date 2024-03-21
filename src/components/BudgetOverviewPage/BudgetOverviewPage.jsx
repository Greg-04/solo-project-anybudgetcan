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

  // Get expense total from Redux store
  const expenseTotal = useSelector((store) => store.expenseTotal);
  // console.log('Expense Total Data', expenseTotal);

  //setting up pie chart data
  const data = {
    labels: expenseTotal.map((expenseTotalItem) => expenseTotalItem.name),
    datasets: [
      {
        data: expenseTotal.map((item) => item.expenses_total),
        backgroundColor: ['aqua', 'orangered', 'purple'],
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
          Expense Totals
          <Pie data={data} options={options}></Pie>
        </div>
        <div className="transactionChart"></div>
        <div className="combinedChart"></div>
      </main>
    </>
  );
}

export default BudgetOverviewPage;
