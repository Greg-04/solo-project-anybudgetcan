import './CreatePlanPage.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';

function CreatePlanPage() {
  //To do, make a button to reset plan information
  //Get plan from store
  const plan = useSelector((store) => store.plan);

  //set hook
  let dispatch = useDispatch();
  //set states for inputs
  const [targetDate, setTargetDate] = useState('');
  const [planName, setPlanName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  //handle for name change
  const handlePlanName = (event) => {
    //have to set values to first because of useState
    const planName = event.target.value;
    setPlanName(planName);
    // console.log('planName:', planName);
  };

  //handle for target date
  const handleTargetDate = (event) => {
    //have to set values to first because of useState
    const targetDate = event.target.value;
    setTargetDate(targetDate);
    // console.log('targetDate:', targetDate);
  };

  //handle for target amount
  const handleTargetAmount = (event) => {
    //have to set values to first because of useState
    const targetAmount = event.target.value;
    setTargetAmount(targetAmount);
    // console.log('targetAmount:', targetAmount);
  };

  //handle for my plan submit
  const handlePlanSubmit = (event) => {
    event.preventDefault();
    alert('Plan Submitted!');
    console.log('payload:', planName, targetDate, targetAmount);
    dispatch({
      type: 'ADD_PLAN',
      payload: {
        name: planName,
        target_date: targetDate,
        budget_goal: targetAmount,
      },
    });
    //Set values back
    setTargetDate('');
    setPlanName('');
    setTargetAmount('');
    //to do: add a navigate to the next page*
  };

  // Function to handle delete
  const handleDelete = (event) => {
    let id = plan && plan.map((planItem) => planItem.id);
    // Dispatch action to delete plan
    // console.log('Plan ID:', id);
    dispatch({ type: 'DELETE_PLAN', payload: id });
    alert('Plan Deleted!');
  };

  // Fetch plan on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_PLAN' });
  }, [dispatch]);

  return (
    <>
      <div>
        <LogOutButton className="btn" />
      </div>
      <div className="container">
        <div>
          <h1>Create Plan</h1>
        </div>
      </div>
      <main>
        <div>
          <button onClick={handleDelete}>Reset Plan</button>
          <br></br>
          <button>
            <Link to="/incomePage">Update Income</Link>
          </button>
        </div>
        <form className="createPlanForm" onSubmit={handlePlanSubmit}>
          <h2>Set Savings Plan</h2>

          <div>
            <p>Set Target Date:</p>
            <input
              type="date"
              value={targetDate}
              onChange={handleTargetDate}
              required></input>
          </div>
          <div>
            <p>Plan Name:</p>
            <input
              type="text"
              value={planName}
              onChange={handlePlanName}
              required></input>
          </div>
          <div>
            <p>Set Target Amount</p>
            <input
              type="number"
              value={targetAmount}
              onChange={handleTargetAmount}
              required></input>
          </div>
          <div>
            <br />
            <button type="submit">Make This Plan!</button>
            <br />
          </div>
          <button className="navButton">
            <Link to="/addTransactions">
              Start recording your transactions!
            </Link>
          </button>
        </form>
      </main>
    </>
  );
}

export default CreatePlanPage;
