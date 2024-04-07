import './AddTransactionsPage.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

function AddTransactionsPage() {
  // Dispatch hook
  const dispatch = useDispatch();
  // Get categories from Redux store
  const category = useSelector((store) => store.category);
  //Setting up state for each input
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [transDate, setTransDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle category selection
  const handleCategorySelect = (event) => {
    console.log('categoryID before setting state', event.target.value);
    setCategoryId(event.target.value);
    console.log('categoryID after setting state', event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Payload:', name, amount, categoryId, transDate);
    // Dispatch the action type to add the transaction
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: { name, amount, category_id: categoryId, trans_date: transDate },
    });
    //clearing inputs after submission
    setName('');
    setAmount('');
    setCategoryId('');
    setTransDate('');
    // Set success message
    setSuccessMessage('Transaction added successfully!');
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Fetch categories on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [dispatch]);

  return (
    <>
      <div>
        <LogOutButton className="btn" />
      </div>
      <div className="pageTitle">
        <h1>Add Transactions</h1>
      </div>
      <div>
        <form className="transactionForm" onSubmit={handleSubmit}>
          <Container maxWidth="md">
            <Paper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '20px',
                border: '1px solid'
              }}>
              <Box sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h3
                      style={{
                        color: 'black',
                        fontFamily: 'Rockwell',
                      }}>
                      Description:
                    </h3>
                    <TextField
                      fullWidth
                      type="text"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      InputProps={{
                        style: { color: '#e0e0e0', fontFamily: 'Rockwell' },
                      }}
                      required
                    />
                  </Grid>
                  {/* <p>{name}</p> // for testing purposes*/}
                  <Grid item xs={12}>
                    <h3
                      style={{
                        color: 'black',
                        fontFamily: 'Rockwell',
                      }}>
                      Amount:
                    </h3>
                    <TextField
                      fullWidth
                      className="input-container"
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
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
                      Select Category:
                    </h3>
                    <select
                      className="input-container"
                      required
                      id="category"
                      value={categoryId}
                      onChange={handleCategorySelect}>
                      <option value="">Select a category</option>
                      {category.map((categoryName) => (
                        <option key={categoryName.id} value={categoryName.id}>
                          {categoryName.name}
                        </option>
                      ))}
                    </select>
                  </Grid>

                  <Grid item xs={12}>
                    <h3
                      style={{
                        color: 'black',
                        fontFamily: 'Rockwell',
                      }}>
                      Date:
                    </h3>
                    <TextField
                      fullWidth
                      className="input-container"
                      type="date"
                      id="trans_date"
                      value={transDate}
                      onChange={(event) => setTransDate(event.target.value)}
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
                      className="button"
                      type="submit"
                      style={{
                        textDecoration: 'none',
                        fontFamily: 'inherit',
                        marginTop: '10px',
                      }}>
                      Add Transaction
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ textAlign: 'center', fontFamily: 'Rockwell' }}>
                    <Button
                      variant="contained"
                      className="button"
                      type="submit"
                      style={{
                        textDecoration: 'none',
                        fontFamily: 'inherit',
                        marginTop: '10px',
                      }}>
                      <Link to="/viewTransactions">View Transactions</Link>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </form>
      </div>
      <h2>
        {successMessage && (
          <div className="transactionMessage">{successMessage}</div>
        )}
      </h2>
    </>
  );
}

export default AddTransactionsPage;
