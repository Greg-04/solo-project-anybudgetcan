import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST Worker Saga: will be fired on "ADD_EXPENSES" actions
function* addExpense(action) {
  try {
    yield axios.post('/api/expenses', action.payload);
    // // If successful, dispatch action
    // yield put({ type: 'ADD_EXPENSES_SUCCESS' });
    // If successful, dispatch action to fetch expenses
    yield put({ type: 'FETCH_EXPENSES' });
  } catch (error) {
    // If an error occurs, dispatch a failure action
    yield put({ type: 'ADD_EXPENSES_ERROR', payload: error });
  }
}

// DELETE Worker Saga: will be fired on "DELETE_EXPENSE" actions
function* deleteExpense(action) {
  try {
    const id = action.payload;
    yield axios.delete(`/api/expenses/${id}`);
    // If successful, dispatch action
    yield put({ type: 'DELETE_EXPENSE_SUCCESS', payload: id });
    yield put({ type: 'FETCH_EXPENSES' });
  } catch (error) {
    // If an error occurs, dispatch a failure action
    yield put({ type: 'DELETE_EXPENSE_ERROR', payload: error });
  }
}

// Get Worker Saga
// worker Saga: will be fired on "FETCH_EXPENSES" actions
function* fetchExpenses() {
  try {
    // Get the categories:
    const expenseResponse = yield axios.get('/api/expenses');
    // Set the value of the expense reducer:
    yield put({
      type: 'SET_EXPENSES',
      payload: expenseResponse.data,
    });
  } catch (error) {
    console.log('fetchExpenses error:', error);
  }
}

// PUT Worker Saga
// worker Saga: will be fired on "UPDATE_EXPENSE_AMOUNT" actions
function* updateExpenseAmount(action) {
  try {
    // Extract necessary data from the action payload
    const { id, amount } = action.payload;
    // Make the API call to update the expense amount
    yield axios.put(`/api/expenses/${id}`, { amount });
    // Dispatch an action to update the expense amount in the reducer
    yield put({
      type: 'UPDATE_EXPENSE_AMOUNT_SUCCESS',
      payload: { id, amount },
    });
    yield put({ type: 'FETCH_EXPENSES' });
  } catch (error) {
    // Handle any errors
    yield put({ type: 'UPDATE_EXPENSE_AMOUNT_ERROR', payload: error });
  }
}

// Watcher saga
function* expensesSaga() {
  yield takeLatest('ADD_EXPENSES', addExpense);
  yield takeLatest('FETCH_EXPENSES', fetchExpenses);
  yield takeLatest('DELETE_EXPENSE', deleteExpense);
  yield takeLatest('UPDATE_EXPENSE_AMOUNT', updateExpenseAmount);
}

export default expensesSaga;
