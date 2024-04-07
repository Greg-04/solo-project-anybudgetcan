import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PlanInformationPage.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale, //y
  Tooltip,
} from 'chart.js';
import LogOutButton from '../LogOutButton/LogOutButton';

//link to reset plan
//link to update income

//Register ChartJS items
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale, //y
  Tooltip
);

function PlanInformationPage() {
  //Set Dispatch Hook
  const dispatch = useDispatch();

  //Getting plan data from redux store
  const planInformation = useSelector((store) => store.plan);
  //bringing in the savingsGoal
  // console.log('planInformation', planInformation);
  const savingsGoal =
    planInformation && Number(planInformation.map((plan) => plan.budget_goal));
  // console.log('savingsGoal', savingsGoal);
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

    return `${weekday}, ${monthDay},${year}`;
  };

  // https://bugfender.com/blog/javascript-date-and-time/
  //newDate()
  const calculateRemainingDays = () => {
    // console.log('plan information', planInformation);

    //Below this is what was working in case you need to bring it back
    const targetDate = new Date(
      planInformation && planInformation[0].target_date
    );

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
    const totalExpenses =
      expensesInformation &&
      expensesInformation.reduce(
        (total, expense) => total + Number(expense.amount),
        0
      );
    return totalExpenses;
  };
  // let totalExpenseValue = calculateTotalExpenses();
  // console.log('Expenses Total', totalExpenseValue);

  // need to account for monthly expense deductions similar to income
  const calculateMonthlyExpenseDeductions = () => {
    const totalExpenses = calculateTotalExpenses();
    //set annual expenses
    const annualExpenses = Number(totalExpenses * 12);

    //set daily expenses
    const dailyExpenses = Number(annualExpenses / 365);

    //set days remaining
    const targetDate = new Date(
      planInformation && planInformation[0].target_date
    );
    const today = new Date();
    const timeDifference = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    // console.log('days left', daysLeft);

    //get Expenses deducted until target date
    const expensesDeducted = dailyExpenses * daysLeft;

    return expensesDeducted;
  };
  // let totalExpenseDeductions = calculateMonthlyExpenseDeductions();
  // console.log('totalExpenseDeductions', totalExpenseDeductions);

  //.reduce to loop transactionsInformation and calculate transactions
  const calculateTotalTransactions = () => {
    // total is set 0 and each transaction.amount will be added to total
    const totalTransactions =
      transactionsInformation &&
      transactionsInformation.reduce(
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
    const annualIncome =
      Number(incomeInformation && incomeInformation[0].monthly_amount) * 12;
    // console.log('annual income', annualIncome);

    //set daily income
    const dailyIncome = Number(annualIncome / 365);
    // console.log('daily income', dailyIncome);

    //set days remaining
    const targetDate = new Date(
      planInformation && planInformation[0].target_date
    );
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
    const totalExpenses = calculateMonthlyExpenseDeductions();
    const incomeRemaining =
      gainedIncome - (totalTransactions + totalExpenses + savingsGoal);
    return incomeRemaining;
  };
  // let incomeRemainingTotal = incomeRemaining();
  // console.log('incomeRemainingTotal', incomeRemainingTotal);

  //Monthly Budget Total
  const monthlyBudgetTotal = () => {
    // First attempt at calculating a monthly Budget Total
    //You do need to set this because you don't want this total Changing if the income remaining changes
    //set annual income
    const annualIncome =
      Number(incomeInformation && incomeInformation[0].monthly_amount) * 12;
    // console.log('annual income', annualIncome);
    //set daily income
    const dailyIncome = Number(annualIncome / 365);
    // console.log('daily income', dailyIncome);
    //set monthly income
    const monthlyIncome = Number(dailyIncome * 30);

    const totalExpenses = calculateTotalExpenses();
    //set annual expenses
    const annualExpenses = Number(totalExpenses * 12);
    //set daily expenses
    const dailyExpenses = Number(annualExpenses / 365);
    //set monthly expenses
    const monthlyExpenses = Number(dailyExpenses * 30);

    //Set variables for days left and days in month
    const daysLeftUntilTarget = calculateRemainingDays();
    const daysInMonth = 30;

    //Setting value for savings goal to calculate in approximate amount
    const savingsGoalDailyAmount = savingsGoal / daysLeftUntilTarget;

    // If statement to catch periods less than 30 days
    if (daysLeftUntilTarget <= daysInMonth) {
      const dailyAmount = Number(
        dailyIncome - (dailyExpenses + savingsGoalDailyAmount)
      );
      return dailyAmount * daysLeftUntilTarget;
    }

    //Setting up percentage of periods left until target. EX: days in month = 30, days until target = 54, 1.8 cycles left until target
    const monthlyCyclesRemaining = daysLeftUntilTarget / daysInMonth;

    //Set ideal monthly budget w/ no transactions calculated. Only income gained and expenses deducted in a 30 day period
    const idealMonthlyBudget = Number(
      monthlyIncome - (monthlyExpenses + savingsGoalDailyAmount)
    );

    //Calculate a new  approximate income remaining amount based on days remaining and income/expenses calculated
    const newApproximateIncomeRemaining = Number(
      idealMonthlyBudget * monthlyCyclesRemaining
    );

    //factor in this new approximate income remaining and divide into a daily amount
    const newDailyIncomeRemainingUntilTarget = Number(
      newApproximateIncomeRemaining / daysLeftUntilTarget
    );

    const newBudgetTargetAmount = Number(
      newDailyIncomeRemainingUntilTarget * daysInMonth
    );

    //This calculation doesnt work because it will change if the remaining budget changes, which is not the purpose of the value
    // //Calculation takes in an ideal monthly target amount by factoring income remaining until target
    // const incomeRemainingUntilTarget = incomeRemaining();
    // const daysLeft = calculateRemainingDays();
    // const totalDaysInMonth = 30;
    // if (daysLeft < totalDaysInMonth) {
    //   return daysLeft * (incomeRemainingUntilTarget / daysLeft);
    // }
    // const dailyIncomeRemainingUntilTarget = Number(
    //   incomeRemainingUntilTarget / daysLeft
    // );
    // const monthlyBudgetTarget = Number(
    //   dailyIncomeRemainingUntilTarget * totalDaysInMonth
    // );

    // return monthlyBudgetTarget;
    return newBudgetTargetAmount;
  };

  //Monthly Budget Total Remaining
  const monthlyBudgetTotalRemaining = () => {
    // Set monthly budget
    const monthlyTotalBudget = monthlyBudgetTotal();

    // Get current date
    const currentDate = new Date();

    // console.log(currentDate);

    // Get the first day of the current month
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    // console.log(firstDayOfMonth);

    // Get the last day of the current month
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    // console.log(lastDayOfMonth);

    // Filter transactions occurred within the current month
    const transactionsWithinMonth =
      transactionsInformation &&
      transactionsInformation.filter((transaction) => {
        const transactionDate = new Date(transaction.trans_date);
        return (
          transactionDate >= firstDayOfMonth &&
          transactionDate <= lastDayOfMonth
        );
      });
    // console.log('transactionsWithinMonth', transactionsWithinMonth);

    // Calculate total transactions within the current month
    const totalTransactionsWithinMonth =
      transactionsWithinMonth &&
      transactionsWithinMonth.reduce(
        (total, transaction) => total + Number(transaction.amount),
        0
      );

    // console.log('totalTransactionsWithinMonth', totalTransactionsWithinMonth);

    // Calculate remaining monthly budget after deducting transactions
    const remainingBudget = monthlyTotalBudget - totalTransactionsWithinMonth;

    return remainingBudget;
  };

  const monthlySalary =
    incomeInformation && incomeInformation[0].monthly_amount;
  console.log('monthlySalary', monthlySalary);

  const data = {
    labels: [``],
    datasets: [
      {
        label: 'Monthly Salary:',
        data: [monthlySalary],
        backgroundColor: '#ffd700',
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        label: 'Total Remaining Budget Amount:',
        data: [incomeRemaining().toFixed(2)],
        backgroundColor: '#9932cc',
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        label: 'Target Monthly Budget Amount:',
        data: [monthlyBudgetTotal().toFixed(2)],
        backgroundColor: '#da70d6',
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        label: 'Current Monthly Amount Remaining:',
        data: [monthlyBudgetTotalRemaining().toFixed(2)],
        backgroundColor: '#20b2aa',
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed.y || 0;
            const formattedValue = '$' + value.toFixed(2);
            return `${label}: ${formattedValue}`;
          },
        },
      },
      legend: {
        labels: {
          color: '#e0e0e0',
          fontFamily: 'Rockwell',
        },
      },
    },
  };

  return (
    <>
      <div>
        <LogOutButton className="btn" />
      </div>
      {/* <div className="container">
        <div className="piHeaders">
          <h1>Plan Information</h1>
        </div>
      </div> */}
      <main>
        <div className="piHeaders">
          {planInformation &&
            planInformation.map((planItem) => (
              <div key={planItem.id}>
                <h2>{planItem.name}</h2>
                <p>
                  <span className="planTitles">Target Date:</span>{' '}
                  {formatDate(planItem.target_date)}
                </p>
                <p>
                  <span className="planTitles">Budget Goal:</span>{' '}
                  <span className="planAmounts">${planItem.budget_goal}</span>
                </p>
                <p>
                  <span className="planTitles">Remaining Days:</span>{' '}
                  {calculateRemainingDays()} Days
                </p>
                <p>
                  <span className="planTitles">
                    Total Remaining Budget Amount:
                  </span>
                  <span className="planAmounts">
                    {' '}
                    ${incomeRemaining().toFixed(2)}
                  </span>
                </p>
                <p>
                  <span className="planTitles">
                    Target Monthly Budget Amount:
                  </span>
                  <span className="planAmounts">
                    {' '}
                    ${monthlyBudgetTotal().toFixed(2)}
                  </span>
                </p>
                <p>
                  <span className="planTitles">
                    Current Monthly Amount Remaining:
                  </span>
                  <span className="planAmounts">
                    {' '}
                    ${monthlyBudgetTotalRemaining().toFixed(2)}
                  </span>
                </p>
              </div>
            ))}
        </div>
        <div className="piHeaders2">
          <h2 className="header">Bar Chart</h2>
          <div style={{ margin: '0 auto', width: '80%' }}>
            <Bar data={data} options={options}></Bar>
          </div>
        </div>
      </main>
    </>
  );
}

export default PlanInformationPage;
