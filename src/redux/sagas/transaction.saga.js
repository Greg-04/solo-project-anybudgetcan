import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST Worker Saga: will be fired on "ADD_TRANSACTION" actions
function* addTransaction(action) {
  try {
    yield axios.post('/api/transaction', action.payload);
    // If successful, dispatch action
    yield put({ type: 'ADD_TRANSACTION_SUCCESS' });
  } catch (error) {
    // If an error occurs, dispatch a failure action
    yield put({ type: 'ADD_TRANSACTION_ERROR', payload: error });
  }
}
// Get Worker Saga
// worker Saga: will be fired on "FETCH_TRANSACTIONS" actions
function* fetchTransactions() {
  try {
    // Get the categories:
    const transactionResponse = yield axios.get('/api/transaction');
    // Set the value of the categories reducer:
    yield put({
      type: 'SET_TRANSACTIONS',
      payload: transactionResponse.data,
    });
  } catch (error) {
    console.log('fetchTransactions error:', error);
  }
}

// Watcher saga
function* transactionSaga() {
  yield takeLatest('ADD_TRANSACTION', addTransaction);
  yield takeLatest('FETCH_TRANSACTIONS', fetchTransactions);
}

export default transactionSaga;
