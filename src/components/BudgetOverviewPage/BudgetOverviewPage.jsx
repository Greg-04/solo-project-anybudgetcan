import './BudgetOverviewPage.css';
import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(Tooltip, Legend, ArcElement);

function BudgetOverviewPage() {
  const data = {
    labels: ['one', 'two', 'three'],
    datasets: [
      { data: [3, 6, 9], backgroundColor: ['aqua', 'orangered', 'purple'] },
    ],
  };

  const options = {};

  // // Fetch data on component
  // useEffect(() => {
  //   dispatch({ type: 'FETCH_CATEGORIES' });
  // }, [dispatch]);

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
            width: '50%',
          }}>
          <Pie data={data} option={options}></Pie>
        </div>
        <div className="transactionChart"></div>
        <div className="combinedChart"></div>
      </main>
    </>
  );
}

export default BudgetOverviewPage;
