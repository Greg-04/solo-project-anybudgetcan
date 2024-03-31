import './AddTransactionsPage.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p className="inputHeader">Description:</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Grid>
                {/* <p>{name}</p> // for testing purposes*/}
                <Grid item xs={12}>
                  <p className="inputHeader">Amount:</p>
                  <TextField
                    fullWidth
                    className="input-container"
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <p className="inputHeader">Select Category:</p>
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
                  <p className="inputHeader">Date:</p>
                  <TextField
                    fullWidth
                    className="input-container"
                    type="date"
                    id="trans_date"
                    value={transDate}
                    onChange={(event) => setTransDate(event.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', fontFamily:'Rockwell' }}>
                <Button variant="contained" className="button" type="submit" style={{ textDecoration: 'none', fontFamily: 'inherit', marginTop:'10px' }}>
                  Add Transaction
                </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </form>
      </div>
      <h2>
        {successMessage && <div className="transactionMessage">{successMessage}</div>}
      </h2>
    </>
  );
}

export default AddTransactionsPage;
