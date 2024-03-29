import './IncomePage.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';

function IncomePage() {
  // Dispatch hook
  const dispatch = useDispatch();
  //Setting up state for salary and income frequency
  const [salary, setSalary] = useState(0);
  const [incomeFrequency, setIncomeFrequency] = useState('');
  const currentIncome = useSelector((store) => store.income);

  //handle for salary change
  const handleSalaryChange = (event) => {
    //have to set values to first because of useState
    const newSalary = event.target.value;
    setSalary(newSalary);
    // console.log('salary value:', newSalary);
  };

  //handle for frequency change
  const handleFrequencyChange = (event) => {
    //have to set values to first because of useState
    const newFrequency = event.target.value;
    setIncomeFrequency(newFrequency);
    // console.log('income frequency:', newFrequency);
  };

  //handle for my income submit
  //By default this is a put call but will add in a new amount if empty
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Income Updated!');
    // console.log('Payload:', salary);

    //defining adjusted salary equal to the input value
    let adjustedSalary = salary;
    //If statement to convert yearly salary inputs
    if (incomeFrequency === 'Annual') {
      //converting to monthly value
      adjustedSalary /= 12;
    }

    // conditional to check if currentIncome has available data, if yes take the id
    if (currentIncome && currentIncome.length > 0) {
      // Extract the ID from the first income object
      const id = currentIncome[0].id;

      //defining adjusted salary equal to the input value
      let adjustedSalary = salary;
      //If statement to convert yearly salary inputs
      if (incomeFrequency === 'Annual') {
        //converting to monthly value
        adjustedSalary /= 12;
      }
      // console.log('modified salary:', adjustedSalary);

      // Dispatching UPDATE_INCOME_AMOUNT with current ID
      dispatch({
        type: 'UPDATE_INCOME_AMOUNT',
        payload: { id, monthly_amount: adjustedSalary },
      });
    } else {
      //If there is no data for current income this will submit one
      dispatch({
        type: 'ADD_INCOME',
        payload: { monthly_amount: adjustedSalary },
      });
    }
    //Set values back to $0
    setSalary(0);
    setIncomeFrequency('');
    //to do: add a navigate to the next page*
  };

  // Fetch income on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_INCOME' });
  }, [dispatch]);

  return (
    <>
       <div><LogOutButton className="btn"/></div>
      <div className="container">
        <div>
          <h1>Income Page</h1>
        </div>
      </div>
      <main>
        <div className="header">
          <p>
            Current Monthly Amount $
            {currentIncome &&
              currentIncome.map(
                (currentIncomeItem) => currentIncomeItem.monthly_amount
              )}
          </p>
        </div>
        <form className="salaryForm" onSubmit={handleSubmit}>
          <h2>Update income</h2>
          <h1>${salary}</h1>
          <div>
            <p>Annual or Monthly?</p>
            <select
              required
              id="income"
              value={incomeFrequency}
              onChange={handleFrequencyChange}>
              <option value="">Select</option>
              <option>Annual</option>
              <option>Monthly</option>
            </select>
          </div>
          <div>
            <p>Enter your income:</p>
            <input
              type="number"
              value={salary}
              onChange={handleSalaryChange}
              required></input>
          </div>
          <div>
            <br />
            <button type="submit">Submit</button>
            <br />
            <button className="navButton">
              <Link to="/expensesPage">Next</Link>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default IncomePage;
