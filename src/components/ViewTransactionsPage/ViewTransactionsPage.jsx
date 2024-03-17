import './ViewTransactionsPage.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ViewTransactionsPage() {
  const dispatch = useDispatch();
  const transactions = useSelector((store) => store.transaction);
  // console.log('transactions data', transactions);

  // State to manage editing for each transaction
  const [editingId, setEditingId] = useState(null); // ID of the transaction being edited
  const [newAmount, setNewAmount] = useState(''); // New amount for the transaction being edited

  //Setting the state of the current inputs
  const handleEdit = (id, currentAmount) => {
    setEditingId(id);
    setNewAmount(currentAmount);
  };

  //Adding a save handle to dispatch the update saga
  const handleSave = (id) => {
    dispatch({
      type: 'UPDATE_TRANSACTION_AMOUNT',
      payload: { id, amount: newAmount },
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

  // Fetch transactions on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_TRANSACTIONS' });
  }, [dispatch]);

  //Function to reformat the timestamp into date format
  const formatDate = (newDate) => {
    //This splits string into substrings/array
    const splitDate = newDate.split('T');
    // console.log('new date object', splitDate);
    return splitDate[0];
  };

  // Function to handle delete
  const handleDelete = (id) => {
    // Dispatch action to delete transaction
    // console.log('In Delete Handle');
    // console.log('Transaction ID:', id);
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  return (
    <>
      <div>
        <h1>View Transactions</h1>
      </div>
      <div>
        <table className="table-container">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Delete?</th>
              <th>Edit Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Adding a conditional check to prevent mapping over undefined or null */}
            {transactions &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{formatDate(transaction.trans_date)}</td>
                  <td>{transaction.name}</td>
                  {/* <td>${transaction.amount}</td> */}
                  <td>
                    {editingId === transaction.id ? (
                      <input
                        type="number"
                        value={newAmount}
                        onChange={handleChange}
                      />
                    ) : (
                      `$${transaction.amount}`
                    )}
                  </td>
                  <td>{transaction.category_name}</td>
                  <td>
                    <button onClick={() => handleDelete(transaction.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    {editingId === transaction.id ? (
                      <>
                        <button onClick={() => handleSave(transaction.id)}>
                          Save
                        </button>
                        <button onClick={handleCancel}>Cancel</button>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          handleEdit(transaction.id, transaction.amount)
                        }>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            {/* If transactions is null or undefined, display a loading message */}
            {!transactions && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewTransactionsPage;
