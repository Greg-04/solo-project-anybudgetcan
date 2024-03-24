import './ExpensesPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
      <h1 className="header">Add Fixed Monthly Expenses</h1>
      <main>
        <div>
          <form className="expenseForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              className="input-container"
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <label htmlFor="amount">Amount:</label>
            <input
              className="input-container"
              type="number"
              id="amount"
              value={Number(amount)}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
            <label htmlFor="category">Select Category:</label>
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
            <br></br>
            <button className="button" type="submit">
              Submit
            </button>
            <br></br>
            <button className="navButton">
              <Link to="/createPlanPage">Next</Link>
            </button>
          </form>
        </div>
        <h2 className="header">Fixed Monthly Expenses List</h2>
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
                      <button onClick={() => handleDelete(expenseItem.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      {editingId === expenseItem.id ? (
                        <>
                          <button onClick={() => handleSave(expenseItem.id)}>
                            Save
                          </button>
                          <button onClick={handleCancel}>Cancel</button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            handleEdit(expenseItem.id, expenseItem.amount)
                          }>
                          Edit
                        </button>
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
      </main>
    </>
  );
}

export default ExpensesPage;
