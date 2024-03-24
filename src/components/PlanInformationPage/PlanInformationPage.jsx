import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PlanInformationPage.css';

function PlanInformationPage() {
  //Set Dispatch Hook
  const dispatch = useDispatch();
  //Getting plan data from redux store
  const planInformation = useSelector((store) => store.plan);

  const incomeInformation = useSelector((store) => store.income);
  // console.log('income information', incomeInformation);
  const expensesInformation = useSelector((store) => store.expense);
  // console.log('expensesInformation', expensesInformation);
  const transactionsInformation = useSelector((store) => store.transaction);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_PLAN' });
    dispatch({ type: 'FETCH_INCOME' });
    dispatch({ type: 'FETCH_EXPENSES' });
    dispatch({ type: 'FETCH_TRANSACTIONS' });
  }, [dispatch]);

  //Function to reformat the timestamp into date format
  const formatDate = (newDate) => {
    // //This splits string into substrings/array
    // const splitDate = newDate.split('T');
    // // console.log('new date object', splitDate);
    // return splitDate[0];

    /*The toLocaleDateString() method returns the date (not the time) of a date object as a string, using locale conventions. */
    //https://www.geeksforgeeks.org/javascript-date-tolocaledatestring-method/
    const date = new Date(newDate);
    // console.log(date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    // console.log(formattedDate);
    const splitDate = formattedDate.split(',');
    // console.log(splitDate);
    const weekday = splitDate[0];
    const monthDay = splitDate[1];
    const year = splitDate[2];

    return `${weekday} - ${monthDay},${year}`;
  };

  // https://bugfender.com/blog/javascript-date-and-time/
  //newDate()
  const calculateRemainingDays = () => {
    // console.log('plan information', planInformation);
    const targetDate = new Date(planInformation[0].target_date);
    // console.log('Target Date Object:', targetDate);
    const today = new Date();
    // console.log('Todays Date Object:', today);
    // const testDate = targetDate.getTime();
    // console.log('getTime Target Date', testDate);
    //.getTime() provides milliseconds value of date since 1JAN1970
    const timeDifference = targetDate.getTime() - today.getTime();

    //After getting the value of time difference convert to days
    /*(1000 * 3600 * 24): Value of milliseconds in one day
   Dividing this value with the timeDifference will give you the value of days left */
    //Math.ceil rounds up to nearest integer
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
  };

  // // Using for loop that iterates over the array of objects and adds each amount
  // const calculateTotalExpenses = () => {
  //   let totalExpenses = 0;
  //   for (let i = 0; i < expensesInformation.length; i++) {
  //     totalExpenses += Number(expensesInformation[i].amount);
  //   }
  //   return totalExpenses;
  // };
  // //console logging total expenses
  // const totalExpenses = calculateTotalExpenses();
  // console.log('Total Expenses:', totalExpenses);

  // Using .reduce to calculate total expenses
  //.reduce iterates over an array and returns a single value,
  const calculateTotalExpenses = () => {
    // total is set 0 and each expense.amount will be added to total
    const totalExpenses = expensesInformation.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );
    return totalExpenses;
  };
  // let totalExpenseValue = calculateTotalExpenses();
  // console.log('Expenses Total', totalExpenseValue);

  //.reduce to loop transactionsInformation and calculate transactions
  const calculateTotalTransactions = () => {
    // total is set 0 and each transaction.amount will be added to total
    const totalTransactions = transactionsInformation.reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    );
    return totalTransactions;
  };
  // let totalTransactionValue = calculateTotalTransactions();
  // console.log('Transactions Total', totalTransactionValue);

  // Function to calculate income gained until Target
  const incomeGained = () => {
    //set annual income
    const annualIncome = Number(incomeInformation[0].monthly_amount) * 12;
    // console.log('annual income', annualIncome);

    //set daily income
    const dailyIncome = Number(annualIncome / 365);
    // console.log('daily income', dailyIncome);

    //set days remaining
    const targetDate = new Date(planInformation[0].target_date);
    const today = new Date();
    const timeDifference = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    // console.log('days left', daysLeft);

    //get Income gained until target date
    const incomeGained = dailyIncome * daysLeft;
    // console.log('incomeUntilTarget', incomeUntilTarget);
    return incomeGained;
  };
  // let totalIncomeGained = incomeGained();
  // console.log('totalIncomeGained', totalIncomeGained);

  // Function to calculate income remaining until Target date
  const incomeRemaining = () => {
    const gainedIncome = incomeGained();
    const totalTransactions = calculateTotalTransactions();
    const totalExpenses = calculateTotalExpenses();
    const incomeRemaining = gainedIncome - (totalTransactions + totalExpenses);
    return incomeRemaining;
  };
  // let incomeRemainingTotal = incomeRemaining();
  // console.log('incomeRemainingTotal', incomeRemainingTotal);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Plan Information</h1>
        </div>
      </div>
      <main>
        <div className="planInformation">
          {planInformation.map((planItem) => (
            <div key="planItem.id">
              <h2>{planItem.name}</h2>
              <p>Target Date: {formatDate(planItem.target_date)}</p>
              <p>Budget Goal: ${planItem.budget_goal}</p>
              <p>Remaining Days: {calculateRemainingDays()} Days</p>
              <p>Remaining Amount: ${incomeRemaining().toFixed(2)}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default PlanInformationPage;
