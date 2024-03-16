import './ViewTransactionsPage.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ViewTransactionsPage() {
  const dispatch = useDispatch();
  const transactions = useSelector((store) => store.transaction);

  // Fetch transactions on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_TRANSACTIONS' });
  }, [dispatch]);

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
            </tr>
          </thead>
          <tbody>
          {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.trans_date}</td>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.category_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewTransactionsPage;
