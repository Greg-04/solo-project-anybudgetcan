import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INCOME_REMAINING" actions
function* fetchRemainingIncome() {
  try {
    // Set the value in the income remaining reducer:
    yield put({
      type: 'SET_INCOME_REMAINING',
      payload: incomeRemaining,
    });
  } catch (error) {
    console.log('fetchRemainingIncome error:', error);
  }
}

//watcher saga
function* incomeRemainingSaga() {
  yield takeLatest('FETCH_INCOME_REMAINING', fetchRemainingIncome);
}

export default incomeRemainingSaga;
