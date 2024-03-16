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
    </>
  );
}

export default ViewTransactionsPage;
