import './ExpensesPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

function ExpensesPage() {
  // Dispatch hook
  const dispatch = useDispatch();
  // Get categories from Redux store
  const category = useSelector((store) => store.category);
  //Get expenses from store
  const expenses = useSelector((store) => store.expense);

  // State to manage editing for each expense
  const [editingId, setEditingId] = useState(null); // ID of the expense being edited
  const [newAmount, setNewAmount] = useState(''); // New amount for the expense being edited

  //Setting up state for each input
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // Handle category selection
  const handleCategorySelect = (event) => {
    // console.log('categoryID before setting state', event.target.value);
    setCategoryId(event.target.value);
    // console.log('categoryID after setting state', event.target.value);
  };

  // Function to handle delete
  const handleDelete = (id) => {
    // Dispatch action to delete expense
    // console.log('Expense ID:', id);
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  //Setting the state of the current inputs
  const handleEdit = (id, currentAmount) => {
    console.log('Before setting newAmount:', newAmount); // Debugging
    setEditingId(id);
    // setNewAmount(currentAmount);
    const newAmountValue = currentAmount.toString();
    setNewAmount(newAmountValue);
    console.log('After setting newAmount:', newAmountValue); // Debugging
  };

  //Adding a save handle to dispatch the update saga
  const handleSave = (id) => {
    dispatch({
      type: 'UPDATE_EXPENSE_AMOUNT',
      payload: { id, amount: Number(newAmount) },
    });
    setEditingId(null); // Reset editing state
    setNewAmount('');
  };

  //adding a cancel handle to revert back the state
  const handleCancel = () => {
    setEditingId(null); // Reset editing state
    setNewAmount('');
  };

  //adding handle to set new changed amount
  const handleChange = (event) => {
    setNewAmount(event.target.value);
  };

  //Submit handle to add transaction
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('test handle submit', name, amount, categoryId);
    // Dispatch the action type to add the transaction
    dispatch({
      type: 'ADD_EXPENSES',
      payload: { name, amount, category_id: categoryId },
    });
    //clearing inputs after submission
    setName('');
    setAmount('');
    setCategoryId('');
  };

  // Fetch categories on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' });
    dispatch({ type: 'FETCH_EXPENSES' });
  }, [dispatch]);

  return (
    <>
      <div>
        <LogOutButton className="btn" />
      </div>
      <h1 className="expenseHeaders">Add Fixed Monthly Expenses</h1>
      <main>
        <div>
          <form className="expenseForm" onSubmit={handleSubmit}>
            <Container maxWidth="md">
              <Paper
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '20px',
                }}>
                <Box sx={{ mt: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <h3
                        style={{
                          color: 'black',
                          fontFamily: 'Rockwell',
                        }}>
                        Name:
                      </h3>
                      <TextField
                        fullWidth
                        className="input-container"
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
                        required
                        id="category"
                        value={categoryId}
                        onChange={handleCategorySelect}>
                        <option className="input-container" value="">
                          Select a category
                        </option>
                        {category.map((categoryName) => (
                          <option key={categoryName.id} value={categoryName.id}>
                            {categoryName.name}
                          </option>
                        ))}
                      </select>
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
                        }}
                        className="button"
                        type="submit">
                        Submit
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        textAlign: 'center',
                        fontFamily: 'Rockwell',
                      }}></Grid>
                  </Grid>
                </Box>
              </Paper>
            </Container>
          </form>
        </div>
        <h2 className="expenseHeaders2">Fixed Monthly Expenses List</h2>
        <div>
          <table className="expenseTable">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Delete?</th>
                <th>Edit Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* {JSON.stringify(expenses)} */}
              {/* Adding a conditional check to prevent mapping over undefined or null */}
              {expenses &&
                expenses.map((expenseItem) => (
                  <tr key={expenseItem.id}>
                    <td>{expenseItem.name}</td>
                    {/* <td>${expenses.amount}</td> */}
                    <td>
                      {editingId === expenseItem.id ? (
                        <input
                          type="number"
                          value={newAmount}
                          onChange={handleChange}
                        />
                      ) : (
                        `$${expenseItem.amount}`
                      )}
                    </td>
                    <td>{expenseItem.category_name}</td>
                    <td>
                      <Button
                        sx={{
                          fontFamily: 'Rockwell',
                          backgroundColor: '#d50000',
                          color: '#e0e0e0',
                        }}
                        variant="contained"
                        onClick={() => handleDelete(expenseItem.id)}>
                        Delete
                      </Button>
                    </td>
                    <td>
                      {editingId === expenseItem.id ? (
                        <>
                          <Button
                            sx={{
                              fontFamily: 'Rockwell',
                              backgroundColor: '#9e9e9e',
                              color: '#e0e0e0',
                            }}
                            variant="contained"
                            onClick={() => handleSave(expenseItem.id)}>
                            Save
                          </Button>
                          <Button
                            sx={{
                              fontFamily: 'Rockwell',
                              backgroundColor: '#9e9e9e',
                              color: '#e0e0e0',
                              marginLeft: '5px',
                            }}
                            variant="contained"
                            onClick={handleCancel}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          sx={{
                            fontFamily: 'Rockwell',
                            backgroundColor: '#9e9e9e',
                            color: '#e0e0e0',
                            marginLeft: '5px',
                          }}
                          variant="contained"
                          onClick={() =>
                            handleEdit(expenseItem.id, expenseItem.amount)
                          }>
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              {/* If expenses is null or undefined, display a loading message */}
              {/* {JSON.stringify(expenses)} */}
              {!expenses && (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              marginTop: '30px',
              fontFamily: 'Rockwell',
            }}
            className="navButton">
            <Link to="/createPlanPage">Next</Link>
          </Button>
        </div>
      </main>
    </>
  );
}

export default ExpensesPage;
