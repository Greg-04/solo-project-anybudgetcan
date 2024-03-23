import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_COMBINED_TOTAL" actions
function* fetchCombinedTotal() {
  try {
    // Get the combined totals:
    const combinedTotalResponse = yield axios.get('/api/budgetOverview/combinedTotals');
    // Set the value of the combinedTotal reducer:
    yield put({
      type: 'SET_COMBINED_TOTAL',
      payload: combinedTotalResponse.data,
    });
  } catch (error) {
    console.log('fetchCombinedTotal error:', error);
  }
}

//watcher saga
function* combinedTotalSaga() {
  yield takeLatest('FETCH_COMBINED_TOTAL', fetchCombinedTotal);
}

export default combinedTotalSaga;