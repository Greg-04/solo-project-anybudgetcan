import './CreatePlanPage.css';
import React from 'react';

function CreatePlanPage() {
  return (
    <>
      <div className="container">
        <div>
          <h1>Create Plan</h1>
        </div>
      </div>
      <main>
        <form className="createPlanForm">
          <h2>Set Savings Plan</h2>

          <div>
            <p>Set Target Date:</p>
            <input type="date" required></input>
          </div>
          <div>
            <p>Plan Name:</p>
            <input type="text" required></input>
          </div>
          <div>
            <p>Set Target Amount</p>
            <input type="number"></input>
          </div>
          <div>
            <br />
            <button type="submit">Make This Plan!</button>
            <br />
            <button>Start recording your transactions!</button>
          </div>
        </form>
      </main>
    </>
  );
}

export default CreatePlanPage;
