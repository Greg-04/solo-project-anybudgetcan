import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST Worker Saga: will be fired on "ADD_TRANSACTION" actions
function* addTransaction(action) {
  try {
    yield axios.post('/api/transaction', action.payload);
    // If successful, dispatch action, /* This is a success message however not necessary for functionality*/
    yield put({ type: 'ADD_TRANSACTION_SUCCESS' });
    // If successful, dispatch action to fetch transactions
    yield put({ type: 'FETCH_TRANSACTIONS' });
  } catch (error) {
    // If an error occurs, dispatch a failure action
    yield put({ type: 'ADD_TRANSACTION_ERROR', payload: error });
  }
}

// DELETE Worker Saga: will be fired on "DELETE_TRANSACTION" actions
function* deleteTransaction(action) {
  try {
    const id = action.payload;
    yield axios.delete(`/api/transaction/${id}`);
    // If successful, dispatch action
    yield put({ type: 'DELETE_TRANSACTION_SUCCESS', payload: id });
    // If successful, dispatch action to fetch transactions
    yield put({ type: 'FETCH_TRANSACTIONS' });
  } catch (error) {
    // If an error occurs, dispatch a failure action
    yield put({ type: 'DELETE_TRANSACTION_ERROR', payload: error });
  }
}

// Get Worker Saga
// worker Saga: will be fired on "FETCH_TRANSACTIONS" actions
function* fetchTransactions() {
  try {
    // Get the transactions:
    const transactionResponse = yield axios.get('/api/transaction');
    // Set the value of the transaction reducer:
    yield put({
      type: 'SET_TRANSACTIONS',
      payload: transactionResponse.data,
    });
  } catch (error) {
    console.log('fetchTransactions error:', error);
  }
}

// PUT Worker Saga
// worker Saga: will be fired on "UPDATE_TRANSACTION_AMOUNT" actions
function* updateTransactionAmount(action) {
  try {
    // Extract necessary data from the action payload
    const { id, amount } = action.payload;

    // Dispatch an action to update the transaction amount in the reducer
    yield put({
      type: 'UPDATE_TRANSACTION_AMOUNT_SUCCESS',
      payload: { id, amount },
    });
    // If successful, dispatch action to fetch transactions
    yield put({ type: 'FETCH_TRANSACTIONS' });
  } catch (error) {
    // Handle any errors
    yield put({ type: 'UPDATE_TRANSACTION_AMOUNT_ERROR', payload: error });
  }
}

// Watcher saga
function* transactionSaga() {
  yield takeLatest('ADD_TRANSACTION', addTransaction);
  yield takeLatest('FETCH_TRANSACTIONS', fetchTransactions);
  yield takeLatest('DELETE_TRANSACTION', deleteTransaction);
  yield takeLatest('UPDATE_TRANSACTION_AMOUNT', updateTransactionAmount);
}

export default transactionSaga;
