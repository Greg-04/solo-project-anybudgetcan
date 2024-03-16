import './AddTransactionsPage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddTransactionsPage() {
  // Get categories from Redux store
  const category = useSelector((store) => store.category);
  // Dispatch function
  const dispatch = useDispatch();

  // Handle category selection
  const handleCategorySelect = (event) => {
    // console.log('in category select handle');
    // const selectedCategory = event.target.value;
    // // next step
  };

  // Fetch categories on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Add Transactions</h1>
      </div>
      <div className="transactionForm">
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name"/>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount"/>
          <label htmlFor="category">Select Category:</label>
          <select id="category" onChange={handleCategorySelect}>
            <option value="">Select a category</option>
            {category.map((categoryName) => (
              <option key={categoryName.id} value={categoryName.id}>
                {categoryName.name}
              </option>
            ))}
          </select>
          <label htmlFor="trans_date">Date:</label>
          <input type="date" id="trans_date"/>
          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </>
  );
}

export default AddTransactionsPage;
