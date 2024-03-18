import './ExpensesPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ExpensesPage() {
  // Dispatch function
  const dispatch = useDispatch();
  // Get categories from Redux store
  const category = useSelector((store) => store.category);
  //Get expenses from store
  const expenses = useSelector((store) => store.expense);

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
      <h1>Expenses Page</h1>
      <main>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <label htmlFor="amount">Amount:</label>
            <input
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
              <option value="">Select a category</option>
              {category.map((categoryName) => (
                <option key={categoryName.id} value={categoryName.id}>
                  {categoryName.name}
                </option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
        <h2>Expense List</h2>
        <div>
          <table className="expenseTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expenseItem) => (
                <tr key={expenseItem.id}>
                  <td>{expenseItem.name}</td>
                  <td>{expenseItem.amount}</td>
                  <td>{expenseItem.category_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default ExpensesPage;
