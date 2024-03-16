import './AddTransactionsPage';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddTransactionsPage() {
  // Get categories from Redux store
  const category = useSelector((store) => store.category);
  // Dispatch function
  const dispatch = useDispatch();

  // Handle category selection
  const handleCategorySelect = (event) => {
    console.log('in category select handle');
    // const selectedCategory = event.target.value;
    // // next step
  };

  // Fetch categories on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Add Transactions</h1>
      <label htmlFor="category">Select Category:</label>
      <select id="category" onChange={handleCategorySelect}>
        <option value="">Select a category</option>
        {category.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddTransactionsPage;
