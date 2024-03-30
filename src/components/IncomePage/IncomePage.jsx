import './IncomePage.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
      <div>
        <LogOutButton className="btn" />
      </div>
      {/* <div className="container">
        <div>
          <h1>Your Income</h1>
        </div>
      </div> */}
      <main>
        <div>
          <p className="currentSalary">
            Current Monthly Amount: <inline className="currentSalaryAmount">$
            {currentIncome &&
              currentIncome.map(
                (currentIncomeItem) => currentIncomeItem.monthly_amount
              )}
              </inline>
          </p>
        </div>
        <form className="salaryForm" onSubmit={handleSubmit}>
          <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h2 className="inputHeader">Set Income</h2>
                  <h1 className="salary">${salary}</h1>
                </Grid>

                <Grid item xs={12}>
                  <p className="inputHeader">Annual or Monthly?</p>
                  <select
                    required
                    id="income"
                    value={incomeFrequency}
                    onChange={handleFrequencyChange}>
                    <option value="">Select</option>
                    <option>Annual</option>
                    <option>Monthly</option>
                  </select>
                </Grid>
                <Grid item xs={12}>
                  <p className="inputHeader">Enter your income:</p>
                  <TextField
                    fullWidth
                    type="number"
                    value={salary}
                    onChange={handleSalaryChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', fontFamily:'Rockwell' }}>
                  <Button type="submit" variant="contained" style={{ textDecoration: 'none', fontFamily: 'inherit', marginTop:'10px' }}>Submit</Button>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', fontFamily:'Rockwell' }}>
                  <Button variant="contained" className="navButton" style={{ textDecoration: 'none', fontFamily: 'inherit', marginTop:'10px' }}>
                    <Link to="/expensesPage">Next</Link>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </form>
      </main>
    </>
  );
}

export default IncomePage;
