const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const categoryRouter = require('./routes/category.router');
const transactionRouter = require('./routes/transaction.router');
const expensesRouter = require('./routes/expenses.router');
const incomeRouter = require('./routes/income.router');
const planRouter = require('./routes/plan.router');
const budgetOverviewRouter = require('./routes/budgetOverview.router');
const apiRouter = require('./routes/api.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/income', incomeRouter);
app.use('/api/plan', planRouter);
app.use('/api/budgetOverview', budgetOverviewRouter);
app.use('/api/apiRouter', apiRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
