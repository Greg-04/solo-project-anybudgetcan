import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_PLAN" actions
function* fetchPlan() {
  try {
    // Get the plan:
    const planResponse = yield axios.get('/api/plan');
    // Set the value in the income reducer:
    yield put({
      type: 'SET_PLAN',
      payload: planResponse.data,
    });
  } catch (error) {
    console.log('fetchPlan error:', error);
  }
}

// POST Worker Saga: will be fired on "ADD_INCOME" actions
function* addPlan(action) {
  try {
    yield axios.post('/api/plan', action.payload);
    // If successful, dispatch action to fetch income
    yield put({ type: 'FETCH_PLAN' });
  } catch (error) {
    // If an error occurs
    console.log('Error with addPlan:', error);
  }
}

// DELETE Worker Saga: will be fired on "DELETE_PLAN" actions
function* deletePlan(action) {
  try {
    const id = action.payload;
    yield axios.delete(`/api/plan/${id}`);
    // If successful, dispatch action
    yield put({ type: 'DELETE_PLAN_SUCCESS', payload: id });
    yield put({ type: 'FETCH_PLAN' });
  } catch (error) {
    // If an error occurs, dispatch a failure action
    yield put({ type: 'DELETE_PLAN_ERROR', payload: error });
  }
}

//watcher saga
function* planSaga() {
  yield takeLatest('FETCH_PLAN', fetchPlan);
  yield takeLatest('ADD_PLAN', addPlan);
  yield takeLatest('DELETE_PLAN', deletePlan);
}

export default planSaga;
