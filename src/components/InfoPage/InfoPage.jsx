import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import './InfoPage.css';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <>
      <div>
        <LogOutButton className="btn" />
      </div>
      <div className="infoPageContainer">
        <h1>How To Use</h1>
        <p>
          Welcome to Any Budget Can! This page provides you with instructions on
          how to use the application.
        </p>

        <h2>1. Adding Income</h2>
        <p>On the Income page, you can input your monthly or annual income.</p>
        <h2>2. Managing Expenses</h2>
        <p>
          Use the Expenses page to input your monthly expenses such as rent,
          utilities, groceries, etc.
        </p>
        <h2>3. Creating Savings Plan</h2>
        <p>
          The Savings Plan page allows you to create customized savings plans by
          setting a timeframe, plan name, and target amount to save.
        </p>
        <h2>4. Tracking Transactions</h2>
        <p>
          With the Add Transactions page, you can manually add transactions to
          keep track of your budget. Enter details like name, amount, category,
          and date for each transaction. Then navigate to the "View
          Transactions" to track submissions.
        </p>
        <h2>5. You're all set</h2>
        <p>
          Once you inputted all your information, the home page, budget
          overview, plan information, and view transactions will provide you a
          comprehensive view of your financial summary. Use the links on the
          left-hand side to navigate between different sections of the
          application.
        </p>
        <h2>Support</h2>
        <p>
          If you encounter any issues or have suggestions for improvement,
          please feel free to contact us at regs0404@gmail.com
        </p>
      </div>
    </>
  );
}

export default InfoPage;
