import './AddTransactionsPage.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
      <div className="header">
        <h1>Add Transactions</h1>
      </div>
      <div>
        <form className="transactionForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            className="input-container"
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          {/* <p>{name}</p> // for testing purposes*/}
          <label htmlFor="amount">Amount:</label>
          <input
            className="input-container"
            type="number"
            id="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
          <label htmlFor="category">Select Category:</label>
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

          <label htmlFor="trans_date">Date:</label>
          <input
            className="input-container"
            type="date"
            id="trans_date"
            value={transDate}
            onChange={(event) => setTransDate(event.target.value)}
            required
          />
          <br></br>
          <button className="button" type="submit">Add Transaction</button>
        </form>
      </div>
      <h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </h2>
    </>
  );
}

export default AddTransactionsPage;
