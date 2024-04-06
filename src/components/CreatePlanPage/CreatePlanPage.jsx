import './CreatePlanPage.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Paper from '@mui/material/Paper';

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
    Swal.fire({
      title: 'Plan Set!',
      text: 'Please continue adding your information',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    // console.log('payload:', planName, targetDate, targetAmount);
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
    Swal.fire({
      title: 'Plan Deleted!',
      text: 'Please add another plan before continuing',
      icon: 'info',
      confirmButtonText: 'Ok',
    });
  };

  // Fetch plan on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_PLAN' });
  }, [dispatch]);

  return (
    <>
      <div>
        <LogOutButton />
      </div>
      <div>
        <div>
          <h1 className="pageTitle">Set Plan</h1>
        </div>
      </div>
      <div className="sideButtons">
        <p className="sideMenu">Make a Change?</p>
        <Button
          sx={{ color: '#e0e0e0', fontFamily: 'Rockwell' }}
          variant="text"
          onClick={handleDelete}>
          Delete Plan
        </Button>

        <Button
          sx={{ color: '#e0e0e0', fontFamily: 'Rockwell' }}
          variant="text">
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to="/incomePage">
            Change Income
          </Link>
        </Button>
      </div>

      <main>
        <form className="createPlanForm" onSubmit={handlePlanSubmit}>
          <Container maxWidth="md">
            <Paper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '20px',
              }}>
              <Box sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h2 className="formTitle"></h2>
                  </Grid>
                  <Grid item xs={12}>
                    <h3
                      style={{
                        color: 'black',
                        fontFamily: 'Rockwell',
                      }}>
                      Set Target Date:
                    </h3>
                    <TextField
                      fullWidth
                      type="date"
                      value={targetDate}
                      onChange={handleTargetDate}
                      InputProps={{
                        style: { color: '#e0e0e0', fontFamily: 'Rockwell' },
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <h3
                      style={{
                        color: 'black',
                        fontFamily: 'Rockwell',
                      }}>
                      Plan Name:
                    </h3>
                    <TextField
                      fullWidth
                      type="text"
                      value={planName}
                      onChange={handlePlanName}
                      InputProps={{
                        style: { color: '#e0e0e0', fontFamily: 'Rockwell' },
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <h3
                      style={{
                        color: 'black',
                        fontFamily: 'Rockwell',
                      }}>
                      Set Target Amount:
                    </h3>
                    <TextField
                      fullWidth
                      type="number"
                      value={targetAmount}
                      onChange={handleTargetAmount}
                      InputProps={{
                        style: { color: '#e0e0e0', fontFamily: 'Rockwell' },
                      }}
                      required
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ textAlign: 'center', fontFamily: 'Rockwell' }}>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{
                        textDecoration: 'none',
                        fontFamily: 'inherit',
                        marginTop: '10px',
                      }}>
                      Make This Plan!
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ textAlign: 'center', fontFamily: 'Rockwell' }}>
                    <Button
                      variant="contained"
                      style={{
                        textDecoration: 'none',
                        fontFamily: 'inherit',
                        marginTop: '10px',
                      }}>
                      <Link to="/addTransactions">
                        Start recording your transactions!
                      </Link>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </form>
      </main>
    </>
  );
}

export default CreatePlanPage;
