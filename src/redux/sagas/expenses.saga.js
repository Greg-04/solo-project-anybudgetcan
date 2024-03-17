import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST Worker Saga: will be fired on "ADD_EXPENSES" actions
function* addExpense(action) {
  try {
    yield axios.post('/api/expenses', action.payload);
    // If successful, dispatch action
    yield put({ type: 'ADD_EXPENSES_SUCCESS' });
    // If successful, dispatch action to fetch expenses
    yield put({ type: 'FETCH_EXPENSES' });
  } catch (error) {
    // If an error occurs, dispatch a failure action
    yield put({ type: 'ADD_EXPENSES_ERROR', payload: error });
  }
}

// // DELETE Worker Saga: will be fired on "DELETE_TRANSACTION" actions
// function* deleteTransaction(action) {
//   try {
//     const id = action.payload;
//     yield axios.delete(`/api/transaction/${id}`);
//     // If successful, dispatch action
//     yield put({ type: 'DELETE_TRANSACTION_SUCCESS', payload: id });
//   } catch (error) {
//     // If an error occurs, dispatch a failure action
//     yield put({ type: 'DELETE_TRANSACTION_ERROR', payload: error });
//   }
// }

// Get Worker Saga
// worker Saga: will be fired on "FETCH_EXPENSES" actions
function* fetchExpenses() {
  try {
    // Get the categories:
    const expenseResponse = yield axios.get('/api/expenses');
    // Set the value of the categories reducer:
    yield put({
      type: 'SET_EXPENSES',
      payload: expenseResponse.data,
    });
  } catch (error) {
    console.log('fetchExpenses error:', error);
  }
}

// // PUT Worker Saga
// // worker Saga: will be fired on "UPDATE_TRANSACTION_AMOUNT" actions
// function* updateTransactionAmount(action) {
//   try {
//     // Extract necessary data from the action payload
//     const { id, amount } = action.payload;

//     // Dispatch an action to update the transaction amount in the reducer
//     yield put({ type: 'UPDATE_TRANSACTION_AMOUNT_SUCCESS', payload: { id, amount } });
//   } catch (error) {
//     // Handle any errors
//     yield put({ type: 'UPDATE_TRANSACTION_AMOUNT_ERROR', payload: error });
//   }
// }

// Watcher saga
function* expensesSaga() {
  yield takeLatest('ADD_EXPENSES', addExpense);
  yield takeLatest('FETCH_EXPENSES', fetchExpenses);
  // yield takeLatest('DELETE_TRANSACTION', deleteTransaction);
  // yield takeLatest('UPDATE_TRANSACTION_AMOUNT', updateTransactionAmount);
}

export default expensesSaga;
