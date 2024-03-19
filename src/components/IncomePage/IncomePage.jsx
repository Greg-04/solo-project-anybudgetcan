import './IncomePage.css';
import React, { useState } from 'react';

function IncomePage() {
  //Setting up state for salary
  const [salary, setSalary] = useState(0);

  //handle for salary change
  const handleSalaryChange = (event) => {
    setSalary(Number(event.target.value));
  }

  return (
    <>
      <div className="container">
        <div>
          <h1>Income Page</h1>
        </div>
      </div>
      <main>
        <form className="salaryForm">
          <h2>Set your income</h2>
          <h1>${salary}</h1>
          <div>
            <p>Annual or Monthly?</p>
            <select 
            required 
            id="income" 
            value={null}
            >
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
            required
            ></input>
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
