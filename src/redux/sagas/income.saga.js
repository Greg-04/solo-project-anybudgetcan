import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INCOME" actions
function* fetchIncome() {
  try {
    // Get the income:
    const incomeResponse = yield axios.get('/api/income');
    // Set the value in the income reducer:
    yield put({
      type: 'SET_INCOME',
      payload: incomeResponse.data,
    });
  } catch (error) {
    console.log('fetchIncome error:', error);
  }
}

// POST Worker Saga: will be fired on "ADD_INCOME" actions
function* addIncome(action) {
  try {
    yield axios.post('/api/income', action.payload);
    // If successful, dispatch action to fetch income
    yield put({ type: 'FETCH_INCOME' });
  } catch (error) {
    console.log('Error with user registration:', error);
  }
}

// PUT Worker Saga
// worker Saga: will be fired on "UPDATE_INCOME_AMOUNT" actions
function* updateIncomeAmount(action) {
  try {
    // Extract necessary data from the action payload
    const { id, monthly_amount } = action.payload;

    // Dispatch an action to update the income amount in the reducer
    yield put({
      type: 'UPDATE_INCOME_AMOUNT_SUCCESS',
      payload: { id, monthly_amount },
    });
    yield put({ type: 'FETCH_INCOME' });
  } catch (error) {
    // Handle any errors
    yield put({ type: 'UPDATE_INCOME_AMOUNT_ERROR', payload: error });
  }
}

//watcher saga
function* incomeSaga() {
  yield takeLatest('FETCH_INCOME', fetchIncome);
  yield takeLatest('ADD_INCOME', addIncome);
  yield takeLatest('UPDATE_INCOME_AMOUNT', updateIncomeAmount);
}

export default incomeSaga;
