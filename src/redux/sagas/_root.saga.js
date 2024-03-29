import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import categorySaga from './category.saga';
import transactionSaga from './transaction.saga';
import expensesSaga from './expenses.saga';
import incomeSaga from './income.saga';
import planSaga from './plan.saga';
import expenseTotalSaga from './expenseTotal.saga';
import transactionTotalSaga from './transTotal.saga';
import combinedTotalSaga from './combinedTotal.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    categorySaga(),
    transactionSaga(),
    expensesSaga(),
    incomeSaga(),
    planSaga(),
    expenseTotalSaga(),
    transactionTotalSaga(),
    combinedTotalSaga(),
  ]);
}
