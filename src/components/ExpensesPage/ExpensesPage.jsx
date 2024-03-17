import './ExpensesPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ExpensesPage() {
  // Dispatch function
  const dispatch = useDispatch();
  // Get categories from Redux store
  const category = useSelector((store) => store.category);

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

  // Fetch categories on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [dispatch]);

  return (
    <>
      <h1>Expenses Page</h1>
      <div>
        <div>
          <form>
            {' '}
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
          </form>
        </div>
      </div>
    </>
  );
}

export default ExpensesPage;
