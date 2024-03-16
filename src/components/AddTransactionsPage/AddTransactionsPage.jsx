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
      <div className="category">
        <label htmlFor="category">Select Category:</label>
        <select id="category" onChange={handleCategorySelect}>
          <option value="">Select a category</option>
          {category.map((categoryName) => (
            <option key={categoryName.id} value={categoryName.id}>
              {categoryName.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default AddTransactionsPage;
