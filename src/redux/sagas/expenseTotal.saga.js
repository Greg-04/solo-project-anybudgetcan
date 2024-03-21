import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_EXPENSE_TOTAL" actions
function* fetchExpenseTotal() {
  try {
    // Get the expense totals:
    const expenseTotalResponse = yield axios.get('/api/budgetOverview/expenses');
    // Set the value of the expenseTotal reducer:
    yield put({
      type: 'SET_EXPENSE_TOTAL',
      payload: expenseTotalResponse.data,
    });
  } catch (error) {
    console.log('fetchExpenseTotal error:', error);
  }
}

//watcher saga
function* expenseTotalSaga() {
  yield takeLatest('FETCH_EXPENSE_TOTAL', fetchExpenseTotal);
}

export default expenseTotalSaga;