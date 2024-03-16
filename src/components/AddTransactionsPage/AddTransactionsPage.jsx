import './AddTransactionsPage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddTransactionsPage() {
  // Dispatch function
  const dispatch = useDispatch();
  // Get categories from Redux store
  const category = useSelector((store) => store.category);
  //Setting up state for each input
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [transDate, setTransDate] = useState('');

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
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required/>
          {/* <p>{name}</p> // for testing purposes*/}
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={(event) => setAmount(event.target.value)}/>
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
          <input type="date" id="trans_date" value={transDate} onChange={(event) => setTransDate(event.target.value)} />
          <button type="submit" >Add Transaction</button>
        </form>
      </div>
    </>
  );
}

export default AddTransactionsPage;
