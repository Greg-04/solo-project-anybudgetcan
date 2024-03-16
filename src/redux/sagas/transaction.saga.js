import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Worker Saga: will be fired on "ADD_TRANSACTION" actions
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

// Watcher saga
function* transactionSaga() {
  yield takeLatest('ADD_TRANSACTION', addTransaction);
}

export default transactionSaga;