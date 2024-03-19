import './IncomePage.css';
import React, { useState } from 'react';

function IncomePage() {
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
    alert('Income Submitted!');
    setSalary('');
    setIncomeFrequency('');
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
              <option>Yearly</option>
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
            <button>Next</button>
          </div>
        </form>
      </main>
    </>
  );
}

export default IncomePage;
