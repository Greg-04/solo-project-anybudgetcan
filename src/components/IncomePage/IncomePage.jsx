import './IncomePage.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function IncomePage() {
  // Dispatch hook
  const dispatch = useDispatch();
  //Setting up state for salary and income frequency
  const [salary, setSalary] = useState(0);
  const [incomeFrequency, setIncomeFrequency] = useState('');

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
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Income Submitted!');
    // console.log('Payload:', salary);
    //If statement to convert yearly salary inputs
    let adjustedSalary = salary;
    if (incomeFrequency === 'Annual') {
      //converting to monthly value
      adjustedSalary /= 12;
    }
    // console.log('modified salary:', adjustedSalary);
    dispatch({
      type: 'ADD_INCOME',
      payload: { monthly_amount: adjustedSalary },
    });
    //Set values back to $0
    setSalary(0);
    setIncomeFrequency('');
    //to do: add a navigate to the next page*
  };

  return (
    <>
      <div className="container">
        <div>
          <h1>Income Page</h1>
        </div>
      </div>
      <main>
        <form className="salaryForm" onSubmit={handleSubmit}>
          <h2>Set your income</h2>
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
