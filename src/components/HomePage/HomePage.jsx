import React from 'react';

function HomePage() {
  const incomeRemaining = () => {
    const gainedIncome = incomeGained();
    const totalTransactions = calculateTotalTransactions();
    const totalExpenses = calculateMonthlyExpenseDeductions();
    const incomeRemaining =
      gainedIncome - (totalTransactions + totalExpenses + savingsGoal);
    return incomeRemaining;
  };
  return (
    <>
      <div className="container">
        <div>
          <h1 className="header">Home Page</h1>
        </div>
      </div>
    </>
  );
}

export default HomePage;
