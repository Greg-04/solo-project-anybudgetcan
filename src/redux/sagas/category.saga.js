import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CATEGORIES" actions
function* fetchCategories() {
  try {
    // Get the categories:
    const categoryResponse = yield axios.get('/api/category');
    // Set the value of the categories reducer:
    yield put({
      type: 'SET_CATEGORIES',
      payload: categoryResponse.data,
    });
  } catch (error) {
    console.log('fetchCategories error:', error);
  }
}

//watcher saga
function* categorySaga() {
  yield takeLatest('FETCH_CATEGORIES', fetchCategories);
}

export default categorySaga;