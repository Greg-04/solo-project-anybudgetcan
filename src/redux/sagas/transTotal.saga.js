import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_TRANSACTION_TOTAL" actions
function* fetchTransactionTotal() {
  try {
    // Get the transaction totals:
    const transactionTotalResponse = yield axios.get('/api/budgetOverview/transaction');
    // Set the value of the transactionTotal reducer:
    yield put({
      type: 'SET_TRANSACTION_TOTAL',
      payload: transactionTotalResponse.data,
    });
  } catch (error) {
    console.log('fetchTransactionTotal error:', error);
  }
}

//watcher saga
function* transactionTotalSaga() {
  yield takeLatest('FETCH_TRANSACTION_TOTAL', fetchTransactionTotal);
}

export default transactionTotalSaga;